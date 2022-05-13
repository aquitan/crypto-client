import { Schema } from 'mongoose'

export const USER_INFO_FOR_ACTION = {
  depositFee: {
    type: Number,
    min: 1,
    max: 5,
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
    ref: 'domain_withdrawal_errors',
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}