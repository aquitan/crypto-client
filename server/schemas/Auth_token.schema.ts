import { Schema } from 'mongoose'

export const AUTH_TOKEN = {
  refreshToken: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}