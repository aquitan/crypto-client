import codeGenerator from '../api/password_generator'
import baseUserData from '../models/User_base_data.model'
import userParams from '../models/User_params.model'
import userActionInfo from '../models/User_info_for_action.model'
import userKyc from '../models/KYC.model'
import userLogs from '../models/User_logs.model'
import staffParams from '../models/Staff_params.model'
import userIpMatch from '../models/User_ip_match.model'
import domainList from '../models/Domain_list.model'
import domainDetail from '../models/Domain_detail.model'
import domainErrors from '../models/Domain_errors.model'
// import domainTerms from '../models/Domain_terms.model'
import newsList from '../models/News_list.model'
import userPromocode from '../models/Promocodes.model'
import usedPromoList from '../models/Used_promocodes.model'
import staffLogs from '../models/Staff_logs.model'
import TokenModel from '../models/Token.model'
// import TERMS from '../config/terms.template'
import staffWallet from '../models/staff_wallet.model'
import secureDeal from '../models/secure_deal.model'
import userBalance from '../models/User_balance.model'
import userWallet from '../models/user_wallet.model'
import staffGroup from '../models/Staff_group.model'
import staffGroupUserList from '../models/staff_group_user_list.model'
import recruiterModel from '../models/recruiter.model'
import recruiterOwnUsers from '../models/recruiter_own_users.model'
import tradingOrders from '../models/trading_order.model'
import coinRates from '../models/coin_rates.model'
import supportChat from '../models/Support_chat.model'
import Notification from './notificationServices'
import secureDealChat from '../models/secure_deal_chat.model'
import moneyService from '../services/money_service'
import depositRequest from '../models/Deposit_requests.model'
import depositHistory from '../models/Deposit_history.model'


async function sortDataArray(arr: any) {

	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - 1 - 1; j++) {
			if (arr[j].date > arr[j + 1].date) {
				let temp = arr[j].date
				arr[j].date = arr[j + 1].date
				arr[j + 1].date = temp
			}
		}
	}
	console.log('sorted arr => ', arr);
	return arr
}

class staffService {


	async staffDashboardInfo(staff_id: string) {

		interface INFO {
			telegrams: {
				logsBot: string
				twoStepBot: string
				newsTgChanel: string
			}
			baseInfo: {
				totalUsers: number
				unreadMessages: number
				depositAmount: number
				onlineUsers: number
			}
		}

		const staff_email: any = await baseUserData.findOne({ _id: staff_id })
		console.log('received staff email is: ', staff_email.email)
		if (!staff_email) return false
		const usersList: any = await baseUserData.find({ registrationType: staff_email.email })

		const userOnline: any = await TokenModel.find()

		console.log('user list: ', usersList.length);
		console.log('user online list: ', userOnline.length);

		const logsBotName: any = process.env.TELEGRAM_USER_LOGS_BOT
		const twoStepBotName: any = process.env.TELEGRAM_2FA_CODE_SENDER
		const newsTgChanelName: any = process.env.TELEGRAM_PROJECT_NEWS_BOT

		const dataLIst: INFO = {
			telegrams: {
				logsBot: logsBotName,
				twoStepBot: twoStepBotName,
				newsTgChanel: newsTgChanelName,
			},
			baseInfo: {
				totalUsers: usersList.length,
				unreadMessages: 31,
				depositAmount: 13,
				onlineUsers: userOnline.length
			}
		}

		console.log('received data list is: ', dataLIst)
		return dataLIst
	}

	async isGroupMemberCheck(userEmail: string) {
		let dataObj: any = {}
		const checkGroupUsers: any = await staffGroupUserList.find()
		for (let i = 0; i <= checkGroupUsers.length - 1; i++) {
			for (let x = 0; x <= checkGroupUsers[i].staffEmailList.length - 1; x++) {
				if (checkGroupUsers[i].staffEmailList[x] === userEmail) {
					const curList: any = await staffGroup.find({ _id: checkGroupUsers[i].groupId })
					dataObj.isGroupMember = true
					dataObj.groupList = curList
				}
			}
		}
		return dataObj
	}

	async isRecruiterCheck(staffId: string) {
		let dataObj: any = {}

		const isRecruiter: any = await recruiterModel.findOne({ recruiterId: staffId })
		if (!isRecruiter) {
			dataObj.isRecruiter = false
			dataObj.staffIdList = []
			return dataObj
		}

		const getOwnUsers: any = await recruiterOwnUsers.find({ recruiterId: staffId })
		let tempIdArray = []
		for (let i = 0; i <= getOwnUsers.length - 1; i++) {
			const staffUser: any = await baseUserData.findOne({ email: getOwnUsers[i].staffEmail })
			tempIdArray.push(staffUser.id)
		}
		dataObj.isRecruiter = true
		dataObj.staffIdList = tempIdArray

		console.log('dataObj from isRecruiter checker => ', dataObj);
		return dataObj
	}



	async GetUsersList(staffId: string, staffEmail: string, skipValue: number, limitValue: number) {
		const checker: any = await this.isGroupMemberCheck(staffEmail)
		console.log('checker result => ', checker);
		const isGroupMember: boolean = checker.isGroupMember
		const groupList: any = checker.groupList

		const recruiterChecker: any = await this.isRecruiterCheck(staffId)
		console.log('recruiterChecker result => ', recruiterChecker);
		const isRecruiter: boolean = recruiterChecker.isRecruiter
		const staffIdList: string[] = recruiterChecker.staffIdList


		let dataArray: any = []
		if (!isGroupMember) {
			const usersList: any = await baseUserData.
				find({ registrationType: staffId }).
				skip(skipValue).
				limit(limitValue).
				exec()
			console.log('user list: ', usersList);
			if (!usersList.length) return 'empty set'
			if (!usersList) return false

			for (let i = 0; i <= usersList.length - 1; i++) {

				const params: any = await userParams.findOne({ userId: usersList[i].id })

				console.log('iter => ', usersList[i]);
				let dataObject = {
					userId: usersList[i].id,
					registerDate: usersList[i].dateOfEntry,
					userName: usersList[i].name,
					userEmail: usersList[i].email,
					userStatus: params.isStaff,
					kycStatus: params.kycStatus,
					userDomain: usersList[i].domainName
				}
				dataArray.push(dataObject)
			}
			console.log('data arr => ', dataArray);

			if (!dataArray.length) return 'empty set'
			return dataArray
		} else {

			for (let i = 0; i <= groupList.length - 1; i++) {
				const groupUsers: any = await staffGroupUserList.find({ groupId: groupList[i].id })
				console.log('received groupUsers => ', groupUsers);
				for (let j = 0; j <= groupUsers.length - 1; j++) {
					for (let x = 0; x <= groupUsers[j].staffEmailList.length - 1; x++) {
						if (groupUsers[j].staffEmailList[x] === staffEmail) {

							const usersList: any = await baseUserData.
								find().
								skip(skipValue).
								limit(limitValue).
								exec()
							console.log('user list: ', usersList);
							for (let f = 0; f <= usersList.length - 1; f++) {
								if (groupList[i].viewParams === false) {
									const params: any = await userParams.findOne({ userId: usersList[f].id.toString() })
									console.log('params => ', params);
									// if (!params.length)
									if (!params) return false
									let dataObject = {
										userId: usersList[f].id,
										registerDate: usersList[f].dateOfEntry,
										userName: usersList[f].name,
										userEmail: usersList[f].email,
										userStatus: params.isStaff,
										kycStatus: params.kycStatus,
										userDomain: usersList[f].domainName
									}
									dataArray.push(dataObject)
								} else {
									if (usersList[f].dateOfEntry > groupList[i].dateOfCreate) {
										const params: any = await userParams.findOne({ userId: usersList[f].id.toString() })
										console.log('params => ', params);
										if (!params) return false
										let dataObject = {
											userId: usersList[f].id,
											registerDate: usersList[f].dateOfEntry,
											userName: usersList[f].name,
											userEmail: usersList[f].email,
											userStatus: params.isStaff,
											kycStatus: params.kycStatus,
											userDomain: usersList[f].domainName
										}
										dataArray.push(dataObject)
									}
									if (!dataArray.length) {
										const usersList: any = await baseUserData.
											find({ registrationType: staffId }).
											skip(skipValue).
											limit(limitValue).
											exec()

										dataArray = usersList

									}
								}
							}
						}
					}
				}
			}
			console.log('dataArray is => ', dataArray);
			if (!dataArray.length) return 'empty set'
			return dataArray
		}
	}



