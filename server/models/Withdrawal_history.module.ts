import { Schema, model } from 'mongoose'
import { WITHDRAWAL_HISTORY_SCHEMA } from '../schemas/Withdrawal_history.schema'

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
const WithdrawalHistory = new Schema<HistotyParams>(WITHDRAWAL_HISTORY_SCHEMA)

export default model('Withdrawal_History', WithdrawalHistory)
