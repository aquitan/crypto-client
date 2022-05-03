import { Schema } from 'mongoose'

export const STAFF_PARAMS_SCHEMA = {
  newsTitle: {
    type: String,
    require: true
  },
  newsDate: {
    type: Number,
    require: true
  },
  newsBody: {
    type: String,
    require: true
  },
  newsImage: {
    type: String,
    require: true
  },
  newsDomain: {
    type: String,
    require: true
  },
  staffEmail: {
    type: String,
    require: true
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}