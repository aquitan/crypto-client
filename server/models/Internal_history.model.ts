import { Schema, model } from 'mongoose'
import { INTERNAL_HISTORY_SCHEMA } from '../schemas/Internal_history.schema'

interface HistotyParams {
  userEmail: string
  secondUserEmail: string
  userDomain: string
  coinName: string
  cryptoAmount: number
  usdAmount: number
  date: number
  addressFrom: string
  addressTo: string
  transferType: boolean
  status: string
  staffId: Schema.Types.ObjectId
}
const InternalHistory = new Schema<HistotyParams>(INTERNAL_HISTORY_SCHEMA)

export default model('Internal_History', InternalHistory)
