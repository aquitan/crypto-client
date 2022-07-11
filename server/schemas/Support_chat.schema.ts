
import { Schema } from 'mongoose'

export const SUPPORT_CHAT_SCHEMA = {
  userId: {
    type: Schema.Types.ObjectId || String,
    ref: 'user_base_datas',
    require: true
  },
  domainName: {
    type: String,
    require: true
  },
  staffId: {
    type: Schema.Types.ObjectId || String,
    ref: 'user_base_datas',
    require: true
  },
  messageBody: {
    type: String,
    minlength: 5,
    maxlength: 350,
    require: true
  },
  currentDate: {
    type: Number,
    require: true
  },
  imageLink: {
    type: String || null,
    require: false
  },
  chatId: {
    type: String || null,
    require: false
  }
}