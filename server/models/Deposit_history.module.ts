import { Schema, model } from 'mongoose'
import { DEPOSIT_HISTORY_SCHEMA } from '../schemas/Deposit_history.schema'

interface HistotyParams {
  userEmail: string
  userDomain: string
  coinName: string
  cryptoAmount: number
  usdAmount: number
  date: number
  address: string
  status: string
  staffId: Schema.Types.ObjectId
}
const DepositHistory = new Schema<HistotyParams>(DEPOSIT_HISTORY_SCHEMA)

export default model('Deposit_History', DepositHistory)
