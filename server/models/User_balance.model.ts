import { Schema, model } from 'mongoose'
import { USER_BALANCE_SCHEMA } from '../schemas/User_balance.schema'

interface BalanceParams {
  coinName: string
  coinFullName: string
  coinBalance: number
  userId: Schema.Types.ObjectId
}
const UserBalance = new Schema<BalanceParams>(USER_BALANCE_SCHEMA)

export default model('User_Balance', UserBalance)
