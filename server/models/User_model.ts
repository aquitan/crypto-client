import { Schema, model } from 'mongoose'
import * as Mongoose from 'mongoose'
import USER_SCHEMA_SETTINGS from '../config/Schemas/user_schema'

export interface USER extends Mongoose.Document {
  // id: number
  email: string
  password: string
  name?: string
  isUser: boolean
  isStaff: boolean
  isAdmin: boolean
  isBanned: boolean
  isActivated: boolean
  activationLink: string
}

const User = new Schema<USER>(USER_SCHEMA_SETTINGS)

export default model('Users', User)

//  add 2fa types
//  google, telegram, phone ?
//