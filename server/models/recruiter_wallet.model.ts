import { Schema, model } from 'mongoose'
import { RECRUITER_WALLET_SCHEMA } from '../schemas/Recruiter_wallet.schema'

interface walletParams {
  coinName: string
  walletAddress: string
  staffId: Schema.Types.ObjectId
}
const recruiterWallet = new Schema<walletParams>(RECRUITER_WALLET_SCHEMA)

export default model('recruiter_Wallet', recruiterWallet)
