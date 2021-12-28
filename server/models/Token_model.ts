import { Schema, model } from 'mongoose'
import * as Mongoose from 'mongoose'
import TOKEN_SCHEMA_SETTINGS from '../config/Schemas/token_schema'

export interface TOKEN extends Mongoose.Document {
  // id: number
  user_id: number
  refreshToken: string
}

const Token = new Schema<TOKEN>(TOKEN_SCHEMA_SETTINGS)

export default model('Tokens', Token)

