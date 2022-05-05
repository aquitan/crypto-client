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
    type: String || null,
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
    type: String,
    require: true
  },
  userAction: {
    type: String,
    require: true
  },
  userDomain: {
    type: String,
    require: true
  }
}