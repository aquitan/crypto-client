
import { Schema } from 'mongoose'

export const SECURE_DEAL_CHAT_SCHEMA = {
  userId: {
    type: Schema.Types.ObjectId || String,
    ref: 'user_base_datas',
    require: true
  },
  domainName: {
    type: String,
    require: true
  },
  supportName: {
    type: String || null,
    require: false
  },
  staffId: {
    type: Schema.Types.ObjectId || String,
    ref: 'user_base_datas',
    require: true
  },
  curDate: {
    type: Number,
    require: true
  },
  isUser: {
    type: Boolean,
    require: true
  },
  messageBody: {
    type: String,
    minlength: 5,
    maxlength: 350,
    require: true
  },
  imageLink: {
    type: String || null,
    require: false
  },
  chatId: {
    type: String || null,
    require: false
  },
  userEmail: {
    type: String,
    require: true
  },
  secondPartyEmail: {
    type: String,
    require: true
  }
}