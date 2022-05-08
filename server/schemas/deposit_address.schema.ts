import { Schema } from 'mongoose'

export const DEPOSIT_WALLETS_SCHEMA = {
  coinName: {
    type: String,
    require: true
  },
  coinFullName: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  status: {
    type: String,
    default: 'pending',
    require: true
  },
  expiredDate: {
    type: Number,
    required: true
  },
  userEmail: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User_Base_Data',
    require: true
  }
}