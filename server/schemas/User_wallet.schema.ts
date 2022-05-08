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
  userWallet: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true
  }
}