import tokenService from './token_services'
import AuthUserDto from '../dtos/auth_user_dto'
import database from '../services/database_query'
import ApiError from '../exeptions/api_error'
import mailService from '../services/mail_services'
import telegram from '../api/telegram_api'
import passwordGenerator from '../api/password_generator'

class AuthService {

  async GetDomainInfo(domain_name: string) {
    const domain_info: any = await database.GetDomainInfoForUser(domain_name)
    const domain_terms: any = await database.GetDomainTerms(domain_name)
    if (!domain_info[0]) return false
    if (!domain_terms[0]) return false

    const dataObject = {
      domain_info: domain_info[0],
      domain_terms: domain_terms[0]
    }
    return dataObject
  }

  async GetPromocodeListBeforeSignup(domainName: string) {
    const codeArray: any = await database.GetPromocodeListBeforeSignup(domainName)
    console.log('code array is: ', codeArray);
    if (!codeArray[0]) return false
    return codeArray
  }

  async registration(transfer_object: any) {

    const candidate: any = await database.GetUserByEmail(transfer_object.email)

    if (candidate[0]) throw ApiError.BadRequest(`email ${transfer_object.email} already in use.`)
    const activationLink: string = await passwordGenerator(18)
    const domainOwner: any = await database.GetBaseDomainInfo(transfer_object.domainName)
    console.log('domain owner is: ', domainOwner[0].domain_owner);
    if (!domainOwner[0]) await database.CreateUser(transfer_object.email, transfer_object.password, activationLink, 'self registred', transfer_object.promocode, true, transfer_object.domain_name, transfer_object.datetime, transfer_object.name || '')

    await database.CreateUser(transfer_object.email, transfer_object.password, transfer_object.activationLink, domainOwner[0].domain_owner, transfer_object.promocode, true, transfer_object.domain_name, transfer_object.datetime, transfer_object.name || '')

    const curUser: any = await database.GetUserByEmail(transfer_object.email)
    await database.SaveBaseUserParams(transfer_object.doubleDeposit, false, false, true, false, false, false, false, false, false, true, 'empty', curUser[0].ID)
    await database.SaveUserInfoForAction(transfer_object.depositFee, '', 1, curUser[0].ID)
    const user: any = await database.GetBaseUserParamsByEmail(transfer_object.email)
    console.log(user);
    await mailService.sendActivationMail(transfer_object.email, `${transfer_object.domainName}`, `${activationLink}`)

    const userDto: any = new AuthUserDto(user[0])
    const tokens: any = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.ID, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }


  }

  async GetVerifiedPromocode(code: string) {
    const usedPromocode: any = await database.GetPromocodeToDelete(code)
    console.log('recieved code is: ', usedPromocode[0]);
    if (!usedPromocode[0]) return false
    return true
  }

  async rebasePromocodeToUsed(promocode: string, user_email: string) {
    const usedPromocode: any = await database.GetPromocodeToDelete(promocode)
    console.log('recieved code is: ', usedPromocode[0]);

    if (!usedPromocode[0]) return false
    await database.SaveUsedPromocode(usedPromocode[0].code, usedPromocode[0].date, usedPromocode[0].value, usedPromocode[0].currency, usedPromocode[0].notification_text, usedPromocode[0].staff_user_id, usedPromocode[0].domain_name, user_email)
    await database.SaveUserNotification(usedPromocode[0].notification_text, user_email)
    await database.DeletePromocodeFromUserPromocode(promocode)
    const getUsedPromocode: any = await database.GetUsedPromocode(usedPromocode[0].code)

    if (getUsedPromocode[0]) {
      return true
    }
    console.log('some error');
    return false
  }

  async activate(user_id: number, activationLink: string) {

    const db_result: any = await database.FindActivationLink(activationLink)
    // console.log('get link from db: ', db_result[0]);
    if (!db_result[0]) throw ApiError.BadRequest('incorrect link =/')

    const user: any = await database.GetUserById(user_id)
    // console.log('user log: ', user);
    await database.UpdateActivatedStatus(user_id)
    const activated_status: any = await database.GetBaseUserParamsById(user_id)
    // console.log('activation status', activated_status[0].isActivated);
    if (!activated_status) return false

    return true
  }

  async checkTwoStep(time: string, email: string) {
    const getFullUser: any = await database.GetBaseUserParamsByEmail(email)
    console.log('full info: ', getFullUser);
    if (getFullUser[0].two_step_status === 0) return false

    const two_step_params: any = await database.GetTwoStepParams(getFullUser[0].ID)
    if (two_step_params[0].two_step_type === 'email') {
      const code_2fa: string = await passwordGenerator(8)
      await database.SaveTwoStepCode(time, code_2fa, email)
      const userDto: any = new AuthUserDto(getFullUser[0])
      await mailService.SendTwoStepVerificationMessage(userDto.email, getFullUser[0].domain_name, code_2fa)
      setTimeout(async () => {
        await database.DeleteTwoStepCode(code_2fa)
      }, 300_000)
      return true
    }
    if (two_step_params[0].two_step_type === 'telegram') {
      const code_2fa: string = await passwordGenerator(8)
      await database.SaveTwoStepCode(time, code_2fa, email)
      // const userDto: any = new AuthUserDto(getFullUser[0])
      await telegram.SendTwoStepCode(getFullUser[0].domain_name, code_2fa)
      setTimeout(async () => {
        await database.DeleteTwoStepCode(code_2fa)
      }, 300_000)
      return true
    }

    if (two_step_params[0].two_step_type === 'google') {

    }

  }

  async GetVerifiedTwoStepCode(code: string) {
    const get_verified: any = await database.GetTwoStepCode(code)
    if (!get_verified[0]) return false
    return true
  }

  async login(email: string, password: string, user_domain: string, twoStepCode: string) {

    const user: any = await database.GetUserByEmail(email)
    console.log('found user: ', user[0]);

    if (user[0] === undefined || user[0].password !== password) return false

    if (user[0].email !== email || user[0].domain_name !== user_domain) {
      console.log('wrong user data');
      return false
    }


    const getFullUser: any = await database.GetBaseUserParamsByEmail(email)
    console.log('full info: ', getFullUser);
    if (twoStepCode !== '') {
      await database.DeleteTwoStepCode(twoStepCode)
    }
    const userDto: any = new AuthUserDto(getFullUser[0])
    const tokens: any = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.ID, tokens.refreshToken)

    return {
      ...tokens,
      user: getFullUser[0]
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

    const getFullUser: any = await database.GetBaseUserParamsById(userData.ID)
    console.log(getFullUser, 'found user');

    const userDto: any = new AuthUserDto(getFullUser[0])
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.ID, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async forgotPassword(email: string, domain_name: string) {
    const candidate: any = await database.GetBaseUserParamsByEmail(email)
    console.log('found user is: ', candidate);

    if (!candidate[0]) return false
    if (candidate[0].domain_name !== domain_name) return false

    const new_password: string = await passwordGenerator(12)
    console.log('new password is: ', new_password);

    await database.UpdateUserPassword(email, new_password)
    await mailService.sendNewPassword(email, `${candidate[0].domain_name}`, `${new_password}`)
    return true
  }


  async SaveAuthLogs(user_id: number, email: string, ipAddress: string, city: string, countryName: string, coordinates: string, currentDate: string, user_action: string, user_domain: string) {

    const userLogs: any = {
      user_id: user_id,
      email: email,
      ip_address: ipAddress,
      user_city: city,
      country_name: countryName,
      location_on_map: coordinates,
      date_time: currentDate,
      user_action: user_action
    }
    console.log('recieved logs is: ', userLogs)
    await database.SaveUserLogs(user_id, email, ipAddress, city, countryName, coordinates, currentDate, user_action, user_domain)
    return userLogs

  }

  async GetUserIpLogs(ipAddress: string) {
    const is_match: any = await database.GetUserLogs(ipAddress)
    if (!is_match[0]) return false
    return true
  }

  async SaveIpMatchLogs(email: string, ipAddress: string, currentDate: string, browser: string) {
    await database.SaveIpMatch(email, ipAddress, currentDate, browser)
    return true
  }
}

export default new AuthService()