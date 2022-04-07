import { Schema } from 'mongoose'

export const USER_LOGS = {
  userEmail: {
    type: String,
    require: true
  },
  ipAddress: {
    type: String,
    require: true
  },
  requestCity: {
    type: String,
    require: true
  },
  countryName: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  browser: {
    type: String,
    require: true
  },
  actionDate: {
    type: Number,
    require: true
  },
  userAction: {
    type: String,
    require: true
  },
  userDomain: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}