	async GetUserDetail(user_id: string) {
		const userBaseData: any = await baseUserData.findById({ _id: user_id })
		console.log('userBaseData info is: ', userBaseData)
		if (!userBaseData) return false

		const userParamsData: any = await userParams.findOne({ userId: user_id })
		console.log('user params is: ', userParamsData);

		const userActionData: any = await userActionInfo.findOne({ userId: user_id })
		console.log('user action info is: ', userActionData);

		const userKycData: any = await userKyc.findOne({ userId: user_id })
		if (userKycData) console.log('userKycData info is: ', userKycData.length)

		const userLogsData: any = await userLogs.find({ userEmail: userBaseData.email })
		console.log('userLogsData info is: ', userLogsData.length)

		const staffParamsData: any = await staffParams.findOne({ staffUserEmail: userBaseData.email })
		console.log('staffParamsData info is: ', staffParamsData)

		const userErrorList: any = await domainErrors.find({ domainName: userBaseData.domainName })
		console.log('userErrorList info is: ', userErrorList.length)

		const curUserBalance: any = await userBalance.find({ userId: user_id })
		console.log('curUserBalance info is: ', curUserBalance.length)

		const ipMatchList: any = await userIpMatch.find({ email: userBaseData.email })

		let moneyDataArray = []
		for (let i = 0; i <= curUserBalance.length - 1; i++) {
			const curUserWallet: any = await userWallet.findOne().
				where('coinName').equals(curUserBalance[i].coinName.toUpperCase()).
				where('userId').equals(user_id).
				exec()
			let obj = {
				coinName: curUserWallet.coinName,
				coinBalance: curUserBalance[i].coinBalance,
				internalWallet: curUserWallet.address
			}
			console.log('cur data before array: => ', obj);

			moneyDataArray.push(obj)
		}

		console.log('cur user money array => ', moneyDataArray.length);
		if (moneyDataArray.length < 6) return false

		let UserData: any = {
			base_data: userBaseData,
			user_params_data: userParamsData,
			user_action_data: userActionData,
			user_kyc: userKycData,
			user_logs: userLogsData,
			staff_params: staffParamsData,
			user_errors: userErrorList,
			user_money: moneyDataArray,
			user_ip_match_list: ipMatchList
		}
		if (!userKycData) {
			UserData.user_kyc = null
			console.log('data from service: ', UserData);
			return UserData
		}
		if (!staffParamsData) {
			UserData.staff_params = null
			console.log('data from service: ', UserData);
			return UserData
		}
		if (!userErrorList) {
			UserData.user_errors = null
			console.log('data from service: ', UserData);
			return UserData
		}
		console.log('data from service: ', UserData);
		return UserData
		// get recruiter if user is staff 
	}

	async getUserForIpMatch(ip_address: string) {
		const usersList: any = await userIpMatch.find({ ipAddress: ip_address })
		console.log('list is: ', usersList);
		if (!usersList[0]) return usersList
		return false
	}

	async GetKycForStaff(staffId: string, staffEmail: string, skipValue: number, limitValue: number) {

		const checker: any = await this.isGroupMemberCheck(staffEmail)
		console.log('checker result => ', checker);
		const isGroupMember: boolean = checker.isGroupMember
		const groupList: any = checker.groupList

		const ownDomains: any = await domainList.find({ domainOwner: staffId })
		console.log('ownDomains => ', ownDomains);
		if (!ownDomains) return false

		let userKycList = [{}]
		if (!isGroupMember) {
			for (let i = 0; i <= ownDomains.length - 1; i++) {
				const kycList: any = await userKyc.
					find({ userDomain: ownDomains[i].domainFullName }).
					skip(skipValue).
					limit(limitValue).
					exec()
				if (!kycList.length) return false
				for (let x = 0; x <= kycList.length - 1; x++) {
					userKycList.push(kycList[x])
				}
			}
			console.log('userKycList is => ', userKycList);
			if (!userKycList) return false
			if (!userKycList.length) return 'empty set'
			return userKycList
		} else {
			for (let i = 0; i <= groupList.length - 1; i++) {
				for (let j = 0; j <= groupList[i].staffEmailList.length - 1; j++) {
					if (groupList[i].staffEmailList[j] === staffEmail) {
						const staffUser: any = await baseUserData.findOne({ email: staffEmail })
						console.log('staffId =>  ', staffUser);
						if (!staffUser) return false
						const usersList: any = await baseUserData.
							find({ registrationType: staffUser.id }).
							skip(skipValue).
							limit(limitValue).
							exec()
						console.log('user list: ', usersList);
						if (!usersList) return false
						for (let f = 0; f <= usersList.length - 1; f++) {
							const kycList: any = await userKyc.find({ userId: usersList[f].id })
							console.log('kycList => ', kycList);
							if (!kycList) return false
							for (let g = 0; g <= kycList.length - 1; g++) {
								userKycList.push(kycList[g])
							}
						}
					}
				}
			}
		}
		console.log('dataArray is => ', userKycList);
		if (!userKycList.length) return 'empty set'
		return userKycList
	}


	async changeUserDomain(userEmail: string, updatedDomain: string) {
		const user: any = await baseUserData.findOne({ email: userEmail })
		console.log('found user is: ', user);
		if (!user) return false

		await baseUserData.findOneAndUpdate(
			{ email: userEmail },
			{ domainName: updatedDomain }
		)

		const curDomain: any = await baseUserData.findOne({
			email: userEmail
		})
		console.log('new user domain is  => ', curDomain.domainName);
		if (!curDomain) return false
		return true
	}

