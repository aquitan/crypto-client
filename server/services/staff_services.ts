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
    const userBaseData: any = await database.GetUserInfoById(user_id)
    console.log('userBaseData info is: ', userBaseData)

    const userActionData: any = await database.GetUserActionsByUserId(user_id)
    console.log('actions params is: ', userActionData);

    const userActiveError: any = await database.GetErrorsByDomainName(userActionData[0].active_error)
    console.log('active error is: ', userActiveError);

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
      action_data: userActionData[0],
      active_error: userActiveError[0],
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

  async changeKycStatusAsStaff(status: string, user_id: number) {

    const old_status: any = await database.GetKycForUpdate(user_id)
    console.log('old kyc status: ', old_status);

    if (old_status[0] !== status) {
      await database.ChangeKycStatus(status, user_id)
      return true
    }

    console.log('some error');
    return false
  }

  async DeleteKyc(kyc_id: number, user_id: number) {
    const user_kyc: any = await database.GetKycBeforeDelete(kyc_id)
    console.log('current kyc is: ', user_kyc[0]);

    if (!user_kyc[0]) return false

    await database.DeleteKyc(kyc_id)
    await database.ChangeKycStatus('empty', user_id)
    return true
  }


  async UpdateDepositFee(user_id: number, deposit_fee: number) {
    const user: any = await database.GetUserActionsByUserId(user_id)
    console.log('found user is: ', user[0]);

    if (!user[0]) return false

    await database.UpdateUserActionsDepositFee(user_id, deposit_fee)
    const updatedData: any = await database.GetUserActionsByUserId(user_id)
    console.log('new deposit fee is:', updatedData[0].deposit_fee);
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

  async CreateUserAsStaff(transfer_object: any) {

    const activationLink: string = await codeGenerator(8)
    const domainOwner: any = await database.GetBaseDomainInfo(transfer_object.domainName)
    console.log('domain owner is: ', domainOwner[0].domain_owner)
    const curUser: any = await database.GetUserByEmail(transfer_object.userEmail)

    await database.CreateUser(transfer_object.userEmail, transfer_object.password, activationLink, domainOwner[0].domain_owner, 'empty', true, transfer_object.domainName, transfer_object.datetime, transfer_object.name || '')
    const user: any = await database.GetBaseUserParamsByEmail(transfer_object.userEmail)
    if (!user[0]) return false
    await database.SaveBaseUserParams(transfer_object.doubleDeposit, false, false, true, false, false, false, true, false, false, true, 'empty', user[0].ID)
    await database.SaveUserInfoForAction(transfer_object.depositFee, '', 1, curUser[0].ID)

    return true
  }

  async CreateNewDomain(data_object: any) {

    console.log('received object: ', data_object);


    const domains: any = await database.GetDomainListForStaff(data_object.staffEmail)
    console.log('received domains list is: ', domains);

    console.log(`staff ${data_object.staffEmail} domains list: `)
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

    await database.CreateNewDomain(baseDomainData)
    const curDomain: any = await database.GetBaseDomainInfo(baseDomainData.fullDomainName)
    console.log('base info from db: ', curDomain[0]);


    const domainDetailInfo: any = {
      showNews: data_object.showNews,
      double_deposit: data_object.doubleDeposit,
      depositFee: data_object.depositFee,
      rateCorrectSum: data_object.rateCorrectSum,
      minDepositSum: data_object.minDepositSum,
      minWithdrawalSum: data_object.minWithdrawalSum,
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
      await database.SaveDomainErrors(baseDomainData.fullDomainName, domainDetailInfo.domainId, domainErrors[i].errorName, domainErrors[i].title, domainErrors[i].text, domainErrors[i].button,)
      console.log('error item is: ', '\n', domainErrors[i], '\n', ' was waved');
    }

    const db_error_list: any = await database.GetDomainErrorsList(domainDetailInfo.domainId)
    console.log('db errors: ', db_error_list);

    if (db_error_list.length < 5) {
      console.log('some writing error in <save domain errors>');
      return 'error'
    }

    return true
  }

  async GetDomainDetail(domain_id: number) {
    const received_domain: any = await database.GetDomainDetailByDomainId(domain_id)
    console.log('domain is: ', received_domain);
    if (!received_domain[0]) return false
    return received_domain[0]
  }

  async EditDomainInfo(data_object: any) {

    console.log('received object: ', data_object);
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

    if (data_object.staffEmail !== 'root') {
      const domains: any = await database.GetDomainListForStaff(data_object.staffEmail)
      console.log('received domains list is: ', domains);

      console.log(`staff ${data_object.staffEmail} domains list: `, domains);
      for (let i = 0; i <= domains.length - 1; i++) {
        console.log(domains[i].fullDomainName);

        if (domains[i].fullDomainName === data_object.fullDomainName) {
          console.log('domain already in use');
          return false
        }
      }
    }
    await database.UpdateDomainInfo(baseDomainData)
    const curDomain: any = await database.GetBaseDomainInfo(baseDomainData.fullDomainName)
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
    await database.UpdateDomainDetailInfo(domainDetailInfo)

    return true
  }

  async CreateCustomError(data_object: any) {

    await database.SaveDomainErrors(data_object.domain_name, data_object.domain_id, data_object.errorName, data_object.errorTitle, data_object.errorText, data_object.errorButton)

    const savedErrors: any = await database.GetDomainErrorsList(data_object.domain_id)
    console.log('saved domain error: ', savedErrors);
    if (!savedErrors[0]) return false

    return savedErrors

  }

  async GetDomainErrors(domain_id: number) {
    const domain_errors: any = await database.GetDomainErrorsList(domain_id)
    console.log('domain is: ', domain_errors);
    if (!domain_errors[0]) return false
    return domain_errors
  }


  async GetErrorsByDomainName(domain_name: string) {
    const domain_errors: any = await database.GetErrorsByDomainName(domain_name)
    console.log('domain errors list is: ', domain_errors);
    if (!domain_errors[0]) return false
    return domain_errors
  }

  async GetDomainListForStaff(staffEmail: string) {
    const domainList: any = await database.GetDomainListForStaff(staffEmail)
    console.log('domainList is: ', domainList);
    if (!domainList[0]) return false
    return domainList

  }

  async CreateNotification(object: any) {
    if (!object) return false
    await database.SaveUserNotification(object.notification_text, object.user_email)
    return true
  }

  async GetNotificationForUser(user_id: number) {
    const notification_list: any = await database.GetUserNotification(user_id)
    console.log('active notif: ', notification_list);
    if (!notification_list[0]) return false
    return notification_list
  }

  async CreatePromocode(date: string, value: any, currency: string, notif: string, staff_id: number, domain: string, counter: number) {
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
            await database.SavePromocode(codeArray[x].code, date, codeArray[x].value, currency, notif, staff_id, domain)
          }
          return codeArray
        }
      }
    }

    const newCode: string = await codeGenerator(8)
    console.log('generated code is: ', newCode);
    await database.SavePromocode(newCode, date, value, currency, notif, staff_id, domain)
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

  async RemovePromocode(code: string) {
    await database.DeletePromocodeFromUserPromocode(code)
    const getCode: any = await database.GetPromocodeToDelete(code)
    console.log('received code is: ', getCode);
    if (getCode[0]) return false
    return true

  }

  async GetUsedPromocodeList(staff_id: number) {
    const codeList: any = await database.GetUsedPromocodeListForStaff(staff_id)
    console.log('service code list is: ', codeList);
    if (!codeList[0]) return false
    return codeList
  }
  
  
  async DeleteUsedPromocodesAsStaff(staff_id: number) {
    await database.DeleteUsedPromocodeListAsStaff(staff_id)
    const codeList: any = await database.GetUsedPromocodeListForStaff(staff_id)
    if (codeList[0]) return false
    return true
  }
  
  async saveStaffLogs(staff_email: string, staff_action: string, staff_domain: string, staff_id: number) {
    await database.SaveStaffLogs(staff_email, staff_action, staff_domain, staff_id)
    console.log('staff logs was saved');
  }

  async GetBaseTerms() {
    const baseTermsBody: any = await database.GetBaseTerms()
    console.log('base terms text is: ', baseTermsBody[0].terms_body);
    if (!baseTermsBody[0]) return false
    return baseTermsBody[0].terms_body
  }

  async addTerms(domain_name: string, termsBody: string) {
    await database.CreateDomainTerms(domain_name, termsBody)
    return true
  }


  async GetTermsByDomainName(domain_name: string) {
    const domain_terms: any = await database.GetTermsByDomainName(domain_name)
    if (!domain_terms[0]) return false
    return true
  }

  async UpdateTerms(domain_name: string, termsBody: string) {
    const domain_terms: any = await database.GetDomainTerms(domain_name)
    if (!domain_terms[0]) return false
    await database.UpdateDomainTerms(domain_name, termsBody)
    return true
  }

  async CreateNews(transfer_object: any) {
    await database.CreateNews(transfer_object)
    const getNews: any = await database.GetNews(transfer_object.newsTitle, transfer_object.newsDomain)
    console.log('found news: ', getNews);
    if (!getNews[0]) return false
    return getNews[0]
  }

  async EditNews(transfer_object: any) {
    const getNews: any = await database.GetNews(transfer_object.newsTitle, transfer_object.newsDomain)
    console.log('found news: ', getNews);
    if (!getNews[0]) return false

    await database.EditNews(transfer_object)
    const updatedNews: any = await database.GetNews(transfer_object.newsTitle, transfer_object.newsDomain)
    console.log('found news: ', updatedNews);
    if (!updatedNews[0]) return false

    return true
  }

  async GetNewsList(staffId: number) {
    const newsList: any = await database.GetNewsByStaffId(staffId)
    console.log('found news: ', newsList);
    if (!newsList[0]) return false
    return newsList[0]
  }

}

export default new staffService()