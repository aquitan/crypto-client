import { Schema, model } from 'mongoose'
import { AUTH_TOKEN } from '../schemas/Auth_token.schema'

interface authToken {
  refreshToken: string
  userId: Schema.Types.ObjectId
}
const AuthToken = new Schema<authToken>(AUTH_TOKEN)

export default model('Auth_Token', AuthToken)
