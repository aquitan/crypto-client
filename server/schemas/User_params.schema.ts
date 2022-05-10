import { Schema } from 'mongoose'

export const USER_PARAMS = {
  doubleDeposit: {
    type: Boolean,
    require: true
  },
  isUser: {
    type: Boolean,
    require: true
  },
  isStaff: {
    type: Boolean,
    require: true
  },
  isAdmin: {
    type: Boolean,
    require: true
  },
  isBanned: {
    type: Boolean,
    require: true
  },
  swapBan: {
    type: Boolean,
    require: true
  },
  internalBan: {
    type: Boolean,
    require: true
  },
  isActivated: {
    type: Boolean,
    require: true
  },
  premiumStatus: {
    type: Boolean,
    require: true
  },
  twoStepStatus: {
    type: Boolean,
    require: true
  },
  kycStatus: {
    type: String,
    enum: ['empty', 'pending', 'failed', 'complete'],
    require: true,
    default: 'empty'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}