import { Schema } from 'mongoose'

export const BALANCE_SCHEMA = {
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
    require: true
  },
  userEmail: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true
  }
}