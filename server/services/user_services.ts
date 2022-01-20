import database from "../services/database_query"
import ProfileUserDto from '../dtos/profile_user_dto'
import DashboardUserDto from '../dtos/dashboard_user_dto'


class UserServices {

  async dashboard(user_Id: number) {
    const userKyc: any = await database.GetUserKycById(user_Id)
    console.log('kyc of current user: ' + '\n' + userKyc)

    const dashboardUserDto: any = new DashboardUserDto(userKyc)
    console.log('user dto is: ', dashboardUserDto)

    return { user: dashboardUserDto }

  }

  async personalAreaProfile(user_Id: number) {
    try {
      // get accoutn personal info
      const user = await database.GetUserById(user_Id)
      console.log('found user is: ', user);


      const profileUserDto: any = new ProfileUserDto(user)
      console.log('user dto is: ', profileUserDto)

      return { user: profileUserDto }

    } catch (e) {
      console.log(e);

    }
  }

  async personalAreaSecurityChangePassword(user_id: number, newPassword: string) {
    try {
      // get accoutn personal info
      let user: any = await database.GetUserKycById(user_id)

      const oldPassword: string = user.password
      console.log(oldPassword, ' old user password');

      database.ChangeUserPassword(user.id, newPassword)

      const updatedUser: any = await database.GetUserKycById(user_id)

      return {
        user_password: updatedUser.password,
        status: 'complete'
      }

    } catch (e) {
      console.log(e);

    }
  }

  async personalAreaSendKyc() {
    try {

      // post kyc form
    } catch (e) {
      console.log(e);

    }
  }

  async personalAreaGetKyc() {
    try {

      // post kyc form
    } catch (e) {
      console.log(e);

    }
  }

  async saveUserLogs() {
    try {



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