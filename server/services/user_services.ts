import ProfileUserDto from '../dtos/profile_user_dto'
import mailService from '../services/mail_services'
import telegram from '../api/telegram_api'
// import qrCode from 'qrcode'
import speakeasy from 'speakeasy'
import userPromocode from '../models/Promocodes.model'
import baseUserData from '../models/User_base_data.model'
import userKyc from '../models/KYC.model'
import userParams from '../models/User_params.model'
import userLogs from '../models/User_logs.model'
// import userAction from '../models/User_info_for_action.model'
import twoFaCodeList from '../models/User_2fa_code_list.model'
import twoStepParams from '../models/User_2fa_params.model'
import depositHistory from '../models/Deposit_history.model'
import withdrawalHistory from '../models/Withdrawal_history.model'
import swapHistory from '../models/Swap_history.model'
import internalHistory from '../models/Internal_history.model'
import userBalance from '../models/User_balance.model'
import userWallet from '../models/user_wallet.model'
import generatePassword from '../api/password_generator'
import secureDeal from '../models/secure_deal.model'
import newsList from '../models/News_list.model'


async function generateCodeForGoogle2fa(domain_name: string) {
	const secretCode = speakeasy.generateSecret({
		name: domain_name,
	})
	return {
		otpauthUrl: secretCode.otpauth_url,
		base32: secretCode.base32,
	}
}


class UserServices {

	async dashboard(user_id: string) {
		const user: any = await baseUserData.findOne({ _id: user_id })
		console.log('info of current user: ', user)
		if (!user) return false
		const kycData: any = await userParams.findOne({ userId: user_id })
		if (!kycData) return false

		let dashboardUserDto: any = {
			name: user.name,
			email: user.email,
			kycStatus: kycData.kycStatus,
			phone: kycData.phoneNumber || null
		}
		console.log('user dto is: ', dashboardUserDto)

		if (user.isStaff || user.isAdmin) {
			dashboardUserDto.withoutLogs = true
		}
		return dashboardUserDto
	}

	async personalAreaProfile(userId: string) {
		const userDataObject: any = await ProfileUserDto(userId)
		console.log('current user data is: => ', userDataObject);
		if (!userDataObject) return false
		return userDataObject
	}


	async UsePromocodeInProfile(code: string) {
		const usedPromocode: any = await userPromocode.findOne({ code: code })
		console.log('received code is: ', usedPromocode);
		if (!usedPromocode) return false
		return true
	}


	// async changeNameInProfile(user_id: number, userName: string) {
	// 	const user: any = await database.GetBaseUserParamsById(user_id)
	// 	console.log('received user is: ', user);
	// 	if (!user[0]) return false

	// 	await database.ChangeUserName(user_id, userName)
	// 	return true
	// }

	async personalAreaChangePassword(userEmail: string, newPassword: string) {

		let user: any = await baseUserData.findOne({ email: userEmail })
		console.log('found user is: ', user);
		if (user.password === newPassword) return 'match old and new password.'
		if (!user) return false
		await baseUserData.findOneAndUpdate({ email: userEmail }, { password: newPassword })
		let curUser: any = await baseUserData.findOne({ email: userEmail })
		console.log('updated pass is: ', curUser.password);
		if (curUser.password !== newPassword) return false
		return true
	}

	async validateTwoStepCodeAtEnable2fa(code: string) {
		const validate: any = await twoFaCodeList.findOne({
			code: code
		})
		if (!validate) return false
		return true
	}

