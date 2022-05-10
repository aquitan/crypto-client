import { Schema } from 'mongoose'

export const DOMAIN_ERRORS_SCHEMA = {
  domainName: {
    type: String,
    require: true
  },
  errorName: {
    type: String,
    require: true
  },
  errorTitle: {
    type: String,
    require: true
  },
  errorText: {
    type: String,
    require: true
  },
  errorButton: {
    type: String,
    require: true
  },
  domainId: {
    type: Schema.Types.ObjectId,
    ref: 'domain_lists',
    require: true
  }
}