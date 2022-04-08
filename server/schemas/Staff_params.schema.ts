import { Schema } from 'mongoose'

export const STAFF_PARAMS_SCHEMA = {
  staffEmail: {
    type: String,
    require: true
  },
  paymentFee: {
    type: Number,
    require: true
  },
  supportName: {
    type: String,
    require: true
  },
  staffAccessDate: {
    type: Number,
    require: true
  },
  whoGiveAccess: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}