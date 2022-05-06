import { Schema } from 'mongoose'

export const WITHDRAWAL_HISTORY_SCHEMA = {
  userEmail: {
    type: String,
    require: true
  },
  userDomain: {
    type: String,
    require: true
  },
  coinName: {
    type: String,
    require: true
  },
  cryptoAmount: {
    type: Number,
    require: true
  },
  usdAmount: {
    type: Number,
    require: true
  },
  date: {
    type: Number,
    require: true
  },
  address: {
    type: String || null,
    require: true
  },
  status: {
    type: String,
    require: true,
    default: 'pending'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  },
  staffId: {
    type: String,
    require: true
  }
}