import { Schema } from 'mongoose'

export const STAFF_LOGS_SCHEMA = {
  staffEmail: {
    type: String,
    require: true
  },
  staffAction: {
    type: String,
    require: true
  },
  staffDomain: {
    type: String,
    require: true
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}