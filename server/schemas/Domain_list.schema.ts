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
    require: true
  },
  companyCountry: {
    type: String,
    require: true
  },
  domainOwner: {
    type: String,
    require: true
  }
}