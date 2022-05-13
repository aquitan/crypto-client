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
import domainTerms from '../models/Domain_terms.model'
import newsList from '../models/News_list.model'
import userNotif from '../models/User_notifications.model'
import userPromocode from '../models/Promocodes.model'
import usedPromoList from '../models/Used_promocodes.model'
import staffLogs from '../models/Staff_logs.model'
import TokenModel from '../models/Token.model'
import TERMS from '../config/terms.template'
import staffWallet from '../models/staff_wallet.model'
import secureDeal from '../models/secure_deal.model'
import userBalance from '../models/User_balance.model'
import userWallet from '../models/user_wallet.model'


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



	async GetUsersList(domainName: string) {
		const usersList: any = await baseUserData.find({ domainName: domainName })
		console.log('user list: ', usersList);

		let dataArray: any = []

		for (let i = 0; i <= usersList.length - 1; i++) {
			const kycParams: any = await userParams.findOne({ userId: usersList[i].id })
			if (!kycParams) return false
			let dataObject = {
				userId: usersList[i].id,
				registerDate: usersList[i].dateOfEntry,
				userName: usersList[i].name,
				userEmail: usersList[i].email,
				userStatus: kycParams.isStaff,
				kycStatus: kycParams.kycStatus
			}
			dataArray.push(dataObject)
		}
		if (!dataArray.length) return false
		return dataArray
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

		let moneyDataArray = []
		for (let i = 0; i <= curUserBalance.length - 1; i++) {
			const curUserWallet: any = await userWallet.findOne().
				where('coinName').equals(curUserBalance[i].coinName).
				where('userId').equals(user_id).
				exec()
			let obj = {
				coinName: curUserWallet.coinName,
				coinBalance: curUserBalance[i].coinBalance,
				internalWallet: curUserWallet.userWallet
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
			user_money: moneyDataArray
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

		// get user balances + last deposit date 
		// get user owner name + get recruiter  
		console.log('data from service: ', UserData);
		return UserData

	}

	async getUserForIpMatch(ip_address: string) {
		const usersList: any = await userIpMatch.find({ ipAddress: ip_address })
		console.log('list is: ', usersList);
		if (!usersList[0]) return usersList
		return false
	}

	async GetKycForStaff(userDomain: string) {
		const kycList: any = await userKyc.find({ userDomain: userDomain })
		if (!kycList) return false
		if (!kycList.length) return 'empty set'
		return kycList
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

		const old_status: any = await userParams.findById({ userId: userId })
		console.log('old kyc status: ', old_status);

		if (old_status.kycStatus === status) {
			console.log('status already set');
			return false
		}
		await userParams.findByIdAndUpdate(
			{ userId: userId },
			{ kycStatus: status }
		)

		return true
	}

	async DeleteKyc(userId: string) {

		const user_kyc: any = await userKyc.findOneAndDelete({ userId: userId })
		console.log('current kyc is: ', user_kyc);
		if (!user_kyc) return false

		await userParams.findByIdAndUpdate(
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

		// const user: any = await baseUserData.findOne({ _id: user_id })
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

		const candidate: any = await baseUserData.findOne({ email: transfer_object.email })
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

		const curUser: any = await baseUserData.findOne({ email: transfer_object.userEmail })
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
		await userActionInfo.create({
			depositFee: receivedDomain.depositFee,
			doubleDeposit: receivedDomain.doubleDeposit,
			lastDeposit: '',
			activeError: 1,
			userId: curUser.id
		})

		return true
	}

	async CreateNewDomain(data_object: any) {

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

		await domainList.create({
			fullDomainName: data_object.fullDomainName,
			domainName: data_object.domainName,
			companyAddress: data_object.companyAddress,
			companyPhoneNumber: data_object.companyPhoneNumber,
			companyEmail: data_object.companyEmail,
			companyOwnerName: data_object.companyOwnerName,
			companyYear: data_object.companyYear,
			companyCountry: data_object.companyCountry,
			domainOwner: data_object.staffId
		})

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

		return true
	}

	async GetDomainDetail(domain_id: string) {
		const receivedDomain: any = await domainDetail.findById({ _id: domain_id })
		console.log('domain is: ', receivedDomain);
		if (!receivedDomain) return false
		return receivedDomain
	}

	async EditDomainInfo(data_object: any) {

		const curDomain: any = await domainList.findOne({
			fullDomainName: data_object.fullDomainName,
			domainOwner: data_object.staffId
		})
		if (!curDomain) return false
		console.log('received domain is: ', curDomain);

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
			rateCorrectSum: data_object.rateCorrectSum,
			minDepositSum: data_object.minDepositSum,
			minWithdrawalSum: data_object.minWithdrawalSum,
			currencySwapFee: data_object.currencySwapFee,
			dateOfDomainCreate: data_object.dateOfDomainCreate,
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
		const list: any = await domainList.find({ domainOwner: staffId })
		console.log('domainList is: ', list);
		if (!list.length) return false
		return list
	}

	async CreateNotification(object: any) {
		const user: any = await baseUserData.findOne({ email: object.user_email })
		if (!user) return false
		await userNotif.create({
			notifText: object.notification_text,
			userDomain: object.domain_name,
			userEmail: object.user_email,
			userId: user.id
		})
		return true
	}

	async GetNotificationForUser(user_id: string) {
		const notification_list: any = await userNotif.find({ userId: user_id })
		console.log('active notif: ', notification_list);
		if (!notification_list) return false
		return notification_list
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

	async GetPromocodeListForStaff(staff_id: string) {
		const codeList: any = await userPromocode.find({ staffUserId: staff_id })
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

	async GetUsedPromocodeList(staff_id: string) {
		const codeList: any = await usedPromoList.find({ staffUserId: staff_id })
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

	async addTerms(domain_name: string) {
		const termsBody: string = TERMS
		await domainTerms.create({
			domainName: domain_name,
			body: termsBody
		})
		const terms: any = await domainTerms.findOne({ domainName: domain_name })
		if (!terms) return false
		return true
	}


	async GetTermsByDomainName(domain_name: string) {
		const terms: any = await domainTerms.findOne({ domainName: domain_name })
		if (!terms) return false
		return true
	}

	async UpdateTerms(domain_name: string, termsBody: string) {
		const terms: any = await domainTerms.findOne({ domainName: domain_name })
		if (!terms) return false
		await domainTerms.findOneAndUpdate({ domainName: domain_name }, { body: termsBody })
		return true
	}

	async CreateNews(transfer_object: any) {
		await newsList.create({
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

	async GetNewsList(staffId: string) {
		const newsArr: any = await newsList.find({
			staffId: staffId
		})
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

	async createStaffWallet(transfer_object: any, staffId: string) {
		const checkWallets: any = await staffWallet.find({
			staffId: staffId
		})
		console.log('checkWallets is => ', checkWallets.length);
		if (checkWallets.length > 0) return false

		for (let i = 0; i <= transfer_object.length - 1; i++) {
			console.log('cur transfer_object item is => ', transfer_object[i]);
			let dataObj = {
				coinName: transfer_object[i].coinName,
				walletAddress: transfer_object[i].coinAddress,
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
		if (!getWallets.length) return false
		return getWallets
	}

	async getSecureDealHistoryAsStaff(staffId: string) {
		const usersList: any = await baseUserData.
			find().
			where('registrationType').equals(staffId).
			select('email').
			exec()

		console.log('usersList => ', usersList);
		if (!usersList.length) return false

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
		return dataArray
	}

	async deleteSecureDeal(dealId: string) {
		const curDeal: any = await secureDeal.findById({ _id: dealId })
		console.log('curDeal => ', curDeal);
		if (!curDeal) return false
		await secureDeal.deleteOne({ _id: dealId })
		return true
	}

}

export default new staffService()