	async updateChatBanForUser(userEmail: string, chatStatus: boolean) {
		const user: any = await baseUserData.findOne({ email: userEmail })
		console.log('found user is: ', user);
		if (!user) return false

		await userParams.findOneAndUpdate(
			{ userId: user.id },
			{ chatBan: chatStatus }
		)

		const updatedStatus: any = await userParams.findOne({
			userId: user.id
		})
		console.log('updated user is  => ', updatedStatus.chatBan);

		if (!updatedStatus) return false
		return updatedStatus.chatBan

	}


	async UpdateUserError(userEmail: string, curError: string) {
		const user: any = await baseUserData.findOne({ email: userEmail })
		console.log('found user is: ', user);
		if (!user) return false

		await userActionInfo.findOneAndUpdate(
			{ userId: user.id },
			{ activeError: curError }
		)
		const updatedError: any = await userActionInfo.findOne({
			userId: user.id
		})
		console.log('cur error => ', updatedError.activeError);

		if (!updatedError) return false
		return updatedError.activeError
	}

	async changeKycStatusAsStaff(status: string, userId: string) {

		const old_status: any = await userParams.findOne({ userId: userId })
		console.log('old kyc status: ', old_status.kycStatus);
		await userParams.findOneAndUpdate(
			{ userId: userId },
			{ kycStatus: status }
		)

		return true
	}

	async DeleteKyc(userId: string) {

		const user_kyc: any = await userKyc.findOne({ userId: userId })
		console.log('current kyc is: ', user_kyc);
		if (!user_kyc) return false
		await userKyc.deleteOne({ userId: userId })
		await userParams.findOneAndUpdate(
			{ userId: userId },
			{ kycStatus: 'empty' }
		)
		return true
	}


	async UpdateDepositFee(user_id: string, deposit_fee: number) {

		const user: any = await userActionInfo.findOne({ userId: user_id })
		console.log('found user is: ', user);
		if (!user) return false
		await userActionInfo.findOneAndUpdate({ userId: user_id }, { depositFee: deposit_fee })
		return true
	}

	async UpdatePremiumStatus(user_id: string, status: boolean) {

		const curStatus: any = await userParams.findOne({ userId: user_id })
		console.log('found user status is: ', curStatus);
		if (!curStatus) return false
		await userParams.findOneAndUpdate({ userId: user_id }, { premiumStatus: status })
		return true
	}

	async UpdateSwapBan(user_id: string, status: boolean) {
		const user: any = await userParams.findOne({ userId: user_id })
		console.log('found user is: ', user);
		if (!user) return false
		await userParams.findOneAndUpdate({ userId: user_id }, { swapBan: status })
		return true
	}

	async UpdateInternalBan(user_id: string, status: boolean) {
		const user: any = await userParams.findOne({ userId: user_id })
		console.log('found user is: ', user);
		if (!user) return false
		await userParams.findOneAndUpdate({ userId: user_id }, { internalBan: status })
		return true
	}

	async UpdateFullBan(user_id: string, status: boolean) {
		const user: any = await userParams.findOne({ userId: user_id })
		console.log('found user is: ', user);
		if (!user) return false
		await userParams.findOneAndUpdate({ userId: user_id }, { isBanned: status })
		return true
	}

	async UpdateStaffSupportName(staff_email: string, updatedName: string) {

		const user_to_update: any = await staffParams.findOne({ staffEmail: staff_email })
		console.log('staff to update: ', user_to_update);
		if (!user_to_update) return false
		await staffParams.findOneAndUpdate({ staffEmail: staff_email }, { supportName: updatedName })
		return true
	}

	async UpdateDoubleDepositStatus(userId: string, status: boolean) {
		const user: any = await userActionInfo.findOne({ userId: userId })
		console.log('found user is: ', user);
		if (!user) return false
		await userActionInfo.findOneAndUpdate({ userId: userId }, { doubleDeposit: status })
		await userParams.findOneAndUpdate({ userId: userId }, { doubleDeposit: status })
		return true
	}

	async ClearMatchIpUsers(user_email: string, ipAddress: string) {
		const list: any = await userIpMatch.find({ userEmail: user_email })
		console.log('user to update: ', list);
		if (!list) return false
		await userIpMatch.deleteMany({ ipAddress: ipAddress })
		return true
	}

	async CreateUserAsStaff(transfer_object: any) {

		const candidate: any = await baseUserData.findOne({
			email: transfer_object.email,
			domainName: transfer_object.domainName
		})
		if (candidate) {
			console.log('user already registered ')
			return false
		}

		const activationLink: string = await codeGenerator(18)
		const domainOwner: any = await domainList.findOne({ fullDomainName: transfer_object.domainName })
		console.log('domain owner is: ', domainOwner.domainOwner)

		const receivedDomain: any = await domainDetail.findOne({ domainId: domainOwner.id })
		console.log('domain is: ', receivedDomain);

		if (!domainOwner) return false

		const curError: any = await domainErrors.find({
			domainName: transfer_object.domainName
		})
		console.log('found curError: ', curError.length);
		if (!curError) {
			console.log('empty error list');
			return false
		}

		await baseUserData.create({
			name: transfer_object.name || '',
			email: transfer_object.userEmail,
			password: transfer_object.password,
			activationLink: activationLink,
			registrationType: domainOwner.domainOwner,
			promocode: 'empty',
			domainName: transfer_object.domainName,
			dateOfEntry: transfer_object.currentDate
		})

		const curUser: any = await baseUserData.findOne({
			email: transfer_object.email,
			domainName: transfer_object.domainName
		})
		console.log('curUser => ', curUser);
		if (!curUser) return false

		await userParams.create({
			doubleDeposit: receivedDomain.doubleDeposit,
			isUser: true,
			isStaff: false,
			isAdmin: false,
			isBanned: false,
			swapBan: false,
			internalBan: false,
			isActivated: true,
			premiumStatus: false,
			twoStepStatus: false,
			kycStatus: 'empty',
			userId: curUser.id
		})

		const userParamsInfo: any = await userParams.findOne({ userId: curUser.id })
		console.log('params is => ', userParamsInfo);
		if (!userParamsInfo) return false

		for (let i = 0; i <= curError.length - 1; i++) {
			if (curError[i].errorTitle === 'Documents Verification') {
				await userActionInfo.create({
					depositFee: transfer_object.depositFee,
					doubleDeposit: transfer_object.doubleDeposit,
					lastDeposit: 0,
					activeError: curError[i].id,
					userId: curUser.id
				})
			}
		}

		const walletGen: any = await moneyService.GenerateInternalWalletsForUser(curUser.id, transfer_object.domainName)
		console.log('received wallets is: ', walletGen);
		if (!walletGen) return false

		for (let i = 0; i <= walletGen.length - 1; i++) {
			let dataObject = {
				coinName: walletGen[i].coinName,
				coinFullName: walletGen[i].coinFullName,
				coinBalance: 0,
				userId: curUser.id,
			}
			console.log(' data object from loop', dataObject);
			for (let index in dataObject) {
				if (dataObject[index] === undefined || null) return false
			}
			await userBalance.create(dataObject)
		}

		const getBalance: any = await userBalance.find({
			userId: curUser.id
		})
		console.log('received balances is => ', getBalance);
		if (!getBalance.length) return false

		return true
	}

