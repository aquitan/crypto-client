import jwt from 'jsonwebtoken'
import tokenModel from '../models/Token_model'
import dotenv from 'dotenv'
dotenv.config()
import database from '../services/database_query'

// token secret here 
const secret: any = process.env.JWT_ACCESS_SECRET

class TokenService {

  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: '30m'
    })
    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: '4h'
    })
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, secret)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, secret)
      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(userID: number, refreshToken: string) {

    const tokenData: any = await database.GetAuthTokenForCurrentUser(userID)
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await database.UpdateAuthTokenForCurrentUser(tokenData.user_id, tokenData.refreshToken)
    }
    const token = await database.CreateAndSaveToken(userID, refreshToken)
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await database.FindAuthTokenAndDelete(refreshToken)
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await database.FindAuthToken(refreshToken)
    return tokenData
  }

}

export default new TokenService()