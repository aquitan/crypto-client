import tokenService from './token_services'
import baseUserData from '../models/User_base_data.model'
import userParams from '../models/User_params.model'
import userActionInfo from '../models/User_info_for_action.model'
import user2faParams from '../models/User_2fa_params.model'
import domainDetail from '../models/Domain_detail.model'
import domainList from '../models/Domain_list.model'
import domainTerms from '../models/Domain_terms.model'
import codeList from '../models/Promocodes.model'
import usedPromo from '../models/Used_promocodes.model'
import twoStepList from '../models/User_2fa_code_list.model'
import userNotif from '../models/User_notifications.model'
import userLogs from '../models/User_logs.model'
import ipMatch from '../models/User_ip_match.model'
import ApiError from '../exeptions/api_error'
import mailService from '../services/mail_services'
import telegram from '../api/telegram_api'
import passwordGenerator from '../api/password_generator'
import { getUserData } from '../dtos/UserData.dto'
// import mongoose from 'mongoose'

class AuthService {

  async GetDomainInfo(domain_name: string) {
    const domain_info: any = await domainList.findOne({ domainName: domain_name })
    const domain_detail: any = await domainDetail.findById({ _id: domain_info._id })
    const domain_terms: any = await domainTerms.findOne({ domainName: domain_name })
    if (!domain_info || !domain_detail || !domain_terms) return false
    const domainInfo = {
      domainId: domain_info._id,
      fullDomainName: domain_info.fullDomainName,
      domainName: domain_info.domainName,
      companyAddress: domain_info.companyAddress,
      companyPhoneNumber: domain_info.companyPhoneNumber,
      companyEmail: domain_info.companyEmail,
      companyOwnerName: domain_info.companyOwnerName,
      companyYear: domain_info.companyYear,
      companyCountry: domain_info.companyCountry,
      domainOwner: domain_info.domainOwner,
      domainParams: {
        showNews: domain_detail.showNews,
        doubleDeposit: domain_detail.doubleDeposit,
        depositFee: domain_detail.depositFee,
        rateCorrectSum: domain_detail.rateCorrectSum,
        minDepositSum: domain_detail.minDepositSum,
        minWithdrawalSum: domain_detail.minWithdrawalSum,
        coinSwapFee: domain_detail.coinSwapFee
      },
      domain_terms: domain_terms.termsBody
    }
    return domainInfo
  }

  async GetPromocodeListBeforeSignup(domainName: string) {

    const codeArray: any = await codeList.find({ domainName: domainName })
    console.log('code array is: ', codeArray);
    if (!codeArray) return false
    return codeArray
  }

