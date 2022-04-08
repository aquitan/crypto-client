import { Schema, model } from 'mongoose'
import { USER_PARAMS } from '../schemas/User_params.schema'
// import * as mongoose from 'mongoose'

interface UserParams {
  doubleDeposit: boolean
  isUser: boolean
  isStaff: boolean
  isAdmin: boolean
  isBanned: boolean
  swapBan: boolean
  internalBan: boolean
  isActivated: boolean
  premiumStatus: boolean
  twoStepStatus: boolean
  kycStatus: string
  userId: Schema.Types.ObjectId
}
const UserParams = new Schema<UserParams>(USER_PARAMS)

export default model('UserParams', UserParams)
