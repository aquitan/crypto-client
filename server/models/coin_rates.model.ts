import { Schema, model } from 'mongoose'
import { COIN_RATES_SCHEMA } from '../schemas/Coin_rates.schema'

interface rate {
  coinName: string
  valueInPercent: number
  rateCorrectType: boolean
  timeRangeInMs: number
  domainName: string
}
const coinRateAtDomain = new Schema<rate>(COIN_RATES_SCHEMA)

export default model('coin_rates', coinRateAtDomain)
