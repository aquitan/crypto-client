import { Schema, model } from 'mongoose'
import { DEPOSIT_REQUESTS } from '../schemas/Deposit_requests.schema'

interface requestParams {
  userEmail: string
  userDomain: string
  coinName: string
  cryptoAmount: number
  usdAmount: number
  date: number
  address: string
  status: string
  userId: Schema.Types.ObjectId
}
const DepositRequest = new Schema<requestParams>(DEPOSIT_REQUESTS)

export default model('Deposit_Requests', DepositRequest)
