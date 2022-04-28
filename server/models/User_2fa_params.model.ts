import { Schema, model } from 'mongoose'
import { USER_2FA_PARAMS } from '../schemas/User_2fa_params.schema'

interface TwoStepParams {
  twoStepType: string
  enableDate: number
  userId: Schema.Types.ObjectId
}
const UserTwoStepParams = new Schema<TwoStepParams>(USER_2FA_PARAMS)

export default model('User_Two_Step_Params', UserTwoStepParams)
