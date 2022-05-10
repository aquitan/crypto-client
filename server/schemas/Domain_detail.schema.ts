import { Schema } from 'mongoose'

export const DOMAIN_DETAIL_SCHEMA = {
  showNews: {
    type: Boolean,
    require: true
  },
  doubleDeposit: {
    type: Boolean,
    require: true
  },
  depositFee: {
    type: Number,
    min: 1,
    max: 5,
    require: true
  },
  rateCorrectSum: {
    type: Number,
    min: 0,
    max: 15,
    require: true
  },
  minDepositSum: {
    type: Number,
    require: true
  },
  minWithdrawalSum: {
    type: Number,
    require: true
  },
  coinSwapFee: {
    type: Number,
    min: 1,
    max: 5,
    require: true
  },
  dateOfCreate: {
    type: Number,
    require: true
  },
  domainId: {
    type: Schema.Types.ObjectId,
    ref: 'DomainList',
    require: true
  }
}