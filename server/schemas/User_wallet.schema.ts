import { Schema } from 'mongoose'

export const USER_WALLET_SCHEMA = {
  coinName: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  seedPhrase: {
    type: String || Array || null,
    require: true
  },
  key: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}