	async enableTwoStepVerification(transferObject: any) {

		console.log('transfer obj => ', transferObject);

		if (transferObject.twoFaType === 'email') {
			await mailService.sendActivationMail(transferObject.userEmail, `${transferObject.domainName}`, `${transferObject.code}`)
			await twoFaCodeList.create({
				code: transferObject.code,
				userEmail: transferObject.userEmail
			})
			setTimeout(async () => {
				await twoFaCodeList.deleteOne({
					userEmail: transferObject.userEmail
				})
			}, 300_000)
			return true
		}

		if (transferObject.twoFaType === 'telegram') {
			await twoFaCodeList.create({
				code: transferObject.code,
				userEmail: transferObject.userEmail
			})
			setTimeout(async () => {
				await twoFaCodeList.deleteOne({
					userEmail: transferObject.userEmail
				})
			}, 300_000)
			return true
		}

		if (transferObject.twoFaType === 'google') {
			// await generateCodeForGoogle2fa(transferObject.domainName)
			// https://www.tutsmake.com/upload-image-in-mysql-db-using-node-js-express-multer/
			// https://medium.com/@allistair.vilakazi/2fa-with-node-js-and-google-authenticator-7ddd44881493


			// await qrCode.toFileStream()
			// await telegram.send2faMessage(transferObject.userEmail, `${transferObject.domainName}`, `${transferObject.code}`)
			// return true
		}

		return false
	}

	async enableTwoStepVerificationStatus(transferObject: any, telegramId: string) {

		let userToUpdate: any = await baseUserData.findById({ _id: transferObject.userId })
		console.log('found user: ', userToUpdate);
		if (!userToUpdate) return false

		if (transferObject.twoFaType === 'telegram' && telegramId !== 'empty') {
			await twoStepParams.create({
				twoStepType: transferObject.twoFaType,
				enableDate: transferObject.enableDate,
				teleramId: telegramId,
				userId: transferObject.userId
			})
		}

		await twoStepParams.create({
			twoStepType: transferObject.twoFaType,
			enableDate: transferObject.enableDate,
			teleramId: 'empty',
			userId: transferObject.userId
		})
		await userParams.findOneAndUpdate({ userId: transferObject.userId }, {
			twoStepStatus: true
		})

		const updatedStatus: any = await userParams.findOne({ userId: transferObject.userId })
		console.log('2fa status is: ', updatedStatus.twoStepStatus);
		if (updatedStatus.twoStepStatus !== true) return false
		return true

	}

	// async deleteExpiredCode(userEmail: string) {
	// 	const code: any = await twoFaCodeList.findOne({ userEmail: userEmail })
	// 	console.log('found code is: ', code);
	// 	if (!code) return false
	// 	await twoFaCodeList.deleteOne({ code: code })

	// 	const updatedCode: any = await twoFaCodeList.findOne({ code: code })
	// 	console.log('updatedCode => ', updatedCode);
	// 	if (updatedCode) return false
	// 	return true
	// }

	async disableUserTwoStep(user_id: string) {
		let user: any = await userParams.findOne({ userId: user_id })
		console.log('found user is: ', user);

		if (!user) return false

		await userParams.findOneAndUpdate({ userId: user_id }, {
			twoStepStatus: false
		})
		await twoStepParams.deleteOne({ userId: user_id })

		const updatedStatus: any = await userParams.findOne({ userId: user_id })
		console.log('2fa status is: ', updatedStatus.twoStepStatus);
		if (updatedStatus.twoStepStatus !== false) return false
		return true
	}

