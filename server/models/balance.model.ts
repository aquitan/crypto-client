import { Schema, model } from 'mongoose'
import { BALANCE_SCHEMA } from '../schemas/Balance.schema'

interface balanceParams {
  coinName: string
  coinFullName: string
  coinBalance: number
  userEmail: string
  userId: Schema.Types.ObjectId
}
const userBalance = new Schema<balanceParams>(BALANCE_SCHEMA)

export default model('User_Balance', userBalance)
