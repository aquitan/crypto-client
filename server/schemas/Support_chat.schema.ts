
import { Schema } from 'mongoose'

export const SUPPORT_CHAT_SCHEMA = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  },
  domainName: {
    type: String,
    require: true
  },
  messageText: {
    type: String,
    minlength: 10,
    maxlength: 350,
    require: true
  },
  currentDate: {
    type: Number,
    require: true
  },
  uploadImage: {
    type: Boolean
  },

}