	async personalAreaSendKyc(transfer_object: any) {
		const candidate: any = await userKyc.findOne({ userId: transfer_object.userId })
		console.log('candidate is: ', candidate);
		if (candidate) return false

		// save photo in folder & get path to save it to databse **
		if (transfer_object.documents[0]) {
			await userKyc.create({
				firstName: transfer_object.firstName,
				lastName: transfer_object.lastName,
				email: transfer_object.userEmail,
				phoneNumber: transfer_object.phoneNumber,
				dateOfBirth: transfer_object.dateOfBirth,
				documentNumber: transfer_object.documentNumber,
				documentType: transfer_object.documentType,
				mainAddress: transfer_object.mainAddress,
				subAddress: transfer_object.subAddress,
				city: transfer_object.city,
				countryName: transfer_object.countryName,
				state: transfer_object.state,
				zipCode: transfer_object.zipCode,
				documents: {
					// frontDocumentPhoto: =============,
					// backDocumentPhoto: ==,
					// selfieDocumentPhoto: === path to dir in project,
				},
				userDomain: transfer_object.domainName,
				userId: transfer_object.userId,
			})

		} else {
			await userKyc.create({
				firstName: transfer_object.firstName,
				lastName: transfer_object.lastName,
				email: transfer_object.userEmail,
				phoneNumber: transfer_object.phoneNumber,
				dateOfBirth: transfer_object.dateOfBirth,
				documentNumber: transfer_object.documentNumber,
				documentType: transfer_object.documentType,
				mainAddress: transfer_object.mainAddress,
				subAddress: transfer_object.subAddress,
				city: transfer_object.city,
				countryName: transfer_object.countryName,
				state: transfer_object.state,
				zipCode: transfer_object.zipCode,
				documents: {},
				userDomain: transfer_object.domainName,
				userId: transfer_object.userId,
			})
		}

		const savedKyc: any = await userKyc.findOne({
			userId: transfer_object.userId
		})
		console.log('savedKyc => ', savedKyc);
		if (!savedKyc) return false

		await userParams.findOneAndUpdate({ userId: transfer_object.userId }, {
			kycStatus: 'pending'
		})

		return true
	}

	async FindSecondPartyUser(userEmail: string, domainName: string) {
		const curUser: any = await baseUserData.findOne({
			email: userEmail,
			domainName: domainName
		})
		console.log(' found user is => ', curUser);
		if (!curUser) return false
		return true
	}

	async verifInternalWallet(wallet: string, domainName: string) {
		const curWallet: any = await userWallet.findOne({
			userWallet: wallet
		})
		console.log(' found curWallet is => ', curWallet);
		if (!curWallet) return false

		const secondUser: any = await baseUserData.findOne({
			_id: curWallet.userId
		})
		console.log(' found secondUser is => ', secondUser);
		if (!secondUser) return false
		if (secondUser.domainName !== domainName) return false
		return true
	}

	async getUserBalance(userId: string) {
		const curBalance: any = await userBalance.find({
			userId: userId
		})
		console.log('curBalance => ', curBalance.length);
		if (!curBalance.length) return false
		return curBalance
	}

	async GetDepositHistory(userId?: string) {
		if (userId) {
			const userDepositHistory: any = await depositHistory.find({
				userId: userId
			})
			console.log('userHistory: ', userDepositHistory.length);
			if (!userDepositHistory.length) return false
			return userDepositHistory
		}

		const userDepositHistory: any = await depositHistory.find()
		console.log('userHistory: ', userDepositHistory.length);
		if (!userDepositHistory.length) return false
		return userDepositHistory
	}

	async GetWithdrawalHistory(userId?: string) {
		if (userId) {
			const userWithdrawalHistory: any = await withdrawalHistory.find({
				userId: userId
			})
			console.log('userHistory: ', userWithdrawalHistory.length);
			if (!userWithdrawalHistory.length) return false
			return userWithdrawalHistory
		}

		const userWithdrawalHistory: any = await withdrawalHistory.find()
		console.log('userHistory: ', userWithdrawalHistory.length);
		if (!userWithdrawalHistory.length) return false
		return userWithdrawalHistory

	}

	async GetSwapHistory(user_id: string) {
		const userSwapHistory: any = await swapHistory.find({
			userId: user_id
		})
		console.log('userHistory: ', userSwapHistory.length);
		if (!userSwapHistory.length) return false
		return userSwapHistory
	}

