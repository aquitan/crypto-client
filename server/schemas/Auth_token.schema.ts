import { Schema } from 'mongoose'

export const AUTH_TOKEN = {
  refreshToken: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}