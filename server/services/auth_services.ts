import * as express from 'express'
import bcrypt from 'bcrypt'
import tokenService from './token_services'
import UserDto from '../dtos/user_dto'
// import DATABASE from '../config/mysql_config'
import database from '../services/database_query'
import ApiError from '../exeptions/api_error'

class AuthService {

  async registration(email: string, password: string) {
    const candidate: any = await database.GetUserByEmail(email)
    if (candidate) {
      return ApiError.BadRequest(`email ${email} already in use.`)
    }
    const hashPassword = await bcrypt.hash(password, 6)
    // const activationLink = uuid.v4()
    const user = await database.CreateUser(email, hashPassword, true, false, false,)

    const userDto: any = new UserDto(user)
    const tokens: any = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async login(email: string, password: string) {
    const user: any = await database.GetUserByEmail(email)
    if (!user) {
      throw ApiError.BadRequest('can`t find any user')
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password)
    if (!isPasswordEquals) {
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
    const token = await tokenService.removeToken(refreshToken)
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
    const user = await database.GetUserById(userData.id)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

}

export default new AuthService()