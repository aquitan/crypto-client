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
  usdAmount: {
    type: Number,
    require: true
  },
  date: {
    type: Number,
    require: true
  },
  status: {
    type: String,
    enum: ['pending', 'complete', 'failed'],
    require: true,
    default: 'complete'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}