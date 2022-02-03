import database from "../services/database_query"
import codeGenerator from '../api/password_generator'
import fs from 'fs'


class staffService {

  async GetUsersList(domainName: string) {

    const usersList: any = await database.GetAllUsersForStaff(domainName)
    console.log('user list: ', usersList);
    if (!usersList[0]) return false
    return usersList
  }

  async GetUserDetail(user_id: number) {
    const userBaseData: any = await database.GetBaseUserParamsById(user_id)
    console.log('userBaseData info is: ', userBaseData)

    const userKycData: any = await database.GetUserKycByUserId(user_id)
    console.log('userKycData info is: ', userKycData)

    const userLogsData: any = await database.GetLogsByUserId(user_id)
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

  async getUserForIpMatch(ip_address: string) {
    const usersList: any = await database.GetUsersByIp(ip_address)
    console.log('list is: ', usersList);
    if (!usersList[0]) return usersList
    return false
  }

  async GetKycForStaff(userDomain: string) {

    const kycList: any = await database.GetKycForStaff(userDomain)
    console.log('list is: ', kycList);
    if (!kycList[0]) return false
    return kycList
  }

  async changeKycStatusAsStaff(status: string, kyc_id: number) {

    const old_status: any = await database.GetKycForUpdate(kyc_id)
    console.log('old kyc status: ', old_status);

    if (old_status[0] !== status) {
      await database.ChangeKycStatus(status, kyc_id)
      return true
    }

    console.log('some error');
    return false
  }

  async DeleteKyc(kyc_id: number) {
    const user_kyc: any = await database.GetKycBeforeDelete(kyc_id)
    console.log('current kyc is: ', user_kyc[0]);

    if (!user_kyc[0]) return false

    await database.DeleteKyc(kyc_id)
    return true
  }


  async UpdatePremiumStatus(user_id: number, status: boolean) {
    const user: any = await database.GetBaseUserParamsById(user_id)
    console.log('found user is: ', user[0]);

    if (!user[0]) return false

    await database.UpdatePremiumStatus(user_id, status)
    const updatedData: any = await database.GetBaseUserParamsById(user_id)
    console.log('status is:', updatedData[0].premium_status);
    return true
  }

  async UpdateSwapBan(user_id: number, status: boolean) {
    const user: any = await database.GetBaseUserParamsById(user_id)
    console.log('found user is: ', user[0]);

    if (!user[0]) return false

    await database.UpdateSwapBanStatus(user_id, status)
    const updatedData: any = await database.GetBaseUserParamsById(user_id)
    console.log('status is:', updatedData[0].swap_ban);
    return true
  }

  async UpdateInternalBan(user_id: number, status: boolean) {
    const user: any = await database.GetBaseUserParamsById(user_id)
    console.log('found user is: ', user[0]);

    if (!user[0]) return false

    await database.UpdateInternalBanStatus(user_id, status)
    const updatedData: any = await database.GetBaseUserParamsById(user_id)
    console.log('status is:', updatedData[0].internal_ban);
    return true
  }

  async UpdateFullBan(user_id: number, status: boolean) {
    const user: any = await database.GetBaseUserParamsById(user_id)
    console.log('found user is: ', user[0]);

    if (!user[0]) return false

    await database.UpdateFullBanStatus(user_id, status)
    const updatedData: any = await database.GetBaseUserParamsById(user_id)
    console.log('status is:', updatedData[0].isBanned);
    return true
  }

  async UpdateStaffSupportName(staff_email: string, updatedName: string) {

    const user_to_update: any = await database.GetStaffParamsById(staff_email)
    console.log('user to update: ', user_to_update);

    if (!user_to_update[0]) return false
    await database.UpdateStaffSupportName(staff_email, updatedName)
    return true
  }

  async UpdateDoubleDepositStatus(userId: number, status: boolean) {
    const user_to_update: any = await database.GetBaseUserParamsById(userId)
    console.log('user to update: ', user_to_update);

    if (!user_to_update[0]) return false
    await database.UpdateDoubleDepositStatus(userId, status)
    return true
  }

  async ClearMatchIpUsers(user_email: string, ipAddress: string) {
    const user_to_update: any = await database.GetIpMatch(user_email)
    console.log('user to update: ', user_to_update);

    if (!user_to_update[0]) return false
    await database.DeleteIpMatchLogs(ipAddress)
    return true
  }

  async CreateUserAsStaff(staff_id: number, email: string, password: string, promocode: string, domain_name: string, datetime: string, name?: string) {

    const owner: any = await database.GetBaseUserParamsById(staff_id)
    console.log('current staff: ', owner[0].email);

    const activationLink: string = await codeGenerator(8)
    await database.CreateUser(email, password, activationLink, owner[0].email, promocode, true, domain_name, datetime, name || '',)
    const user: any = await database.GetBaseUserParamsByEmail(email)
    await database.SaveBaseUserParams(false, false, false, true, false, false, false, false, false, false, true, user[0].ID)

    if (user[0]) return true

    console.log('something went wrong');
    return false
  }

  async CreateNewDomain(data_object: any) {

    console.log('recieved object: ', data_object);


    const domains: any = await database.GetDomainList(data_object.staffEmail)
    console.log('recieved domains list is: ', domains);

    console.log(`staff ${data_object.staffEmail} domains list: `);
    for (let i = 0; i <= domains.length - 1; i++) {
      console.log(domains[i].fullDomainName);

      if (domains[i].fullDomainName === data_object.fullDomainName) {
        console.log('domain already in use');
        return false
      }
    }

    const baseDomainData: any = {
      fullDomainName: data_object.fullDomainName,
      domainName: data_object.domainName,
      companyAddress: data_object.companyAddress,
      companyPhoneNumber: data_object.companyPhoneNumber,
      companyEmail: data_object.companyEmail,
      companyOwnerName: data_object.companyOwnerName,
      companyYear: data_object.companyYear,
      companyCountry: data_object.companyCountry,
      domainOwnerEmail: data_object.staffEmail
    }

    const saveBaseDomainData: any = await database.CreateNewDomain(baseDomainData)
    const curDomain: any = await database.GetBaseDomainInfo(saveBaseDomainData[0].ID)
    console.log('base info from db: ', curDomain[0]);


    const domainDetailInfo: any = {
      showNews: data_object.showNews,
      double_deposit: data_object.doubleDeposit,
      depositFee: data_object.depositFee,
      rateCorrectSum: data_object.rateCorrectSum,
      minDepositSum: data_object.minDepositSum,
      minWithdrawalSum: data_object.minWithdrawalSum,
      internalSwapFee: data_object.internalSwapFee,
      currencySwapFee: data_object.currencySwapFee,
      dateOfDomainCreate: data_object.dateOfDomainCreate,
      domainId: curDomain[0].ID
    }
    await database.SaveDomainDetailInfo(domainDetailInfo)

    const domainErrors: any = [
      data_object.errorList.verif_document,
      data_object.errorList.verif_address,
      data_object.errorList.insurance,
      data_object.errorList.premium,
      data_object.errorList.multi_account
    ]

    for (let i = 0; i < domainErrors.length; i++) {
      await database.SaveDomainErrors(domainErrors[i].domainName, domainErrors[i].errorName, domainErrors[i].title, domainErrors[i].text, domainErrors[i].button,)
      console.log('error item is: ', '\n', domainErrors[i], '\n', ' was waved');
    }

    const db_error_list: any = await database.GetDomainErrorsList(data_object.fullDomainName)
    console.log('db errors: ', db_error_list);

    if (db_error_list.length < 5) {
      console.log('some writing error in <save domain errors>');
      return 'error'
    }

    return true
  }

  async CreateCustomError(data_object: any) {

    await database.SaveDomainErrors(data_object.domainName, data_object.errorName, data_object.errorTitle, data_object.errorText, data_object.errorButton)

    const savedErrors: any = database.GetDomainErrorsList(data_object.fullDomainName)
    console.log('saved domain error: ', savedErrors);
    if (!savedErrors[0]) return false

    return savedErrors

  }

  async GetDomainListForStaff(staffEmail: string) {
    // select * from domains where domain_owner = staffEmail
    // from both of params & detail
    const domainList: any = await database.GetDomainListForStaff(staffEmail)
    console.log('domainList is: ', domainList);
    if (!domainList[0]) return false
    return domainList

  }


  async GetNotificationForUser(user_id: number) {
    const notification_list: any = await database.GetUserNotification(user_id)
    console.log('active notif: ', notification_list);
    if (notification_list[0]) return false

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

    if (!codeList[0]) return false
    return codeList

  }

  async GetPromocodeListForStaff(staff_id: number) {

    const codeList: any = await database.GetPromocodeListForStaff(staff_id)
    console.log('service code list is: ', codeList);
    if (!codeList[0]) return false
    return codeList

  }

  async GetUsedPromocodeList(staff_id: number) {
    const codeList: any = await database.GetUsedPromocodeListForStaff(staff_id)
    console.log('service code list is: ', codeList);
    if (!codeList[0]) return false
    return codeList
  }

  async saveStaffLogs(staff_email: string, staff_action: string, staff_domain: string, staff_id: number) {
    await database.SaveStaffLogs(staff_email, staff_action, staff_domain, staff_id)
    console.log('staff logs was saved');
  }

}

export default new staffService()