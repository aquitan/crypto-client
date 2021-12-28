import { Schema } from 'mongoose'


const TOKEN_SCHEMA_SETTINGS = {
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  refreshToken: {
    type: String,
    require: true
  }
}

export default TOKEN_SCHEMA_SETTINGS;