	async GetInternalTransferHistory(userId?: string) {
		if (userId) {
			const curUser: any = await baseUserData.findOne({
				_id: userId,
			})
			console.log('found user is => ', curUser);
			if (!curUser) return false
			const userInternalTransfersSend: any = await internalHistory.find({
				userEmail: curUser.email
			})

			const userInternalTransfersReceive: any = await internalHistory.find({
				secondUserEmail: curUser.email
			})
			const tempArray = [
				userInternalTransfersSend,
				userInternalTransfersReceive
			]
			const dataArray = []

			for (let i = 0; i <= tempArray.length - 1; i++) {
				for (let j = 0; j <= tempArray[i].length - 1; j++) {
					dataArray.push(tempArray[i][j])
				}
			}

			console.log('userHistory: ', dataArray.length);
			if (!dataArray) return false
			if (!dataArray.length) return 'empty set'
			return dataArray
		}

		const userInternalTransfersSend: any = await internalHistory.find()
		const userInternalTransfersReceive: any = await internalHistory.find()

		const tempArray = [
			userInternalTransfersSend,
			userInternalTransfersReceive
		]
		const dataArray = []

		for (let i = 0; i <= tempArray.length - 1; i++) {
			for (let j = 0; j <= tempArray[i].length - 1; j++) {
				dataArray.push(tempArray[i][j])
			}
		}

		console.log('userHistory: ', dataArray.length);
		if (!dataArray) return false
		if (!dataArray.length) return 'empty set'
		return dataArray


	}

	async createSecureDeal(transfer_object: any, userId: string) {
		if (transfer_object.secondPartyEmail === transfer_object.userEmail) return false

		const acceptCode: string = await generatePassword(8)

		const getUserBalance: any = await userBalance.findOne({
			coinName: transfer_object.coinName,
			userId: userId
		})
		console.log('received balance => ', getUserBalance.coinBalance);
		if (!getUserBalance) return false
		if (getUserBalance < transfer_object.amountInCrypto) {
			console.log('wrong balance value');
			return false
		}
		const dataObject = {
			userEmail: transfer_object.userEmail,
			secoondPartyEmail: transfer_object.secondPartyEmail,
			dealCondition: transfer_object.dealCondition,
			coinName: transfer_object.coinName,
			amountInCrypto: transfer_object.amountInCrypto,
			buyer: transfer_object.buyer,
			seller: transfer_object.seller,
			status: 'pending',
			acceptCode: acceptCode,
			dealDedline: transfer_object.dealDedline,
			dateOfCreate: transfer_object.dateOfCreate
		}
		console.log('dataObject is => ', dataObject);
		await secureDeal.create(dataObject)

		const getDeal: any = await secureDeal.findOne({
			dateOfCreate: transfer_object.dateOfCreate
		})
		console.log('found getDeal is => ', getDeal);
		if (!getDeal) return false

		return true
	}


	async getSecureDealDetail(dealId: string, userEmail: string) {
		const foundDeal: any = await secureDeal.findById({
			_id: dealId
		})
		console.log(' found deal foundDeal, ', foundDeal);
		if (!foundDeal) return false

		if (foundDeal.seller === userEmail) {
			return foundDeal
		} else if (foundDeal.buyer === userEmail) {
			let infoObj = Object.assign({}, foundDeal)
			delete infoObj._doc.acceptCode
			console.log(' updated data => ', infoObj);
			return infoObj._doc
		}
	}

	async getSecureDealHistory(userEmail: string) {
		let dataArray = {
			dealHistoryAsSeller: [],
			dealHistoryAsBuyer: []
		}

		let dealHistoryAsSeller: any = await secureDeal.find({
			seller: userEmail
		})
		console.log('dealHistoryAsSeller is: ', dealHistoryAsSeller);
		if (dealHistoryAsSeller.length > 0) dataArray.dealHistoryAsSeller = dealHistoryAsSeller

		let dealHistoryAsBuyer: any = await secureDeal.find({
			buyer: userEmail
		})
		console.log('dealHistoryAsBuyer is: ', dealHistoryAsBuyer);
		if (dealHistoryAsBuyer.length > 0) dataArray.dealHistoryAsBuyer = dealHistoryAsBuyer

		let historyArray = []

		for (let index in dataArray) {
			// console.log('dataArray ind =>  ', dataArray[index]);
			if (dataArray[index].length > 0) {
				for (let x = 0; x <= dataArray[index].length - 1; x++) {
					let curIndex = Object.assign({}, dataArray[index][x])
					// console.log('curIndex  =>  ', curIndex);
					delete curIndex._doc.acceptCode
					historyArray.push(dataArray[index][x])
				}
			}
		}
		console.log('historyArray => ', historyArray);
		return historyArray
	}