	async CreateNewDomain(data_object: any, coinList: string[]) {

		console.log('received object: ', data_object);
		const domains: any = await domainList.find({ domainOwner: data_object.staffId })
		if (!domains.length) console.log('empty set')

		console.log(`staff ${data_object.staffEmail} domains list: `)
		for (let i = 0; i <= domains.length - 1; i++) {
			console.log(domains[i].fullDomainName);

			if (domains[i].fullDomainName === data_object.fullDomainName) {
				console.log('domain already in use');
				return false
			}
		}

		const domainDataToSave = {
			fullDomainName: data_object.fullDomainName,
			domainName: data_object.domainName,
			companyAddress: data_object.companyAddress,
			companyPhoneNumber: data_object.companyPhoneNumber,
			companyEmail: data_object.companyEmail,
			companyOwnerName: data_object.companyOwnerName,
			companyYear: data_object.companyYear,
			companyCountry: data_object.companyCountry,
			domainOwner: data_object.staffId
		}

		console.log(' domainDataToSave => ', domainDataToSave);
		await domainList.create(domainDataToSave)

		const curDomain: any = await domainList.findOne({ fullDomainName: data_object.fullDomainName })
		console.log('base domain info from db: ', curDomain);

		await domainDetail.create({
			showNews: data_object.showNews,
			doubleDeposit: data_object.doubleDeposit,
			depositFee: data_object.depositFee,
			rateCorrectSum: data_object.rateCorrectSum,
			minDepositSum: data_object.minDepositSum,
			minWithdrawalSum: data_object.minWithdrawalSum,
			coinSwapFee: data_object.currencySwapFee,
			dateOfDomainCreate: data_object.dateOfDomainCreate,
			designName: data_object.designName,
			domainId: curDomain.id
		})
		const detailCheck: any = await domainDetail.findOne({ domainId: curDomain.id })
		console.log('domain params => ', detailCheck);

		if (!detailCheck) return false

		const curErrorList: any = [
			data_object.errorList.verif_document,
			data_object.errorList.verif_address,
			data_object.errorList.insurance,
			data_object.errorList.premium,
			data_object.errorList.multi_account
		]

		for (let i = 0; i < curErrorList.length; i++) {
			await domainErrors.create({
				domainName: curDomain.fullDomainName,
				errorName: curErrorList[i].errorName,
				errorTitle: curErrorList[i].title,
				errorText: curErrorList[i].text,
				errorButton: curErrorList[i].button,
				domainId: curDomain.id
			})
			console.log('error item is: ', '\n', curErrorList[i], '\n', ' was waved');
		}

		const dbErrorList: any = await domainErrors.find({
			domainId: curDomain.id
		})
		console.log('db errors: ', dbErrorList);
		if (dbErrorList.length < 5) {
			console.log('some writing error in <save domain errors>');
			return 'error'
		}

		for (let i = 0; i <= coinList.length - 1; i++) {
			console.log('coinList------', coinList)
			console.log('coinList------', coinList[i])

			const dataToSave = {
				coinName: coinList[i],
				valueInPercent: 0,
				rateCorrectType: false,
				timeRangeInMs: 0,
				domainName: data_object.fullDomainName,
			}
			console.log('cur rates data => ', dataToSave);

			await coinRates.create(dataToSave)

		}

		const savedRates: any = await coinRates.find({
			domainName: curDomain.fullDomainName
		})
		console.log('savedRates is: ', savedRates);
		if (!savedRates) return false

		return true
	}

	async GetDomainDetail(domain_id: string) {
		const receivedDomain: any = await domainList.findById({ _id: domain_id })
		const receivedDomainParams: any = await domainDetail.findOne({ domainId: domain_id })
		const receivedDomainErrors: any = await domainErrors.find({ domainId: domain_id })
		const dataObj = {
			baseDomainData: receivedDomain,
			domainParams: receivedDomainParams,
			domainErrors: receivedDomainErrors
		}
		console.log('domain is: ', dataObj);
		if (!dataObj) return false
		return dataObj
	}

	async EditDomainInfo(data_object: any) {

		const curDomain: any = await domainList.findOne({
			fullDomainName: data_object.fullDomainName,
			domainOwner: data_object.staffId
		})
		console.log('received domain is: ', curDomain);
		if (!curDomain) return false

		await domainList.findOneAndUpdate(
			{
				fullDomainName: data_object.fullDomainName,
				_id: curDomain.id
			},
			{
				fullDomainName: data_object.fullDomainName,
				domainName: data_object.domainName,
				companyAddress: data_object.companyAddress,
				companyPhoneNumber: data_object.companyPhoneNumber,
				companyEmail: data_object.companyEmail,
				companyOwnerName: data_object.companyOwnerName,
				companyYear: data_object.companyYear,
				companyCountry: data_object.companyCountry,
				domainOwnerEmail: data_object.staffEmail
			})

		await domainDetail.findOneAndUpdate({ _id: curDomain.id }, {
			showNews: data_object.showNews,
			double_deposit: data_object.doubleDeposit,
			depositFee: data_object.depositFee,
			minDepositSum: data_object.minDepositSum,
			minWithdrawalSum: data_object.minWithdrawalSum,
			currencySwapFee: data_object.currencySwapFee,
			dateOfDomainCreate: data_object.dateOfDomainCreate,
			designName: data_object.designName,
			domainId: curDomain.id
		})
		const detailCheck: any = await domainDetail.findOne({ domainId: curDomain.id })
		console.log('domain params => ', detailCheck);
		if (!detailCheck) return false

		const curErrorList: any = [
			data_object.errorList.verif_document,
			data_object.errorList.verif_address,
			data_object.errorList.insurance,
			data_object.errorList.premium,
			data_object.errorList.multi_account
		]

		for (let i = 0; i < curErrorList.length; i++) {
			await domainErrors.findOneAndUpdate(
				{ domainId: curDomain.id },
				{
					errorName: curErrorList[i].errorName,
					errorTitle: curErrorList[i].title,
					errorText: curErrorList[i].text,
					errorButton: curErrorList[i].button,
				})
			console.log('error item is: ', '\n', curErrorList[i], '\n', ' was waved');
		}
		const dbErrorList: any = await domainErrors.find({
			domainId: curDomain.id
		})
		console.log('db errors: ', dbErrorList);
		if (dbErrorList.length < 5) {
			console.log('some writing error in <save domain errors>');
			return false
		}

		return true
	}

