import { Schema } from 'mongoose'

export const USER_NOTIF = {

  notifText: {
    type: String,
    require: true
  },
  userDomain: {
    type: String,
    require: true
  },
  userEmail: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}