import { response } from 'express'
import database from "../services/database_query"

class adminService {


  async GetUsersList() {

    const usersList: any = await database.GetAllUsersForAdmin()
    console.log("list is: ", usersList)
    if (!usersList[0]) return false
    return usersList
  }

  async GetUserDetail(user_id: number) {

    const userBaseData: any = database.GetUserById(user_id)
    console.log('userBaseData info is: ', userBaseData)

    const userKycData: any = database.GetUserKycByUserId(user_id)
    console.log('userKycData info is: ', userKycData)

    const userLogsData: any = database.GetLogsByUserId(user_id)
    console.log('userLogsData info is: ', userLogsData)

    if (!userKycData[0]) {
      const UserData: any = {
        base_data: userBaseData[0],
        user_kyc: false,
        user_logs: userLogsData
      }
      console.log('data from service: ', UserData);
      return UserData
    }

    const UserData: any = {
      base_data: userBaseData[0],
      user_kyc: userKycData[0],
      user_logs: userLogsData
    }

    // get user balances + last deposit date 
    // get user owner name + get recruiter  

    console.log('data from service: ', UserData);
    return UserData
  }

  async GetKycForAdmin() {
    const kycList: any = await database.GetKycForAdmin()
    console.log("list is: ", kycList)
    if (!kycList[0]) return false
    return kycList

  }

  async GetPromocodeListForAdmin() {
    const promocodeList: any = await database.GetPromocodeListForAdmin()
    console.log('promo list is: ', promocodeList);
    if (!promocodeList[0]) return false
    return promocodeList
  }


  async GetUsedPromocodeListForAdmin() {
    const promocodeList: any = await database.GetPromocodeListForAdmin()
    console.log('promo list is: ', promocodeList);
    if (!promocodeList[0]) return false
    return promocodeList
  }

}

export default new adminService()