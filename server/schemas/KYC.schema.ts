import { Schema } from 'mongoose'

export const USER_KYC = {
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  dateOfBitrh: {
    type: String,
    require: true
  },
  documentNumber: {
    type: String,
    require: true
  },
  mainAddress: {
    type: String,
    require: true
  },
  subAddress: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  countryName: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  zipCode: {
    type: Number,
    require: true
  },
  doumentType: {
    type: String,
    require: true
  },
  frontDocumentPhoto: {
    type: String,
    require: true
  },
  backDocumentPhoto: {
    type: String,
    require: true
  },
  selfieDocumentPhoto: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserBaseData',
    require: true
  }
}