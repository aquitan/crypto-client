import { Schema, model } from 'mongoose'
import { USER_IP_MATCH } from '../schemas/User_ip_match.schema'

interface ipMatch {
  userId: Schema.Types.ObjectId
  twoStepType: string
  enableDate: number
}
const UserIpMatch = new Schema<ipMatch>(USER_IP_MATCH)

export default model('UserIpMatch', UserIpMatch)
