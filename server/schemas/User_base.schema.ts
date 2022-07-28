
import { Schema } from 'mongoose'

export const USER_BASE = {
  _id: {
    type: Schema.Types.ObjectId,
    unique: true
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unic: true
  },
  password: {
    type: String,
    required: true
  },
  activationLink: {
    type: String,
    required: true
  },
  registrationType: {
    type: String || Schema.Types.ObjectId,
    required: true
  },
  promocode: {
    type: String,
    required: true
  },
  domainName: {
    type: String,
    required: true
  },
  dateOfEntry: {
    type: Number,
    required: true
  }
}