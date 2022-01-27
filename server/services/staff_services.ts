import database from "../services/database_query"
import codeGenerator from '../api/password_generator'
import telegram from '../api/telegram_api'
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

    // get user balances + last deposit date 
    // get user owner name + get recruiter  
    console.log('data from service: ', UserData);
    return UserData
  }

  async getUserForIpMatch(ip_address: string) {
    const usersList: any = await database.GetUsersByIp(ip_address)
    console.log('users list: ', usersList);

    if (!usersList[0]) {
      console.log('list is empty');
      return false
    }

    return usersList

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

  async changeKycStatusAsStaff(status: string, kyc_id: number) {

    const old_status: any = await database.getKycForUpdate(kyc_id)
    console.log('old kyc status: ', old_status.kyc_status);

    if (old_status[0].kyc_status !== status) {
      await database.ChangeKycStatus(status, kyc_id)
      console.log('it`s working');
      return true
    }

    console.log('some error');
    return false
  }

  async CreateUserAsStaff(staff_id: number, email: string, password: string, promocode: string, domain_name: string, datetime: string, name?: string) {

    const owner: any = await database.GetUserById(staff_id)
    console.log('current staff: ', owner[0].email);

    const activationLink: string = await codeGenerator(8)
    await database.CreateUser(email, password, true, false, false, false, true, activationLink, owner[0].email, promocode, false, false, domain_name, datetime, name || '',)
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

    const currentPromocodes: any = await database.GetPromocodeListForStaff(staff_id)
    // console.log('codes array: ', currentPromocodes);

    if (counter > 1 && counter <= 10) {
      let codeArray: any = []
      for (let i = 0; i < counter - 1; i++) {
        if (value.length > 1) {
          for (let j = 0; j < value.length; j++) {
            let code: string = await codeGenerator(8)
            // console.log('cur code: ', code);

            for (let c = 0; c <= currentPromocodes.length - 1; c++) {
              if (code === currentPromocodes[c].code) {
                code = await codeGenerator(8)
                // console.log('changed code: ', code);
              }
            }
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

  async GetPromocodeListForStaff(staff_id: number) {

    const codeList: any = await database.GetPromocodeListForStaff(staff_id)
    console.log('service code list is: ', codeList);

  }

  async saveStaffLogs(staff_email: string, staff_action: string, staff_domain: string, staff_id: number) {
    await database.SaveStaffLogs(staff_email, staff_action, staff_domain, staff_id)
    console.log('staff logs was saved');
  }

}

export default new staffService()