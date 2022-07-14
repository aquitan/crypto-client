import { Schema, model } from 'mongoose'
import { USER_WALLET_SCHEMA } from '../schemas/User_wallet.schema'

interface walletParams {
  coinName: string
  address: string
  seedPhrase: any
  key: string
  userId: Schema.Types.ObjectId
}
const userWallet = new Schema<walletParams>(USER_WALLET_SCHEMA)

export default model('User_Wallet', userWallet)
