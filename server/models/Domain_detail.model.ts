import { Schema, model } from 'mongoose'
import { DOMAIN_DETAIL_SCHEMA } from '../schemas/Domain_detail.schema'

interface DomainParams {
  showNews: boolean
  doubleDeposit: boolean
  depositFee: number
  rateCorrectSum: number
  minDepositSum: number
  minWithdrawalSum: number
  coinSwapFee: number
  dateOfCreate: number
  domainId: Schema.Types.ObjectId
}
const DomainDetail = new Schema<DomainParams>(DOMAIN_DETAIL_SCHEMA)

export default model('DomainDetail', DomainDetail)
