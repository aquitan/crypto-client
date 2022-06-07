import { Schema } from 'mongoose'

export const TRADING_ORDER_SCHEMA = {
  userEmail: {
    type: String,
    require: true
  },
  domainName: {
    type: String,
    require: true
  },
  orderDate: {
    type: Number,
    require: true
  },
  coinName: {
    type: String,
    require: true
  },
  coinValue: {
    type: Number,
    require: true
  },
  coinRate: {
    type: Number,
    require: true
  },
  orderStatus: {
    type: String,
    require: true
  },
  orterType: {
    type: Boolean,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true
  }
}