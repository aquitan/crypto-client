// import bcrypt from 'bcrypt'
import tokenService from './token_services'
import AuthUserDto from '../dtos/auth_user_dto'
import database from '../services/database_query'
import ApiError from '../exeptions/api_error'
import mailService from '../services/mail_services'
import * as uuid from 'uuid'

class AuthService {

  async registration(email: string, password: string, domain_name: string, datetime: any, name: string) {

    const candidate: any = await database.GetUserByEmail(email)

    if (!candidate) {
      throw ApiError.BadRequest(`email ${email} already in use.`)
    }
    // save real password to db + hashed
    // const hashPassword = await bcrypt.hash(password, 6)
    const activationLink: string = uuid.v4()

    await database.CreateUser(email, password, true, false, false, false, false, activationLink, domain_name, datetime, name || '',)
    const user: any = await database.GetUserByEmail(email)

    await mailService.sendActivationMail(email, `${domain_name}`, `${activationLink}`)

    const userActivationLink: any = await database.FindActivationLink(activationLink)
    console.log('get link from db: ', userActivationLink);

    const userDto: any = new AuthUserDto(user[0])
    const tokens: any = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.ID, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
      activationLink: userActivationLink
    }


  }

  async activate(user_id: number, activationLink: string) {

    const userActivationLink: any = await database.FindActivationLink(activationLink)
    console.log('get link from db: ', userActivationLink);

    const curLink: string = activationLink.toString()
    // console.log('cur: ', curLink);

    if (!userActivationLink) {
      return ApiError.BadRequest('incorrect link =/')
    }

    const user: any = await database.GetUserById(user_id)
    console.log('user log: ', user);

    await database.ActivateUserByLink(curLink)
    const isActivated: any = await database.GetUserById(user_id)
    console.log('act status' + isActivated[0].isActivated);

    return isActivated
  }

  async login(email: string, password: string, user_domain: string) {

    const user: any = await database.GetUserByEmail(email)
    console.log('found user: ', user[0].email);

    if (!user[0].email || user[0].domainName !== user_domain) {
      throw ApiError.BadRequest('can`t find any user')
    }
    // const isPasswordEquals: boolean = await bcrypt.compare(password, user.password)
    if (user[0].password !== password) {
      throw ApiError.BadRequest('wrong password')
    }

    const userDto: any = new AuthUserDto(user[0])
    const tokens: any = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.ID, tokens.refreshToken)

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
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData: any = tokenService.validateRefreshToken(refreshToken)
    console.log('dataUser: ', userData)

    const tokenFromDatabase = await tokenService.findToken(refreshToken)
    console.log('token from db: ', tokenFromDatabase)

    if (!userData || !tokenFromDatabase) {
      throw ApiError.UnauthorizedError()
    }

    const user: any = await database.GetUserById(userData.ID)
    console.log(user, 'found user');

    const userDto: any = new AuthUserDto(user[0])
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.ID, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

}

export default new AuthService()