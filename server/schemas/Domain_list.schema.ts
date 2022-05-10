import { Schema } from 'mongoose'

export const DOMAIN_SCHEMA = {
  fullDomainName: {
    type: String,
    require: true
  },
  domainName: {
    type: String,
    require: true
  },
  companyAddress: {
    type: String,
    require: true
  },
  companyPhoneNumber: {
    type: String,
    require: true
  },
  companyEmail: {
    type: String,
    require: true
  },
  companyOwnerName: {
    type: String,
    require: true
  },
  companyYear: {
    type: Number,
    min: 2001,
    max: 2021,
    require: true
  },
  companyCountry: {
    type: String,
    require: true
  },
  domainOwner: {
    type: Schema.Types.ObjectId,
    ref: 'user_base_datas',
    require: true
  }
}