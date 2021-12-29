// import * as express from 'express'
import bcrypt from 'bcrypt'
import tokenService from './token_services'
import UserDto from '../dtos/user_dto'
// import DATABASE from '../config/mysql_config'
import ApiError from '../exeptions/api_error'
import UserModel from '../models/User_model'
import TokenModel from '../models/Token_model'
import mailService from '../services/mail_services'
import * as uuid from 'uuid'

class AuthService {

  async registration(email: string, password: string, name: string) {
    const candidate: any = await UserModel.findOne({
      email: email
    })
    if (candidate) {
      return ApiError.BadRequest(`email ${email} already in use.`)
    }
    const hashPassword = await bcrypt.hash(password, 6)
    const activationLink: string = uuid.v4()

    const user = await UserModel.create({
      email: email,
      password: hashPassword,
      name: name || '',
      isUser: true,
      isAdmin: false,
      isStaff: false,
      isActivated: false,
      activationLink: activationLink
    })
    const API_URL: string | any = process.env.API_URL
    await mailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`)

    const userDto: any = new UserDto(user)
    const tokens: any = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)


    return {
      ...tokens,
      user: userDto
    }
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({
      activationLink
    })
    if (!user) {
      throw ApiError.BadRequest('incorrect link =/')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email: string, password: string) {
    const user: any = await UserModel.findOne({
      email: email
    })
    if (!user) {
      throw ApiError.BadRequest('can`t find any user')
    }

    const isPasswordEquals: boolean = await bcrypt.compare(password, user.password)
    if (isPasswordEquals === false) {
      throw ApiError.BadRequest('wrong password')
    }

    const userDto: any = new UserDto(user)
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
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData: any = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDatabase = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDatabase) {
      throw ApiError.UnauthorizedError()
    }
    const user = await UserModel.findById({
      _id: userData.id
    })

    const userDto: any = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

}

export default new AuthService()