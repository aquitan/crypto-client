import database from "../services/database_query"
import ProfileUserDto from '../dtos/profile_user_dto'
import DashboardUserDto from '../dtos/dashboard_user_dto'


class UserServices {

  async dashboard(user_id: number) {

    const userKyc: any = await database.GetUserKycByUserId(user_id)
    const user: any = await database.GetUserById(user_id)
    console.log('kyc of current user: ' + '\n' + userKyc[0])
    console.log('info of current user: ' + '\n' + user[0])

    if (userKyc[0]) {
      const dashboardUserDto: any = new DashboardUserDto(userKyc[0])
      console.log('user dto is: ', dashboardUserDto)
      return dashboardUserDto

    } else {
      const dashboardUserDto: any = new DashboardUserDto(user[0])
      console.log('user dto is: ', dashboardUserDto)
      return dashboardUserDto
    }


  }

  async personalAreaProfile(user_id: number) {
    try {
      // get accoutn personal info
      // const user: any = await database.GetUserById(user_id)
      // console.log('found user is: ', user[0]);


      const userKyc: any = await database.GetUserKycByUserId(user_id)
      const user: any = await database.GetUserById(user_id)
      console.log('kyc of current user: ' + '\n' + userKyc[0])
      console.log('info of current user: ' + '\n' + user[0])

      if (userKyc[0]) {
        const profileUserDto: any = new ProfileUserDto(userKyc[0])
        console.log('user dto is: ', profileUserDto)
        return profileUserDto

      } else {
        const profileUserDto: any = new ProfileUserDto(user[0])
        console.log('user dto is: ', profileUserDto)
        return profileUserDto
      }

    } catch (e) {
      console.log(e);

    }
  }

  async personalAreaChangePassword(user_id: number, newPassword: string) {
    try {
      // get accoutn personal info
      let user: any = await database.GetUserById(user_id)

      const oldPassword: string = user[0].password
      console.log(oldPassword, ' old user password');

      await database.ChangeUserPassword(user[0].ID, newPassword)

      const updatedUser: any = await database.GetUserById(user_id)
      console.log('updated pass is: ', updatedUser[0].password);


      return true

    } catch (e) {
      console.log(e);

    }
  }

  async personalAreaSendKyc(user_id: number, first_name: string, last_name: string, email: string, phone_number: number, date_of_birth: string, document_number: string, main_address: string, city: string, zip_code: number, document_type: string, status: string, state: string, sub_address: string) {
    try {
      const candidate: any = await database.GetUserKycByUserId(user_id)
      console.log('candid: ', candidate);

      if (candidate[0]) {
        return candidate[0]
      }

      await database.SaveUserKyc(first_name, last_name, email, phone_number, date_of_birth, document_number, main_address, city, zip_code, document_type, status, user_id, state, sub_address)

      return true
      // post kyc form
    } catch (e) {
      console.log(e);

    }
  }

  async personalAreaSaveKyc() {
    try {

      // post kyc form
    } catch (e) {
      console.log(e);

    }
  }

  async saveUserLogs(user_id: number, email: string, ipAddress: string, city: string, countryName: string, coordinates: string, currentDate: string, user_action: string, user_domain: string) {
    try {
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

      // chat with support
    } catch (e) {
      console.log(e)
    }
  }


  async support() {
    try {

      // chat with support
    } catch (e) {
      console.log(e)
    }
  }


}

export default new UserServices()