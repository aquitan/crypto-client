import { Schema } from 'mongoose'

export const USER_WALLET_SCHEMA = {
  coinName: {
    type: String,
    require: true
  },
  coinFullName: {
    type: String,
    require: true
  },
  coinBalance: {
    type: Number,
    require: true,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}