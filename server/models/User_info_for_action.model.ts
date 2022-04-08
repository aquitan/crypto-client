import { Schema, model } from 'mongoose'
import { USER_INFO_FOR_ACTION } from '../schemas/User_info_for_action.schema'

interface InfoParams {
  depositFee: number
  doubleDeposit: boolean
  lastDeposit: number
  activeError: number
  userId: Schema.Types.ObjectId
}

const UserInfoForAction = new Schema<InfoParams>(USER_INFO_FOR_ACTION)

export default model('UserInfoForAction', UserInfoForAction)
