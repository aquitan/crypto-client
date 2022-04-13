import { Schema, model } from 'mongoose'
import { INTERNAL_WALLET_SCHEMA } from '../schemas/User_internal_wallets.schema'

interface BalanceParams {
  coinName: string
  coinFullName: string
  walletAddress: string
  staffId: Schema.Types.ObjectId
}
const UserInternalWallet = new Schema<BalanceParams>(INTERNAL_WALLET_SCHEMA)

export default model('User_Internal_Wallet', UserInternalWallet)
