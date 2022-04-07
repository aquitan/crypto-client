import { Schema, model } from 'mongoose'
import { USER_WALLET_SCHEMA } from '../schemas/User_balacne.schema'

interface BalanceParams {
  coinName: string
  coinFullName: string
  coinBalance: number
  staffId: Schema.Types.ObjectId
}
const UserBalance = new Schema<BalanceParams>(USER_WALLET_SCHEMA)

export default model('UserBalance', UserBalance)
