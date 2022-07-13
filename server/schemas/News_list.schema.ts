import { Schema } from 'mongoose'

export const NEWS_LIST_SCHEMA = {
  newsTitle: {
    type: String,
    require: true
  },
  newsDate: {
    type: Number,
    require: true
  },
  newsBody: {
    type: String,
    require: true
  },
  newsImage: {
    type: String,
    require: true
  },
  newsDomain: {
    type: String,
    require: true
  },
  staffEmail: {
    type: String || null,
    require: true
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}