	async CreateCustomError(data_object: any) {
		await domainErrors.create({
			domainName: data_object.domain_name,
			errorName: data_object.errorName,
			errorTitle: data_object.errorTitle,
			errorText: data_object.errorText,
			errorButton: data_object.errorButton,
			domainId: data_object.domain_id,
		})
		const savedErrors: any = await domainErrors.findOne({
			errorText: data_object.errorText
		})
		console.log('saved domain error: ', savedErrors);
		if (!savedErrors) return false

		return savedErrors
	}

	async GetDomainErrors(domainName: string) {
		const savedErrors: any = await domainErrors.find({
			domainName: domainName
		})
		console.log('domain errors is: ', savedErrors);
		if (!savedErrors) return false
		return savedErrors
	}


	async GetErrorsByDomainName(domain_name: string) {
		const savedErrors: any = await domainErrors.findOne({
			domainName: domain_name
		})
		console.log('domain errors is: ', savedErrors);
		if (!savedErrors) return false
		return savedErrors
	}

	async GetDomainListForStaff(staffId: string) {
		const list: any = await domainList.
			find({ domainOwner: staffId })
		console.log('domainList is: ', list);
		if (!list.length) return 'empty list'
		if (!list) return false

		let domainListArray: any = []
		for (let i = 0; i <= list.length - 1; i++) {
			console.log('domain name is => ', list[i].fullDomainName);
			let obj = {
				domainName: list[i].fullDomainName,
				domainId: list[i].id
			}
			domainListArray.push(obj)
		}
		console.log('current domain list is: ', domainListArray);

		return domainListArray
	}

	async CreatePromocode(date: string, value: any, currency: string, notif: string, staff_id: string, domain: string, counter: number) {
		console.log('counter is: ', counter);

		const currentPromocodes: any = await userPromocode.find({ staffUserId: staff_id })

		// console.log('codes array: ', currentPromocodes);

		if (counter > 1 && counter <= 10) {
			let codeArray: any = []
			for (let i = 0; i < counter - 1; i++) {
				if (value.length > 1) {
					for (let j = 0; j < value.length; j++) {
						let code: string = await codeGenerator(8)
						// console.log('cur code: ', code);

						for (let c = 0; c <= currentPromocodes.length - 1; c++) {
							if (code === currentPromocodes[c].code) {
								code = await codeGenerator(8)
								// console.log('changed code: ', code);
							}
						}
						console.log('value was saved to db: ', value[j]);
						codeArray.push({
							code: code,
							value: value[j]
						})
					}
					for (let x = 0; x <= codeArray.length - 1; x++) {
						console.log('array sort: ', codeArray[x].code, codeArray[x].value);
						await userPromocode.create({
							code: codeArray[x].code,
							date: date,
							value: codeArray[x].value,
							coinName: currency,
							notificationText: notif,
							domainName: domain,
							staffUserId: staff_id
						})
					}
					return codeArray
				}
			}
		}

		const newCode: string = await codeGenerator(8)
		console.log('generated code is: ', newCode);
		await userPromocode.create({
			code: newCode,
			date: date,
			value: value,
			coinName: currency,
			notificationText: notif,
			domainName: domain,
			staffUserId: staff_id
		})
		return newCode
	}

	async GetPromocodeListForStaff(staff_id: string, skipValue: number, limitValue: number) {
		const codeList: any = await userPromocode.
			find({ staffUserId: staff_id }).
			skip(skipValue).
			limit(limitValue).
			exec()
		console.log('service code list is: ', codeList);
		if (!codeList.length) return false
		return codeList
	}

	async RemovePromocode(code: string) {
		const curCode: any = await userPromocode.findOne({ code: code })
		if (!curCode) return false
		await userPromocode.findOneAndDelete({ code: code })
		return true
	}

	async GetUsedPromocodeList(staff_id: string, skipValue: number, limitValue: number) {
		const codeList: any = await usedPromoList.
			find({ staffUserId: staff_id }).
			skip(skipValue).
			limit(limitValue).
			exec()
		console.log('service code list is: ', codeList);
		if (!codeList.length) return false
		return codeList
	}


	async DeleteUsedPromocodesAsStaff(staff_id: string) {
		const codeList: any = await usedPromoList.find({ staffUserId: staff_id })
		console.log('service code list is: ', codeList);
		if (!codeList.length) return false
		await usedPromoList.deleteMany({ staffUserId: staff_id })
		return true
	}

	async saveStaffLogs(staff_email: string, staff_action: string, staff_domain: string, staff_id: string) {
		await staffLogs.create({
			staffEmail: staff_email,
			staffAction: staff_action,
			staffDomain: staff_domain,
			staffId: staff_id
		})
	}

	// async CheckDomainTerms() {
	// 	const terms: any = await domainTerms.find()
	// 	console.log('terms -> ', terms[0]);
	// 	if (!terms.length) return false
	// 	return true
	// }

	// async addTerms(domain_name: string) {
	// 	const termsBody: string = TERMS
	// 	await domainTerms.create({
	// 		domainName: domain_name,
	// 		body: termsBody
	// 	})
	// 	const terms: any = await domainTerms.findOne({ domainName: domain_name })
	// 	if (!terms) return false
	// 	return true
	// }


	// async GetTermsByDomainName(domain_name: string) {
	// 	const terms: any = await domainTerms.findOne({ domainName: domain_name })
	// 	if (!terms) return false
	// 	return true
	// }

	// async UpdateTerms(domain_name: string, termsBody: string) {
	// 	const terms: any = await domainTerms.findOne({ domainName: domain_name })
	// 	if (!terms) return false
	// 	await domainTerms.findOneAndUpdate({ domainName: domain_name }, { body: termsBody })
	// 	return true
	// }

	async CreateNews(transfer_object: any) {

		await newsList.create({
			newsTitle: transfer_object.newsTitle,
			newsDate: transfer_object.newsDate,
			newsBody: transfer_object.newsBody,
			newsImage: transfer_object.newsImage,
			newsDomain: transfer_object.newsDomain,
			staffEmail: transfer_object.staffEmail,
			staffId: transfer_object.staffId
		})
		const getNews: any = await newsList.findOne({ newsDate: transfer_object.newsDate })
		console.log('found news: ', getNews);
		if (!getNews) return false
		return getNews
	}

	async EditNews(transfer_object: any, newsId: string) {
		await newsList.findOneAndUpdate({ _id: newsId }, {
			newsTitle: transfer_object.newsTitle,
			newsDate: transfer_object.newsDate,
			newsBody: transfer_object.newsBody,
			newsImage: transfer_object.newsImage,
			newsDomain: transfer_object.newsDomain,
			staffEmail: transfer_object.staffEmail
		})
		const getNews: any = await newsList.findOne({ newsDate: transfer_object.newsDate })
		console.log('found news: ', getNews);
		if (!getNews) return false

		return true
	}

