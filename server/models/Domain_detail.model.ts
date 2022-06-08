import { Schema, model } from 'mongoose'
import { DOMAIN_DETAIL_SCHEMA } from '../schemas/Domain_detail.schema'

interface DomainParams {
  showNews: boolean
  doubleDeposit: boolean
  depositFee: number
  minDepositSum: number
  minWithdrawalSum: number
  coinSwapFee: number
  dateOfCreate: number
  designName: string
  domainId: Schema.Types.ObjectId
}
const DomainDetail = new Schema<DomainParams>(DOMAIN_DETAIL_SCHEMA)

export default model('Domain_Detail', DomainDetail)
