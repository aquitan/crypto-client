import database from "../services/database_query"
import codeGenerator from '../api/password_generator'
import fs from 'fs'


class staffService {

  async GetUsersList(domainName: string) {

    const usersList: any = await database.GetAllUsersForStaff(domainName)
    if (usersList !== []) {
      console.log("list is: ", usersList)
      return usersList
    }
    console.log('list is empty');
    return 'error'
  }

  async GetUserDetail(user_id: number) {
    const userBaseData: any = await database.GetUserById(user_id)
    console.log('userBaseData info is: ', userBaseData)

    let userKycData: any = await database.GetUserKycByUserId(user_id)
    console.log('userKycData info is: ', userKycData)

    if (userKycData === []) {
      userKycData = 'user haven`t kyc'
    }

    const userLogsData: any = await database.GetLogsByUserId(user_id)
    console.log('userLogsData info is: ', userLogsData)

    // get user balances + get 2fa status + last deposit date 
    // get user owner name + get recruiter  

    const UserData: any = {
      base_data: userBaseData[0],
      user_kyc: userKycData[0] || userKycData,
      user_logs: userLogsData
    }
    console.log('data from service: ', UserData);

    return UserData
  }

  async GetKycForStaff(userDomain: string) {

    const kycList: any = await database.GetKycForStaff(userDomain)

    if (kycList !== []) {
      console.log("list is: ", kycList)
      return kycList
    }
    console.log('list is empty');
    return 'error'
  }

  async CreateUserAsStaff(staff_id: number, email: string, password: string, promocode: string, domain_name: string, datetime: string, name?: string) {

    const owner: any = await database.GetUserById(staff_id)
    console.log('current staff: ', owner[0].email);

    const activationLink: string = await codeGenerator(8)
    await database.CreateUser(email, password, true, false, false, false, true, activationLink, owner[0].email, promocode, domain_name, datetime, name || '',)
    const user: any = await database.GetUserByEmail(email)

    if (user[0]) {
      console.log('new user is: ', user);
      return true
    }

    console.log('something went wrong');
    return false
  }

  async CreatePromocode(date: string, value: number, staff_id: number, domain: string, counter: number) {

    // const getCode = async (recievedCode: string) => {
    //   const currentCode: string = await database.GetPromocodesList(recievedCode)
    //   console.log('recievedCode is: ', recievedCode);
    //   return currentCode
    // }
    console.log('counter is: ', counter);


    // if (counter >= 1 && counter <= 10) {
    //   let codeArray: any = []
    //   for (let i = 0; i <= counter; i++) {
    //     const code: string = await codeGenerator(8)
    //     // await database.SavePromocode(codeArray[i)
    //     await database.SavePromocode(`${i}`, date, value, staff_id, domain)
    //     codeArray.push(code)

    //   }
    //   console.log('promocodes is: ', codeArray);

    //   // await database.SavePromocode(codeArray[i])
    //   return codeArray
    // }

    const newCode: string = await codeGenerator(8)
    console.log('generated code is: ', newCode);
    await database.SavePromocode(newCode, date, value, staff_id, domain)

    return newCode
  }

  async GetPromocodeList(staff_id: number) {

    const codeList: any = await database.GetPromocodeListForStaff(staff_id)
    console.log('service code list is: ', codeList);

  }


}

export default new staffService()