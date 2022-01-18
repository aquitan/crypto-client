import database from "../services/database_query"
import DashboardUserDto from '../dtos/dashboard_user_dto'


class UserServices {

  async dashboard(user_Id: number) {

    // const user = await database.GetUserById(user_Id)
    // console.log('found user is: ' + '\n' + user);

    const userKyc: any = await database.GetUserKycById(user_Id)
    console.log('kyc of current user: ' + '\n' + userKyc)

    const dashboardUserDto: any = new DashboardUserDto(userKyc)
    console.log('user dto is: ', dashboardUserDto)

    return dashboardUserDto

  }

  async personalAreaProfile(user_Id: number) {
    try {
      // get accoutn personal info
      const user = await database.GetUserById(user_Id)
      console.log('found user is: ', user);


    } catch (e) {
      console.log(e);

    }
  }

  async personalAreaSecurity() {
    try {
      // get accoutn personal info

    } catch (e) {
      console.log(e);

    }
  }

  async verification() {
    try {

      // post kyc form
    } catch (e) {
      console.log(e);

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