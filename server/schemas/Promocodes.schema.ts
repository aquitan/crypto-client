import { Schema } from 'mongoose'

export const USER_PROMO = {
  code: {
    type: String,
    require: true
  },
  date: {
    type: Number,
    require: true
  },
  value: {
    type: Number,
    require: true
  },
  coinName: {
    type: String,
    require: true
  },
  notificationText: {
    type: String,
    require: true
  },
  domainName: {
    type: String,
    require: true
  },
  staffUserId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}