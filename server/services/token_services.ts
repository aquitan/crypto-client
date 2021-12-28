import jwt from 'jsonwebtoken'
import TokenModel from '../models/Token_model'
import dotenv from 'dotenv'
dotenv.config()

// token secret here 
const secret: string | any = process.env.JWT_ACCESS_SECRET

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

    const tokenData: any = await TokenModel.findOne({ user_id: userID })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenModel.create({
      user_id: userID,
      refreshToken
    })
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData: any = await TokenModel.findOneAndDelete({
      refreshToken: refreshToken
    })
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData: any = await TokenModel.findOne({
      refreshToken: refreshToken
    })
    return tokenData
  }

}

export default new TokenService()