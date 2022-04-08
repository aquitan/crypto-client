import jwt from 'jsonwebtoken'
import authToken from '../models/Token.model'

// token secret here 
const accessSecret: string | any = process.env.JWT_ACCESS_SECRET
const refreshSecret: string | any = process.env.JWT_REFRESH_SECRET

class TokenService {

  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: '30m'
    })
    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: '4h'
    })
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, accessSecret)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, refreshSecret)
      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(user_id: string, refreshToken: string) {
    const tokenData: any = await authToken.findOne({ userId: user_id })
    let token: any
    if (tokenData) {
      token = await authToken.create({
        refreshToken: refreshToken,
        userId: user_id
      })
    }
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData: any = await authToken.findOneAndDelete({
      refreshToken: refreshToken
    })
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData: any = await authToken.findOne({
      refreshToken: refreshToken
    })
    console.log(tokenData);
    return tokenData
  }

}

export default new TokenService()