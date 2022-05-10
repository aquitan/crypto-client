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
    minlength: 40,
    maxlength: 50,
    require: true
  },
  status: {
    type: String,
    enum: ['pending', 'complete', 'failed'],
    require: true,
    default: 'pending'
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
    ref: 'user_base_datas',
    require: true
  }
}