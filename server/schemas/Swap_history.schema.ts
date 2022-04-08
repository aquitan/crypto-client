import { Schema } from 'mongoose'

export const SWAP_HISTORY_SCHEMA = {
  userEmail: {
    type: String,
    require: true
  },
  userDomain: {
    type: String,
    require: true
  },
  coinNameFrom: {
    type: String,
    require: true
  },
  coinNameTo: {
    type: String,
    require: true
  },
  cryptoAmountFrom: {
    type: Number,
    require: true
  },
  cryptoAmountTo: {
    type: Number,
    require: true
  },
  usdAmountFrom: {
    type: Number,
    require: true
  },
  usdAmountTo: {
    type: Number,
    require: true
  },
  date: {
    type: Number,
    require: true
  },
  address: {
    type: String,
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
  }
}