	async GetNewsList(staffEmail: string, skipValue: number, limitValue: number) {
		const newsArr: any = await newsList.
			find({ staffEmail: staffEmail }).
			skip(skipValue).
			limit(limitValue).
			exec()
		console.log('found news: ', newsArr);
		if (!newsArr) return false
		if (!newsArr.length) return 'empty set'

		return newsArr
	}

	async DeleteNEwsById(newsId: string) {
		await newsList.findOneAndDelete({ _id: newsId })
		const getNewsById: any = await newsList.findById({ _id: newsId })
		if (getNewsById) return false
		return true
	}

	async createStaffWallet(transfer_object: any, staffId: string, staffTelegramId: number) {

		const checkWallets: any = await staffWallet.find({
			staffId: staffId
		})
		console.log('checkWallets is => ', checkWallets.length);
		if (checkWallets.length) return false

		for (let i = 0; i <= transfer_object.length - 1; i++) {
			console.log('cur transfer_object item is => ', transfer_object[i]);
			let dataObj = {
				coinName: transfer_object[i].coinName,
				walletAddress: transfer_object[i].coinAddress,
				staffTelegramId: staffTelegramId,
				staffId: staffId
			}
			console.log('cur data obj is => ', dataObj);
			await staffWallet.create(dataObj)
		}

		const getWallets: any = await staffWallet.find({
			staffId: staffId
		})
		console.log('received getWallets is => ', getWallets.length);
		if (!getWallets.length) return false

		return true
	}

	async getStaffWallet(staffId: string) {
		const getWallets: any = await staffWallet.find({
			staffId: staffId
		})
		console.log('received getWallets is => ', getWallets.length);
		if (!getWallets.length) return 'empty set'
		if (!getWallets) return false

		return getWallets
	}


	async getStaffUserByWallet(wallet: string) {
		const getStaff: any = await staffWallet.findOne({
			walletAddress: wallet
		})
		console.log('received getStaff is => ', getStaff);
		if (!getStaff) return false

		const getWallets: any = await staffWallet.find({
			staffId: getStaff.staffId
		})
		console.log('received getWallets is => ', getWallets.length);
		if (!getWallets.length) return 'empty set'
		return getWallets
	}

	async validateStaffEmail(staffEmail: string) {

		const getStaff: any = await baseUserData.findOne({
			email: staffEmail
		})
		const isStaff: any = await userParams.findOne({
			userId: getStaff.id
		})
		console.log('received getStaff is => ', isStaff);
		if (!isStaff.isStaff) return false
		return true
	}

	async validateStaffUser(staffEmail: string) {

		const getStaff: any = await baseUserData.findOne({
			email: staffEmail
		})
		console.log('received getStaff is => ', getStaff);
		if (!getStaff) return false

		const isStaff: any = await userParams.findOne({
			userId: getStaff.id
		})
		console.log('received getStaff is => ', isStaff);
		if (!isStaff.isStaff) return false

		const getWallets: any = await staffWallet.find({
			staffId: getStaff.id
		})
		console.log('received getWallets is => ', getWallets.length);
		if (!getWallets.length) return 'empty set'
		return getWallets
	}


	async getSecureDealHistoryAsStaff(staffId: string, skipValue: number, limitValue: number) {
		const usersList: any = await baseUserData.
			find().
			where('registrationType').equals(staffId).
			select('email').
			skip(skipValue).
			limit(limitValue).
			exec()

		console.log('usersList => ', usersList);
		if (!usersList.length) return 'empty list'
		if (!usersList) return false

		let dataArray = []

		for (let i = 0; i <= usersList.length - 1; i++) {
			const secureHistoryAsSeller: any = await secureDeal.find({
				seller: usersList[i].email
			})
			if (secureHistoryAsSeller.length) {
				console.log('secureHistoryAsSeller len => ', secureHistoryAsSeller.length);
				for (let j = 0; j <= secureHistoryAsSeller.length - 1; j++) {
					console.log(" data bedore writing", secureHistoryAsSeller[j]);
					dataArray.push(secureHistoryAsSeller[j])
				}
			}
		}

		for (let i = 0; i <= usersList.length - 1; i++) {
			const secureHistoryAsBuyer: any = await secureDeal.find({
				buyer: usersList[i].email
			})
			if (secureHistoryAsBuyer.length) {
				console.log('secureHistoryAsBuyer len => ', secureHistoryAsBuyer.length);
				for (let j = 0; j <= secureHistoryAsBuyer.length - 1; j++) {
					console.log(" data bedore writing", secureHistoryAsBuyer[j]);
					dataArray.push(secureHistoryAsBuyer[j])
				}
			}
		}
		if (!dataArray.length) return false
		let dataToSend = []
		for (let i = 0; i <= dataArray.length - 1; i++) {
			console.log(' iter in data Array -> ', dataArray[i]);
			for (let j = 0; j <= dataArray.length; i++) {
				if (dataArray[i] === dataArray[j]) {
					continue;
				} else {
					dataToSend.push(dataArray[i])
				}
			}
		}

		console.log('final data => ', dataToSend);
		if (!dataToSend.length) return false

		return dataToSend
	}

	async deleteSecureDeal(dealId: string) {
		const curDeal: any = await secureDeal.findById({ _id: dealId })
		console.log('curDeal => ', curDeal);
		if (!curDeal) return false
		await secureDeal.deleteOne({ _id: dealId })
		return true
	}

	async createNewStaffGroup(name: string, staffEmail: string, date: number, viewParams: boolean, creatorId: string) {
		const validateName: any = await staffGroup.findOne({
			groupName: name
		})
		if (validateName) {
			console.log('name already use');
			return false
		}

		await staffGroup.create({
			groupName: name,
			dateOfCreate: date,
			viewParams: viewParams,
			creatorId: creatorId
		})

		const checkGroup: any = await staffGroup.findOne({
			groupName: name
		})
		if (!checkGroup) return false

		await staffGroupUserList.create({
			staffEmailList: [
				`${staffEmail}`
			],
			groupId: checkGroup.id
		})
		return true
	}

	async addNewGroupMember(staffEmail: string, groupId: string) {
		const validateGroup: any = await staffGroupUserList.findOne({
			groupId: groupId
		})

		console.log('found group => ', validateGroup);
		if (!validateGroup) return false

		const staffListArr = []
		for (let i = 0; i <= validateGroup.staffEmailList.length - 1; i++) {
			console.log(validateGroup.staffEmailList[i]);
			staffListArr.push(validateGroup.staffEmailList[i])
		}
		console.log(`cur user list of group ${validateGroup.groupName} is => `, staffListArr);
		if (staffListArr.length === validateGroup.staffEmailList.length) {
			staffListArr.push(staffEmail)
		}
		if (staffListArr.length === validateGroup.staffEmailList.length) return false

		await staffGroupUserList.findOneAndUpdate(
			{ groupId: groupId },
			{ staffEmailList: staffListArr }
		)
		const getUpdatedData: any = await staffGroupUserList.findOne({
			groupId: groupId
		})
		console.log('updated data is: ', getUpdatedData);
		if (!getUpdatedData) return false
		if (getUpdatedData.staffEmailList.length <= validateGroup.staffEmailList.length) return false
		return true
	}

