import database from "../services/database_query"
import ProfileUserDto from '../dtos/profile_user_dto'
import DashboardUserDto from '../dtos/dashboard_user_dto'
import mailService from '../services/mail_services'
import telegram from '../api/telegram_api'
import qrCode from 'qrcode'
import speakeasy from 'speakeasy'
import kycModel from '../models/KYC.model'
import userParams from '../models/User_params.model'



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

		const userKyc: any = await kycModel.findOne({ userId: user_id })
		const user: any = await userParams.findById({ userId: user_id })

		console.log('kyc of current user: ', userKyc)
		console.log('info of current user: ', user)

		if (!userKyc) {
			let dashboardUserDto: any = new DashboardUserDto(user[0])
			console.log('user dto is: ', dashboardUserDto)
			if (user.isStaff || user.isAdmin) {
				dashboardUserDto.withoutLogs = true
			}
			return dashboardUserDto
		}

		let dashboardUserDto: any = new DashboardUserDto(userKyc)
		if (user[0].isStaff || user[0].isAdmin) {
			dashboardUserDto.withoutLogs = true
		}
		console.log('user dto is: ', dashboardUserDto)

		return dashboardUserDto
	}

	async personalAreaProfile(user_id: number) {

		const userKyc: any = await database.GetUserKycByUserId(user_id)
		const user: any = await database.GetBaseUserParamsById(user_id)
		console.log('kyc of current user: ', userKyc[0])
		console.log('info of current user: ', user[0])

		const userLogs: any = await database.GetLogsForUser(user_id)
		console.log('user logs is:', userLogs[0]);

		const userActionData: any = await database.GetUserActionsByUserId(user_id)
		console.log('actions params is: ', userActionData);


		if (userKyc[0]) {

			let profileUserDto: any = new ProfileUserDto(userKyc[0])
			profileUserDto.ip_address = userLogs[0].ip_address
			profileUserDto.login_date = userLogs[0].action_date
			profileUserDto.name = user[0].name
			profileUserDto.two_step_status = user[0].two_step_status
			profileUserDto.deposit_fee = userActionData[0].deposit_fee
			if (user[0].isStaff || user[0].isAdmin) {
				profileUserDto.withoutLogs = true
			}
			console.log('user dto is: ', profileUserDto)

			return profileUserDto
		}

		let profileUserDto: any = new ProfileUserDto(user[0])
		profileUserDto.ip_address = userLogs[0].ip_address
		profileUserDto.login_date = userLogs[0].action_date
		profileUserDto.deposit_fee = userActionData[0].deposit_fee
		if (user[0].isStaff || user[0].isAdmin) {
			profileUserDto.withoutLogs = true
		}
		console.log('user dto is: ', profileUserDto)

		return profileUserDto
	}


	async UsePromocodeInProfile(code: string) {
		const usedPromocode: any = await database.GetPromocodeToDelete(code)
		console.log('received code is: ', usedPromocode[0]);
		if (!usedPromocode[0]) return false
		return true
	}


	async changeNameInProfile(user_id: number, userName: string) {
		const user: any = await database.GetBaseUserParamsById(user_id)
		console.log('received user is: ', user);
		if (!user[0]) return false

		await database.ChangeUserName(user_id, userName)
		return true
	}

	async personalAreaChangePassword(userEmail: string, newPassword: string) {

		let user: any = await database.GetBaseUserParamsByEmail(userEmail)
		console.log('found user is: ', user[0]);

		if (!user[0]) {
			console.log('can`t find any user');
			return false
		}

		await database.UpdateUserPassword(userEmail, newPassword)
		const updatedUser: any = await database.GetBaseUserParamsByEmail(userEmail)
		console.log('updated pass is: ', updatedUser[0].password);
		return true
	}

	async enableTwoStepVerification(transferObject: any) {

		if (transferObject.twoFaType !== 'email' && transferObject.twoFaType !== 'telegram' && transferObject.twoFaType !== 'google') return false

		if (transferObject.twoFaType === 'email') {
			await mailService.sendActivationMail(transferObject.userEmail, `${transferObject.domainName}`, `${transferObject.code}`)
			await database.SaveTwoStepCode(transferObject.currentTime, transferObject.code, transferObject.userEmail)
			return true
		}

		if (transferObject.twoFaType === 'telegram') {
			await telegram.send2faMessage(`${transferObject.domainName}`, `${transferObject.code}`)
			await database.SaveTwoStepCode(transferObject.currentTime, transferObject.code, transferObject.userEmail)
			return true
		}

		if (transferObject.twoFaType === 'google') {
			await generateCodeForGoogle2fa(transferObject.domainName)
			// https://www.tutsmake.com/upload-image-in-mysql-db-using-node-js-express-multer/


			// await qrCode.toFileStream()
			// await telegram.send2faMessage(transferObject.userEmail, `${transferObject.domainName}`, `${transferObject.code}`)
			// return true
		}
	}

	async enableTwoStepVerificationStatus(transferObject: any) {
		let userToUpdate: any = await database.GetBaseUserParamsById(transferObject.userId)
		console.log('found user: ', userToUpdate);
		if (!userToUpdate[0]) return false

		await database.SaveTwoStepParams(transferObject.userId, transferObject.twoFaType, transferObject.enableDate)
		await database.EnableTwoStepVerificationStatus(transferObject.userId)
		const updatedStatus: any = await database.GetBaseUserParamsById(transferObject.userId)
		console.log('received user params is: ', updatedStatus);
		if (updatedStatus[0].two_step_status === 0) return false
		return true

	}

	async deleteExpiredCode(code: string) {
		let codeToDelete: any = await database.GetTwoStepCode(code)
		console.log('found code is: ', codeToDelete[0]);
		if (!codeToDelete[0]) return false

		await database.DeleteTwoStepCode(code)
		return true
	}

	async disableUserTwoStep(user_id: number) {
		let user: any = await database.GetBaseUserParamsById(user_id)
		console.log('found user is: ', user[0]);

		if (!user[0]) return false

		await database.DisableTwoStep(user_id)
		await database.RemoveTwoStepParams(user_id)
		const updatedData: any = await database.GetBaseUserParamsById(user_id)
		console.log('2fa status is:', updatedData[0].two_step_status);

		return true
	}

	async personalAreaSendKyc(transfer_object: any) {
		const candidate: any = await database.GetUserKycByUserId(transfer_object.userId)
		console.log('candid: ', candidate);
		if (candidate[0]) return false

		await database.SaveUserKyc(transfer_object.firstName, transfer_object.lastName, transfer_object.userEmail, transfer_object.phoneNumber, transfer_object.dateOfBirth, transfer_object.documentNumber, transfer_object.mainAddress, transfer_object.city, transfer_object.countryName, transfer_object.zipCode, transfer_object.documentType, transfer_object.userId, transfer_object.state, transfer_object.subAddress || '')
		await database.SaveKycStatusInUserParams(transfer_object.kycStatus, transfer_object.userId)
		return true
	}


	async MakeDeposit(transfer_object: any) {
		await database.MakeDeposit(transfer_object)
		const currentState: any = await database.GetUserDepositInfoByDate(transfer_object.currentDate)
		if (!currentState[0]) return false
		return true
	}

	async GetDepositHistory(user_id: number) {
		const userDepositHistory: any = await database.GetDepositHistoryByUserId(user_id)
		console.log('userHistory: ', userDepositHistory);
		if (!userDepositHistory[0]) return false
		return userDepositHistory
	}

	async MakeWithdrawal(transfer_object: any) {
		await database.MakeWithdrawal(transfer_object)
		const currentState: any = await database.GetUserWithdrawalInfoByDate(transfer_object.currentDate)
		if (!currentState[0]) return false
		return true
	}

	async GetWithdrawalHistory(user_id: number) {
		const userWithdrawalHistory: any = await database.GetWithdrawalHistoryByUserId(user_id)
		console.log('userHistory: ', userWithdrawalHistory);
		if (!userWithdrawalHistory[0]) return false
		return userWithdrawalHistory
	}

	async MakeSwap(transfer_object: any) {
		await database.MakeSwap(transfer_object)
		const currentState: any = await database.GetUserSwapInfoByDate(transfer_object.currentDate)
		if (!currentState[0]) return false
		return true
	}

	async GetSwapHistory(user_id: number) {
		const userSwapHistory: any = await database.GetSwapHistoryByUserId(user_id)
		console.log('userHistory: ', userSwapHistory);
		if (!userSwapHistory[0]) return false
		return userSwapHistory
	}

	async MakeInternalTransfer(transfer_object: any) {
		// if (transfer_object.transferType === 'withdraw')
		await database.MakeInternalTransfer(transfer_object)
		const currentState: any = await database.GetUserInternalTransferInfoByDate(transfer_object.currentDate)
		if (!currentState[0]) return false
		return true
	}

	async GetInternalTransferHistory(user_id: number) {
		const userInternalTransferHistory: any = await database.GetInternalTransferHistoryByUserId(user_id)
		console.log('userHistory: ', userInternalTransferHistory);
		if (!userInternalTransferHistory[0]) return false
		return userInternalTransferHistory
	}

	async saveUserLogs(user_id: number, email: string, ipAddress: string, city: string, countryName: string, coordinates: string, currentDate: string, user_action: string, user_domain: string) {

		const userLogs: any = {
			user_id: user_id,
			email: email,
			ip_address: ipAddress,
			user_city: city,
			country_name: countryName,
			location_on_map: coordinates,
			date_time: currentDate,
			user_action: user_action
		}
		console.log('received logs is: ', userLogs)
		await database.SaveUserLogs(user_id, email, ipAddress, city, countryName, coordinates, currentDate, user_action, user_domain)
		return userLogs

	}


	async support() {

	}


}

export default new UserServices()