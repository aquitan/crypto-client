import { Schema, model } from 'mongoose'
import { DEPOSIT_WALLETS_SCHEMA } from '../schemas/deposit_address.schema'

interface internalWalletParams {
  coinName: string
  address: string
  seedPhrase: string
  key: string
  userEmail: string
  userId: Schema.Types.ObjectId
}
const userDepositWallet = new Schema<internalWalletParams>(DEPOSIT_WALLETS_SCHEMA)

export default model('Deposit_Wallets', userDepositWallet)