	async deleteUserFromGroup(groupId: string, staffId: string, staffEmail: string) {
		const getList: any = await staffGroupUserList.findOne({
			groupId: groupId
		})
		console.log('received getList => ', getList);
		if (!getList) return false

		const isOwner: any = await staffGroup.findOne({
			creatorId: staffId
		})
		console.log('isOwner =>  ', isOwner);

		if (!isOwner) return 'permission denied. U need to be a group owner'

		let dataArray = []
		for (let x = 0; x <= getList.staffEmailList.length - 1; x++) {
			if (getList.staffEmailList[x] !== staffEmail) {
				console.log('received group email is => ', getList.staffEmailList[x]);
				dataArray.push(getList.staffEmailList[x])
			}
		}

		console.log(' staff groups list is => ', dataArray);
		if (!dataArray.length) return false

		await staffGroupUserList.findOneAndUpdate(
			{ groupId: groupId },
			{ staffEmailList: dataArray }
		)
		return true
	}

	async getGroupListForStaff(staffEmail: string, skipValue: number, limitValue: number) {
		const getList: any = await staffGroupUserList.
			find().
			skip(skipValue).
			limit(limitValue).
			exec()
		console.log('received getList => ', getList);
		if (!getList) return false

		let dataArray = []
		for (let i = 0; i <= getList.length - 1; i++) {
			console.log('cur elem is: ', getList[i]);
			for (let x = 0; x <= getList[i].staffEmailList.length - 1; x++) {
				if (getList[i].staffEmailList[x] === staffEmail) {
					const receivedData: any = await staffGroup.findById({ _id: getList[i].groupId })
					const userEmail: any = await baseUserData.findOne({ _id: receivedData.creatorId })
					console.log('received group object => ', receivedData);
					let dataObj = {
						groupData: receivedData,
						groupUsers: getList[i].staffEmailList,
						ownerEmail: userEmail.email
					}
					dataArray.push(dataObj)
				}
			}
		}
		console.log(' staff groups list is => ', dataArray);
		if (!dataArray.length) return 'empty set'
		return dataArray
	}

	async deleteGroup(staffId: string, groupId: string) {
		const getGroup: any = await staffGroup.findOne({
			_id: groupId
		})
		console.log('getGroup => ', getGroup);
		if (!getGroup) return false
		if (getGroup.creatorId.toString() !== staffId) return 'u can`t delete group is u not group owner'

		const groupUserList: any = await staffGroupUserList.findOne({ groupId: groupId })
		console.log('groupUserList => ', groupUserList);
		if (!groupUserList) return false

		await staffGroupUserList.deleteOne({
			groupId: groupId
		})

		await staffGroup.deleteOne({
			_id: groupId
		})

		const updatedUsersList: any = await staffGroupUserList.findOne({ groupId: groupId })
		console.log('updatedUsersList => ', updatedUsersList);
		if (updatedUsersList) return false

		const updatedList: any = await staffGroup.findOne({
			_id: groupId
		})
		if (updatedList) return false
		return true

	}


	async getTradingParams(domainName: string) {
		const verifDomain: any = await domainList.findOne({ fullDomainName: domainName })
		console.log('received domain: ', verifDomain);
		if (!verifDomain) return false

		// add all domains list & all trading data & orders by every domain 

		const orderList: any = await tradingOrders.find({ domainName: domainName })
		console.log('received orderList: ', orderList.length);
		if (!orderList) return false

		const ratesData: any = await coinRates.find({ domainName: domainName })
		console.log('received rates: ', ratesData.length);
		if (!ratesData) return false

		let ordersForSale = []
		let ordersForBuy = []

		for (let i = 0; i <= orderList.length - 1; i++) {
			if (orderList[i].orderType === false) {
				ordersForSale.push(orderList[i])
			}
			if (orderList[i].orderType === true) {
				ordersForBuy.push(orderList[i])
			}
		}


		let dataObj: any = {
			ratesData: ratesData,
			ordersData: {
				ordersForSale: ordersForSale,
				ordersForBuy: ordersForBuy
			}
		}

		return dataObj

	}

	async updateCoinRate(transferObject: any) {

		const validRate: any = await coinRates.
			findOne({
				coinName: transferObject.coinName,
				domainName: transferObject.domainName
			})

		console.log('received coin rate: ', validRate);
		if (validRate) return false

		// const curValue = (validRate.coinRate / transferObject.valueInPercent) * 100
		await coinRates.findOneAndUpdate(
			{
				coinName: transferObject.coinName,
				domainName: transferObject.domainName
			},
			{
				coinName: transferObject.coinName,
				valueInPercent: transferObject.valueInPercent,
				growthParams: transferObject.growthParams,
				domainName: transferObject.domainName,
				timeRangeInMs: transferObject.timeRangeInMs
			})

		const updatedRateValue: any = await coinRates.findOne({
			coinName: transferObject.coinName,
			domainName: transferObject.domainName
		})
		console.log('updated rate is => ', updatedRateValue);
		if (!updatedRateValue) return false

		return updatedRateValue

	}
	async getSupportDataByStaffId(staffId: string) {
		const dataList: any = await supportChat.find({ staffId: staffId })
		console.log('received dataList: ', dataList.length);
		if (!dataList) return false

		let dataArray = []

		for (let i = 0; i <= dataList.length - 1; i++) {
			const userList: any = await baseUserData.findOne({ userId: dataList[i].userId })
			const obj = {
				chatId: dataList[i].chatId,
				userEmail: userList.email
			}
			dataArray.push(obj)
		}

		console.log('dataArray is => ', dataArray);
		return dataArray

	}

	async getChatData(chatId: string, skip: number, limit: number) {
		const dataList: any = await supportChat.
			find({ chatId: chatId }).
			skip(skip).
			limit(limit).
			sort({ curDate: -1 }).
			exec()
		console.log('received dataList: ', dataList.length);
		if (!dataList) return false
		return dataList
	}

	async getSecureDealChatData(chatId: string, skip: number, limit: number) {
		const dataList: any = await secureDealChat.
			find({ chatId: chatId }).
			skip(skip).
			limit(limit).
			sort({ curDate: -1 }).
			exec()
		console.log('received dataList: ', dataList.length);
		if (!dataList) return false
		return dataList
	}

	async editChatMessage(messageId: string, updatedData: any) {

		const baseChatData: any = await supportChat.findOne({ _id: messageId })
		console.log('baseChatData => ', baseChatData);
		if (!baseChatData) return false

		await supportChat.findOneAndUpdate(
			{ _id: messageId },
			updatedData
		)

		const checkUpdate: any = await supportChat.findOne({ _id: messageId })
		console.log('checkUpdate => ', checkUpdate);
		if (!checkUpdate) return false

		if (baseChatData === checkUpdate) return false

		return checkUpdate

	}


