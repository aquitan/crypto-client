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
    minlength: 9,
    maxlength: 15,
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
  doumentType: {
    type: String,
    require: true
  },
  mainAddress: {
    type: String,
    require: true
  },
  subAddress: {
    type: String || null,
    require: false,
    default: null
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
    type: String || null,
    require: false,
    default: null
  },
  zipCode: {
    type: Number,
    require: true
  },
  documents: {
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
    }
  },
  userDomain: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}