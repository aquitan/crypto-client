import { Schema, model } from 'mongoose'
import { DEPOSIT_WALLETS_SCHEMA } from '../schemas/deposit_address.schema'

interface depositWalletParams {
  coinName: string
  coinFullName: string
  address: string
  status: string
  expiredDate: number
  userEmail: string
  userId: Schema.Types.ObjectId
}
const userDepositWallet = new Schema<depositWalletParams>(DEPOSIT_WALLETS_SCHEMA)

export default model('Deposit_Wallets', userDepositWallet)