	async acceptSecureDeal(dealId: string, acceptCode: string) {
		const curDeal: any = await secureDeal.findById({
			_id: dealId
		})
		console.log('found curDeal is => ', curDeal);
		if (!curDeal || curDeal.acceptCode !== acceptCode) return false

		const updateStatus: any = await secureDeal.findByIdAndUpdate(
			{ _id: dealId },
			{ status: 'complete' }
		)
		console.log('updateStatus is => ', updateStatus);
		if (!updateStatus) return false

		const firstUser: any = await baseUserData.findOne({
			email: curDeal.buyer
		})
		console.log('found firstUser is => ', firstUser);
		if (!firstUser) return false

		const secondUser: any = await baseUserData.findOne({
			email: curDeal.seller
		})
		console.log('found secondUser is => ', secondUser);
		if (!secondUser) return false

		const firstUserBalance: any = await userBalance.findOne({
			coinName: curDeal.coinName,
			userId: firstUser.id
		})
		console.log('found firstUserBalance is => ', firstUserBalance);
		if (!firstUserBalance) return false

		const secondUserBalance: any = await userBalance.findOne({
			coinName: curDeal.coinName,
			userId: secondUser.id
		})
		console.log('found secondUserBalance is => ', secondUserBalance);
		if (!secondUserBalance) return false

		const curFirstBalance: number = firstUserBalance.coinBalance + curDeal.amountInCrypto
		const curSecondBalance: number = secondUserBalance.coinBalance - curDeal.amountInCrypto

		await userBalance.findOneAndUpdate(
			{
				userId: firstUser.id,
				coinName: curDeal.coinName
			},
			{
				coinBalance: curFirstBalance
			}
		)

		await userBalance.findOneAndUpdate(
			{
				userId: secondUser.id,
				coinName: curDeal.coinName
			},
			{
				coinBalance: curSecondBalance
			}
		)

		const updatedFirstBalance: any = await userBalance.findOne({
			userId: firstUser.id,
			coinName: curDeal.coinName,
		})
		console.log('found updatedFirstBalance is => ', updatedFirstBalance);
		if (!updatedFirstBalance || updatedFirstBalance.coinBalance === firstUserBalance.coinBalance) return false

		const updatedSecondBalance: any = await userBalance.findOne({
			userId: secondUser.id,
			coinName: curDeal.coinName,
		})
		console.log('found updatedSecondBalance is => ', updatedSecondBalance);
		if (!updatedSecondBalance || updatedSecondBalance.coinBalance === secondUserBalance.coinBalance) return false

		return true
	}

	async killDealByMissDeadline(dealId: string, deadline: number) {

		const curDateTime: number = new Date().getTime()
		const curDeal: any = await secureDeal.findById({ _id: dealId })
		console.log('curDeal => ', curDeal);
		if (!curDeal) return false
		if (curDateTime < deadline) return false
		const updateStatus: any = await secureDeal.findByIdAndUpdate(
			{ _id: dealId },
			{ status: 'failed' }
		)
		console.log('updateStatus is => ', updateStatus);
		if (!updateStatus) return false
		return true

	}



	async support() {

	}

	async getNewsByDomainName(domainId: string) {
		const domainNewsList: any = await newsList.find({ domainId: domainId })
		console.log('domainNewsList is => ', domainNewsList.length);

		if (!domainNewsList) return false
		if (!domainNewsList.length) return 'empty set'

		return domainNewsList
	}

}

export default new UserServices()