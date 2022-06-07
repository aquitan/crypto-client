
export const COIN_RATES_SCHEMA = {
  coinName: {
    type: String,
    require: true
  },
  valueInPercent: {
    type: Number,
    require: true
  },
  rateCorrectType: {
    type: Boolean,
    require: true
  },
  timeRangeInMs: {
    type: Number,
    require: true
  },
  domainName: {
    type: String,
    require: true
  }
}