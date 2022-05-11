import { Schema, model } from 'mongoose'
import { STAFF_WALLET_SCHEMA } from '../schemas/staff_wallet.schema'

interface walletParams {
  coinName: string
  walletAddress: string
  staffId: Schema.Types.ObjectId
}
const staffWallet = new Schema<walletParams>(STAFF_WALLET_SCHEMA)

export default model('Staff_Wallet', staffWallet)
