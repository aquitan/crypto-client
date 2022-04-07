import { Schema } from 'mongoose'


export const USER_2FA_PARAMS = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  },
  twoStepType: {
    type: String,
    require: true
  },
  enableDate: {
    type: Number,
    require: true
  }
}