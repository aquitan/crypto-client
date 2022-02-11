import database from "../services/database_query"
import ProfileUserDto from '../dtos/profile_user_dto'
import DashboardUserDto from '../dtos/dashboard_user_dto'
import mailService from '../services/mail_services'
import telegram from '../api/telegram_api'

class UserServices {

  async dashboard(user_id: number) {

    const userKyc: any = await database.GetUserKycByUserId(user_id)
    const user: any = await database.GetBaseUserParamsById(user_id)
    console.log('kyc of current user: ', userKyc[0])
    console.log('info of current user: ', user[0])

    if (!userKyc[0]) {
      const dashboardUserDto: any = new DashboardUserDto(user[0])
      console.log('user dto is: ', dashboardUserDto)

      return dashboardUserDto
    }

    const dashboardUserDto: any = new DashboardUserDto(userKyc[0])
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

    if (userKyc[0]) {
      let profileUserDto: any = new ProfileUserDto(userKyc[0])
      profileUserDto.ip_address = userLogs[0].ip_address
      profileUserDto.login_date = userLogs[0].action_date
      profileUserDto.name = user[0].name
      profileUserDto.two_step_status = user[0].two_step_status
      console.log('user dto is: ', profileUserDto)

      return profileUserDto
    }

    let profileUserDto: any = new ProfileUserDto(user[0])
    profileUserDto.ip_address = userLogs[0].ip_address
    profileUserDto.login_date = userLogs[0].action_date
    console.log('user dto is: ', profileUserDto)

    return profileUserDto
  }

  async changeNameInProfile(user_id: number, userName: string) {
    const user: any = await database.GetBaseUserParamsById(user_id)
    console.log('recieved user is: ', user);

    if (!user[0]) {
      console.log('can`t find any user');
      return false
    }
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

    if (transferObject.twoFaType === 'email') {
      await mailService.sendActivationMail(transferObject.userEmail, `${transferObject.domainName}`, `${transferObject.code}`)
      return true
    }

    if (transferObject.twoFaType === 'telegram') {
      await telegram.send2faMessage(transferObject.userEmail, `${transferObject.domainName}`, `${transferObject.code}`)
      return true
    }

    if (transferObject.twoFaType === 'google') {
      // google auth logic here
      return true
    }
    return false
  }

  async enableTwoStepVerificationStatus(transferObject: any) {
    let userToUpdate: any = await database.GetBaseUserParamsById(transferObject.userId)
    console.log('found user: ', userToUpdate);
    if (!userToUpdate[0]) return false

    await database.SaveTwoStepParams(transferObject.userId, transferObject.twoFaType, transferObject.enableDate)
    await database.EnableTwoStepVerificationStatus(transferObject.userId)
    const updatedStatus: any = await database.GetBaseUserParamsById(transferObject.userId)
    console.log('recieved user params is: ', updatedStatus);
    if (updatedStatus[0].two_step_status === 0) return false
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

  async personalAreaSendKyc(user_id: number, first_name: string, last_name: string, email: string, phone_number: number, date_of_birth: string, document_number: string, main_address: string, city: string, country_name: string, zip_code: number, document_type: string, status: string, state: string, sub_address: string) {

    const candidate: any = await database.GetUserKycByUserId(user_id)
    console.log('candid: ', candidate);

    if (candidate[0]) return candidate[0]

    await database.SaveUserKyc(first_name, last_name, email, phone_number, date_of_birth, document_number, main_address, city, country_name, zip_code, document_type, status, user_id, state, sub_address)
    return true
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
    console.log('recieved logs is: ', userLogs)
    await database.SaveUserLogs(user_id, email, ipAddress, city, countryName, coordinates, currentDate, user_action, user_domain)
    return userLogs

  }


  async support() {

  }


}

export default new UserServices()