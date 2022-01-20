import jwt from 'jsonwebtoken'
import database from './database_query'

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

  async saveToken(user_id: any, refreshToken: any) {
    const tokenData: any = await database.FindAuthTokenByUserId(user_id)
    let token: any
    if (tokenData) {
      // return tokenData
      token = await database.CreateAndSaveToken(user_id, refreshToken)
    }
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData: any = await database.FindAuthTokenAndDelete(refreshToken)
    console.log(tokenData);
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData: any = await database.FindAuthTokenByRefreshToken(refreshToken)
    return tokenData
  }

}

export default new TokenService()