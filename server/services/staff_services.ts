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

    const userKycData: any = await database.GetUserKycByUserId(user_id)
    console.log('userKycData info is: ', userKycData)

    const userLogsData: any = await database.GetLogsByUserId(user_id)
    console.log('userLogsData info is: ', userLogsData)

    if (userKycData === []) {
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

    // get user balances + get 2fa status + last deposit date 
    // get user owner name + get recruiter  

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

  async CreatePromocode(date: string, value: any, staff_id: number, domain: string, counter: number) {
    console.log('counter is: ', counter);

    if (counter > 1 && counter <= 10) {
      let codeArray: any = []
      for (let i = 0; i < counter - 1; i++) {
        if (value.length > 1) {
          for (let j = 0; j < value.length; j++) {
            const code: string = await codeGenerator(8)
            console.log('value was saved to db: ', value[j]);
            codeArray.push({
              code: code,
              value: value[j]
            })
          }
          for (let x = 0; x <= codeArray.length - 1; x++) {
            console.log('array sort: ', codeArray[x].code, codeArray[x].value);
            await database.SavePromocode(codeArray[x].code, date, codeArray[x].value, staff_id, domain)
          }
          return codeArray
        }
      }
    }

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