  async registration(transfer_object: any) {
    const candidate: any = await baseUserData.findOne({ email: transfer_object.email })

    if (candidate) throw ApiError.BadRequest(`email ${transfer_object.email} already in use.`)
    const activationLink: string = await passwordGenerator(18)

    const domainOwner: any = await domainList.findOne({ domainFullName: transfer_object.domainName })
    console.log('domain owner is: ', domainOwner.domainOwner);
    if (!domainOwner) throw ApiError.ServerError()

    const currentDate = new Date().getTime()
    await baseUserData.create({
      name: transfer_object.name || '',
      email: transfer_object.email,
      password: transfer_object.password,
      activationLink: activationLink,
      registrationType: domainOwner.domainOwner,
      promocode: transfer_object.promocode,
      domainName: transfer_object.domainName,
      dateOfEntry: currentDate
    })

    const curUser: any = await baseUserData.findOne({ email: transfer_object.email })
    await userParams.create({
      doubleDeposit: transfer_object.doubleDeposit,
      isUser: true,
      isStaff: false,
      isAdmin: false,
      isBanned: false,
      swapBan: false,
      internalBan: false,
      isActivated: false,
      premiumStatus: false,
      twoStepStatus: false,
      kycStatus: 'empty',
      userId: curUser.id
    })
    await userActionInfo.create({
      depositFee: transfer_object.depositFee,
      doubleDeposit: transfer_object.doubleDeposit,
      lastDeposit: '',
      activeError: 1,
      userId: curUser.id
    })
    const userParamsInfo: any = await userParams.findOne({ userId: curUser.id })
    console.log(userParamsInfo);
    await mailService.sendActivationMail(transfer_object.email, `${transfer_object.domainName}`, `${activationLink}`)

    // use 'e' in getUserData args for disable finding by email and use ID
    const userDto = await getUserData('e', curUser.id)

    const tokens: any = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async GetVerifiedPromocode(code: string) {
    const usedPromocode: any = await codeList.findOne({ code: code })
    console.log('recieved code is: ', usedPromocode.code);
    if (!usedPromocode) return false
    return true
  }

  async rebasePromocodeToUsed(promocode: string, user_email: string) {
    const curUser: any = await baseUserData.findOne({ email: user_email })
    console.log('found user is: ', curUser);

    const usedPromocode: any = await codeList.findOne({ code: promocode })
    console.log('recieved code is: ', usedPromocode);

    if (!usedPromocode) return false
    await usedPromo.create({
      code: promocode,
      date: usedPromocode.code,
      value: usedPromocode.value,
      coinName: usedPromocode.coinName,
      notificationText: usedPromocode.notificationText,
      domainName: usedPromocode.domainName,
      usedByUser: user_email,
      staffUserId: usedPromocode.staffUserId
    })
    await userNotif.create({
      notifText: usedPromocode.notificationText,
      userDomain: usedPromocode.domainName,
      email: user_email,
      userId: curUser.id
    })
    await codeList.findByIdAndDelete({ _id: usedPromocode.id })
    const getUsedPromocode: any = await usedPromo.findById({ _id: usedPromocode.id })
    if (!getUsedPromocode) {
      console.log('some error in promocode saving');
      return false
    }
    return true
  }

  async activate(activationLink: string) {
    const link: any = await baseUserData.findOne({ activationLink: activationLink })
    if (!link) throw ApiError.BadRequest('incorrect link =/')
    await userParams.findOneAndUpdate({ userId: link.id }, {
      isActivated: true
    })

    const activatedStatus: any = await baseUserData.findOne({ activationLink: link.activationLink })
    if (!activatedStatus.isActivated) throw ApiError.ServerError()
    return true
  }

  async checkTwoStep(email: string) {
    const curUser: any = await baseUserData.findOne({ email: email })
    const userParamsInfo: any = await userParams.findOne({ userId: curUser.id })
    if (!userParamsInfo.twoStepStatus) return false

    const twoStepParams: any = await user2faParams.findOne({ userId: curUser.id })

    if (twoStepParams.twoStepType === 'email') {
      const code_2fa: string = await passwordGenerator(8)
      await twoStepList.create({
        code: code_2fa,
        userEmail: email
      })
      // use 'e' in getUserData args for disable finding by email and use ID
      const userDto = await getUserData('e', curUser.id)
      await mailService.SendTwoStepVerificationMessage(userDto.email, curUser.domainName, code_2fa)
      setTimeout(async () => {
        await twoStepList.deleteOne({ code: code_2fa })
      }, 300_000)
      return true
    }
    if (twoStepParams.twoStepType === 'telegram') {
      const code_2fa: string = await passwordGenerator(8)
      await twoStepList.create({
        code: code_2fa,
        userEmail: email
      })
      await telegram.SendTwoStepCode(curUser.domainName, code_2fa)
      setTimeout(async () => {
        await twoStepList.deleteOne({ code: code_2fa })
      }, 300_000)
      return true
    }

    if (twoStepParams.twoStepTypee === 'google') {

    }

  }

  async GetVerifiedTwoStepCode(code: string) {
    const getVerified: any = await twoStepList.findOne({ code: code })
    if (!getVerified) return false
    return true
  }

  async login(email: string, password: string, user_domain: string) {
    const user: any = await baseUserData.findOne({ email: email })
    console.log('found user: ', user);

    if (user === undefined || user.password !== password) return false

    if (user.email !== email || user.domainName !== user_domain) {
      console.log('wrong user data');
      return false
    }

    const userDto: any = await getUserData(email)
    const tokens: any = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken: string) {
    const token: string | any = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.UnauthorizedError()

    const userData: any = tokenService.validateRefreshToken(refreshToken)
    console.log('dataUser: ', userData)

    const tokenFromDatabase = await tokenService.findToken(refreshToken)
    console.log('token from db: ', tokenFromDatabase)

    if (!userData || !tokenFromDatabase) throw ApiError.UnauthorizedError()

    // use 'e' in getUserData args for disable finding by email and use ID
    const userDto: any = await getUserData('e', userData.id)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async forgotPassword(email: string, domain_name: string) {
    const candidate: any = await baseUserData.findOne({ email: email })
    console.log('found user is: ', candidate);

    if (!candidate) return false
    if (candidate.domainName !== domain_name) return false

    const new_password: string = await passwordGenerator(12)
    console.log('new password is: ', new_password);
    await baseUserData.findOneAndUpdate({ email: email }, {
      password: new_password
    })
    await mailService.sendNewPassword(email, `${candidate.domainName}`, `${new_password}`)
    return true
  }


  async SaveAuthLogs(email: string, ipAddress: string, city: string, countryName: string, coordinates: string, browser: string, currentDate: number, user_action: string, user_domain: string) {

    const logs: any = await userLogs.create({
      userEmail: email,
      ipAddress: ipAddress,
      requestCity: city,
      countryName: countryName,
      location: coordinates,
      browser: browser,
      actionDate: currentDate,
      userAction: user_action,
      userDomain: user_domain,
    })
    console.log('recieved logs is: ', logs)
    return logs

  }

  async GetUserIpLogs(ipAddress: string) {
    const isMatch: any = await ipMatch.findOne({
      ipAddress: ipAddress
    })
    if (!isMatch) return false
    return true
  }

  async SaveIpMatchLogs(email: string, ipAddress: string, currentDate: number, browser: string) {

    await ipMatch.create({
      userEmail: email,
      ipAddress: ipAddress,
      loginDate: currentDate,
      browser: browser
    })
  }
}

export default new AuthService()