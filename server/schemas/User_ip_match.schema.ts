import { Schema } from 'mongoose'

export const USER_IP_MATCH = {
  userEmail: {
    type: String,
    require: true
  },
  ipAddress: {
    type: String,
    require: true
  },
  loginDate: {
    type: String,
    require: true
  },
  browser: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}