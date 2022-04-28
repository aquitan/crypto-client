import { Schema } from 'mongoose'

export const INTERNAL_HISTORY_SCHEMA = {
  userEmail: {
    type: String,
    require: true
  },
  secondUserEmail: {
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
  addressFrom: {
    type: String,
    require: true
  },
  addressTo: {
    type: String,
    require: true
  },
  transferType: {
    type: Boolean,
    require: true
  },
  status: {
    type: String,
    require: true,
    default: 'pending'
  },
  staffId: {
    type: String,
    require: true
  }
}