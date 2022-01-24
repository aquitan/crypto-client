import { response } from 'express'
import database from "../services/database_query"

class adminService {


  async GetUsersList() {
    const usersList: any = database.GetAllUsersForAdmin()
    console.log('userBaseData info is: ', usersList)

    return usersList
  }

  async GetUserDetail(user_id: number) {

    const userBaseData: any = database.GetUserById(user_id)
    console.log('userBaseData info is: ', userBaseData)

    const userKycData: any = database.GetUserKycByUserId(user_id)
    console.log('userKycData info is: ', userKycData)

    const userLogsData: any = database.GetLogsByUserId(user_id)
    console.log('userLogsData info is: ', userLogsData)


    const UserData: any = {
      base_data: userBaseData,
      user_kyc: userKycData,
      user_logs: userLogsData
    }

    return UserData
  }

}

export default new adminService()