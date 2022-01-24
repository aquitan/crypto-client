import database from "../services/database_query"
import fs from 'fs'

class staffService {

  async GetUsersList() {

    const usersList: any = database.GetAllUsersForStaff()
    console.log("list is: ", usersList)
    return usersList
  }

  async GetUserDetail(user_id: number) {
    const userBaseData: any = database.GetUserById(user_id)
    console.log('userBaseData info is: ', userBaseData)

    const userKycData: any = database.GetUserKycByUserId(user_id)
    console.log('userKycData info is: ', userKycData)

    const userLogsData: any = database.GetLogsByUserId(user_id)
    console.log('userLogsData info is: ', userLogsData)

    // get user balances + get 2fa status + last deposit date 
    // get user owner name + get recruiter  

    const UserData: any = {
      base_data: userBaseData[0],
      user_kyc: userKycData[0],
      user_logs: userLogsData
    }

    return UserData
  }

  async GetKycForStaff(userDomain: string) {

    const kycList: any = await database.GetKycForStaff(userDomain)

    return {
      kycList: kycList
    }
  }


}

export default new staffService()