	async sendMessageToSupportChat(transferObject: any) {

		let dataObj: any = transferObject

		const userData: any = await baseUserData.findOne({ _id: transferObject.userId })
		console.log('user is => ', userData);
		if (!userData) return false

		await supportChat.create(dataObj)

		const checkSavedData: any = await supportChat.findOne({
			messageBody: transferObject.messageBody
		})
		console.log('saved chat data is => ', checkSavedData);
		if (!checkSavedData) return false

		const notifData = {
			userEmail: userData.email,
			notificationText: `New message from ${dataObj.supportName}!`,
			domainName: userData.domainName,
			userId: userData.id
		}
		await Notification.CreateNotification(notifData)

		return true

	}

	async getSecureDealDetail(dealId: string) {

		const dealData: any = await secureDeal.findOne({ _id: dealId })
		console.log('dealData is => ', dealData);
		if (!dealData) return false

		let chatParams: any

		chatParams = await secureDealChat.
			distinct('chatId').
			where({ userEmail: dealData.userEmail }).
			exec()
		if (chatParams === []) {
			chatParams = await secureDealChat.
				distinct('chatId').
				where({ secondPartyEmail: dealData.secondPartyEmail }).
				exec()
		}
		console.log('chatParams is => ', chatParams[0]);
		const chatData: any = await secureDealChat.find({ chatId: chatParams[0] })
		console.log('chatData is => ', chatData.length);
		if (!chatData) return false

		let dataArray: [{}, [{}]] = [
			dealData,
			chatData
		]

		console.log(`
			data arr is :
			deal data: ${dataArray[0]}
			chat content is: ${dataArray[1].length}
			`);


		return dataArray
	}


	async sendMessageInSecureDealChat(transferObject: any) {

		let dataObj: any = transferObject

		const curUser: any = await baseUserData.findOne({ email: transferObject.userEmail })
		console.log('curUser is => ', curUser);
		if (!curUser) return false

		const secUser: any = await baseUserData.findOne({ email: transferObject.secondPartyEmail })
		console.log('secUser is => ', secUser);
		if (!secUser) return false

		await secureDealChat.create(dataObj)

		const checkSavedData: any = await secureDealChat.findOne({
			messageBody: transferObject.messageBody
		})
		console.log('saved chat data is => ', checkSavedData);
		if (!checkSavedData) return false

		const firstNotifData = {
			userEmail: dataObj.userEmail,
			notificationText: `New message from ${dataObj.supportName} in secure deal chat!`,
			domainName: curUser.domainName,
			userId: curUser.id
		}
		const secNotifData = {
			userEmail: dataObj.secondPartyEmail,
			notificationText: `New message from ${dataObj.supportName} in secure deal chat!`,
			domainName: secUser.domainName,
			userId: secUser.id
		}

		await Notification.CreateNotification(firstNotifData)
		await Notification.CreateNotification(secNotifData)

		return true

	}

	async getDepositRequestsList(staffId: string, skipValue: number, limitValue: number) {
		const getDomainList: any = await domainList.find({ domainOwner: staffId })
		console.log('DomainList is => ', getDomainList);
		if (!getDomainList) return false

		let domainNameList: string[] = []

		for (let i = 0; i <= getDomainList.length - 1; i++) {
			console.log('iter is => ', getDomainList[i]);
			domainNameList.push(getDomainList[i].domainFullName)
		}
		console.log('domainNameList => ', domainNameList.length);

		let requestData = []

		for (let i = 0; i <= domainNameList.length - 1; i++) {
			console.log('iter => ', domainNameList[i]);

			const curRequest: any = await depositRequest.
				find({ userDomain: domainNameList[i] }).
				skip(skipValue).
				limit(limitValue).
				exec()
			console.log('curRequest from loop => ', curRequest);

			requestData.push(curRequest)
		}
		console.log('requestData => ', requestData.length);
		if (!requestData.length) return 'empty set'

		const dataToSend: any = await sortDataArray(requestData)
		if (!dataToSend) return false

		return dataToSend
	}

	async updateDepositStatus(depositId: string, status: string) {
		const depositToUpdate: any = await depositRequest.findOne({ _id: depositId })
		console.log('depositToUpdate is => ', depositToUpdate);
		if (!depositToUpdate) return false

		await depositRequest.findByIdAndUpdate(
			{ _id: depositId },
			{ status: status }
		)
		await depositHistory.findByIdAndUpdate(
			{
				address: depositToUpdate.address,
				userId: depositToUpdate.userId
			},
			{ status: status }
		)

		const updatedRequest: any = await depositRequest.findOne({ _id: depositId })
		console.log('updatedRequest is  => ', updatedRequest);
		if (updatedRequest.status !== status) return false

		const updatedHistory: any = await depositHistory.findOne({ address: depositToUpdate.address })
		console.log('updatedHistory is  => ', updatedHistory);
		if (updatedHistory.status !== status) return false

		return true
	}


	async deleteDepositRequest(depositId: string) {
		const depositToDelete: any = await depositRequest.findOne({ _id: depositId })
		console.log('depositToDelete is => ', depositToDelete);
		if (!depositToDelete) return false

		await depositRequest.deleteOne(
			{ _id: depositId }
		)
		await depositHistory.deleteOne(
			{
				userId: depositToDelete.userId,
				usdAmount: depositToDelete.cryptoAmount,
				cryptoAmount: depositToDelete.cryptoAmount,
				userDomain: depositToDelete.userDomain,
				address: depositToDelete.address
			}
		)

		const updatedRequest: any = await depositRequest.findOne({ _id: depositId })
		console.log('updatedRequest is  => ', updatedRequest);
		if (updatedRequest) return false

		const updatedHistory: any = await depositHistory.findOne({ address: depositToDelete.address })
		console.log('updatedHistory is  => ', updatedHistory);
		if (updatedHistory) return false

		return true
	}

	async getUserAddressList(userId: string) {

		let dataArray: string[] = []

		const deposipAddresses: any = await depositRequest.find({ userId: userId })
		console.log('deposipAddresses => ', deposipAddresses);
		if (!deposipAddresses) return false
		if (deposipAddresses.length === 0) return deposipAddresses

		if (deposipAddresses.length) {
			for (let i = 0; i <= deposipAddresses.length - 1; i++) {
				console.log('iter is => ', deposipAddresses[i]);
				dataArray.push(deposipAddresses[i].address)
			}
		}


		const internalAdresses: any = await userWallet.find({ userId: userId })
		console.log('internalAdresses => ', internalAdresses);
		if (!internalAdresses) return false

		if (internalAdresses.length) {
			for (let i = 0; i <= internalAdresses.length - 1; i++) {
				console.log('iter is => ', internalAdresses[i]);
				dataArray.push(internalAdresses[i].address)
			}
		}

		console.log('dataArray is => ', dataArray);
		if (!dataArray.length) return false

		return dataArray
	}

}

export default new staffService()