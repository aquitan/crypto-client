import { Schema } from 'mongoose'

export const USER_INFO_FOR_ACTION = {
  depositFee: {
    type: Number,
    require: true
  },
  doubleDeposit: {
    type: Boolean,
    require: true
  },
  lastDeposit: {
    type: Number,
    require: true
  },
  activeError: {
    type: Schema.Types.ObjectId,
    ref: 'DomainErrors',
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}