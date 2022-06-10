import { Schema } from 'mongoose'


export const USER_2FA_PARAMS = {
  twoStepType: {
    type: String,
    enum: ['google', 'telegram', 'email'],
    require: true
  },
  enableDate: {
    type: Number,
    require: true
  },
  teleramId: {
    type: Number || null,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  },
}