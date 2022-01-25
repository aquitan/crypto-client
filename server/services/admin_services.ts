import { response } from 'express'
import database from "../services/database_query"

class adminService {


  async GetUsersList() {
    const usersList: any = database.GetAllUsersForAdmin()
    if (usersList !== []) {
      console.log("list is: ", usersList)
      return usersList
    }
    console.log('list is empty');
    return 'error'
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

  async GetKycForAdmin() {
    const kycList: any = await database.GetKycForAdmin()

    if (kycList !== []) {
      console.log("list is: ", kycList)
      return kycList
    }
    console.log('list is empty');
    return 'error'
  }

  async GetPromocodeListForAdmin() {
    const promocodeList: any = await database.GetPromocodeListForAdmin()
  }

}

export default new adminService()