import { Schema } from 'mongoose'


export const USER_2FA_PARAMS = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  },
  twoStepType: {
    type: String,
    enum: ['google', 'telegram', 'email'],
    require: true
  },
  enableDate: {
    type: Number,
    require: true
  }
}