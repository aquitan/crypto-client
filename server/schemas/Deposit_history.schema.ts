import { Schema } from 'mongoose'

export const DEPOSIT_HISTORY_SCHEMA = {
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
    type: String,
    minlength: 40,
    maxlength: 46,
    require: true
  },
  status: {
    type: String,
    enum: ['pending', 'complete', 'failed'],
    require: true,
    default: 'pending'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  },
  staffId: {
    type: String,
    require: true
  }
}