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
import userAction from '../models/User_info_for_action.model'
import twoFaCodeList from '../models/User_2fa_code_list.model'
import twoStepParams from '../models/User_2fa_params.model'
import depositHistory from '../models/Deposit_history.model'
import withdrawalHistory from '../models/Withdrawal_history.model'
import swapHistory from '../models/Swap_history.model'
import internalHistory from '../models/Internal_history.model'
import userBalance from '../models/User_balance.model'
import userWallet from '../models/user_wallet.model'



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

		if (!user) return false
		await baseUserData.findOneAndUpdate({ email: userEmail }, { password: newPassword })
		let curUser: any = await baseUserData.findOne({ email: userEmail })
		console.log('updated pass is: ', curUser.password);
		if (curUser.password !== newPassword) return false
		return true
	}

	async enableTwoStepVerification(transferObject: any) {

		if (transferObject.twoFaType !== 'email' ||
			transferObject.twoFaType !== 'telegram' ||
			transferObject.twoFaType !== 'google') return false

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
			await telegram.send2faMessage(`${transferObject.domainName}`, `${transferObject.code}`)
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
			await generateCodeForGoogle2fa(transferObject.domainName)
			// https://www.tutsmake.com/upload-image-in-mysql-db-using-node-js-express-multer/
			// https://medium.com/@allistair.vilakazi/2fa-with-node-js-and-google-authenticator-7ddd44881493


			// await qrCode.toFileStream()
			// await telegram.send2faMessage(transferObject.userEmail, `${transferObject.domainName}`, `${transferObject.code}`)
			// return true
		}
	}

	async enableTwoStepVerificationStatus(transferObject: any) {

		let userToUpdate: any = await baseUserData.findById({ id: transferObject.userId })
		console.log('found user: ', userToUpdate);
		if (!userToUpdate) return false

		await twoStepParams.create({
			twoStepType: transferObject.twoFaType,
			enableDate: transferObject.enableDate,
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

	// async deleteExpiredCode(code: string) {
	// 	let codeToDelete: any = await database.GetTwoStepCode(code)
	// 	console.log('found code is: ', codeToDelete[0]);
	// 	if (!codeToDelete[0]) return false

	// 	await database.DeleteTwoStepCode(code)
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
		await userKyc.create({
			firstName: transfer_object.firstName,
			lastName: transfer_object.lastName,
			email: transfer_object.userEmail,
			phoneNumber: transfer_object.phoneNumber,
			dateOfBirth: transfer_object.dateOfBirth,
			documentNumber: transfer_object.documentNumber,
			documentType: transfer_object.documentType,
			mainAddress: transfer_object.mainAddress,
			subAddress: transfer_object.subAddress || '',
			city: transfer_object.city,
			countryName: transfer_object.countryName,
			state: transfer_object.state,
			zipCode: transfer_object.zipCode,
			// frontDocumentPhoto: =============,
			// backDocumentPhoto: ==,
			// selfieDocumentPhoto: ===,
			userDomain: transfer_object.domainName,
			userId: transfer_object.userId,
		})

		await userParams.findOneAndUpdate({ userId: transfer_object.userId }, {
			kycStatus: transfer_object.kycStatus
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

	async GetDepositHistory(user_id: string) {
		const userDepositHistory: any = await depositHistory.find({
			userId: user_id
		})
		console.log('userHistory: ', userDepositHistory.length);
		if (!userDepositHistory.length) return false
		return userDepositHistory
	}

	async GetWithdrawalHistory(user_id: string) {
		const userWithdrawalHistory: any = await withdrawalHistory.find({
			userId: user_id
		})
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

	async GetInternalTransferHistory(user_id: string) {
		const curUser: any = await internalHistory.findOne({
			_id: user_id,
		})
		console.log('found user is => ', curUser);
		if (!curUser) return false
		const userInternalTransfers: any = await internalHistory.find({
			userEmail: curUser.email,
			secondUserEmail: curUser.email
		})
		console.log('userHistory: ', userInternalTransfers.length);
		if (!userInternalTransfers.length) return false
		return userInternalTransfers
	}

	async saveUserLogs(email: string, ipAddress: string, city: string, countryName: string, coordinates: string, browser: string, currentDate: string, user_action: string, user_domain: string) {

		const logs: any = {
			email: email,
			ip_address: ipAddress,
			user_city: city,
			country_name: countryName,
			location_on_map: coordinates,
			browser: browser,
			date_time: currentDate,
			user_action: user_action,
			domain: user_domain
		}
		console.log('received logs is: ', logs)

		for (let i = 0; i < logs.length; i++) {
			if (logs.i === undefined) return false
		}

		await userLogs.create({
			userEmail: email,
			ipAddress: ipAddress,
			requestCity: city,
			countryName: countryName,
			location: coordinates,
			browser: browser,
			actionDate: currentDate,
			userAction: user_action,
			userDomain: user_domain
		})

		return logs
	}


	async support() {

	}


}

export default new UserServices()