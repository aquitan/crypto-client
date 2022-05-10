import { Schema, model } from 'mongoose'
import { SWAP_HISTORY_SCHEMA } from '../schemas/Swap_history.schema'

interface HistotyParams {
  userEmail: string
  userDomain: string
  coinNameFrom: string
  coinNameTo: string
  cryptoAmountFrom: number
  cryptoAmountTo: number
  usdAmount: number
  date: number
  status: string
  userId: Schema.Types.ObjectId
}
const SwapHistory = new Schema<HistotyParams>(SWAP_HISTORY_SCHEMA)

export default model('Swap_History', SwapHistory)
