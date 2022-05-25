import { Schema } from 'mongoose'

export const RECRUITER_SCHEMA = {
  recruiterEmail: {
    type: String,
    require: true
  },
  recruiterId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  permissionDate: {
    type: Number,
    require: true
  },
  accessFrom: {
    type: String,
    require: true
  },
  currentFee: {
    type: Number,
    min: 0,
    max: 50,
    required: true
  }
}