import { Schema, model } from 'mongoose'
import { USER_LOGS } from '../schemas/User_logs.schema'

interface UserLogs {
  userEmail: string
  ipAddress: string
  requestCity: string
  countryName: string
  location: string
  browser: string
  actionDate: number
  userAction: string
  userDomain: string
  userId: Schema.Types.ObjectId
}
const UserLogs = new Schema<UserLogs>(USER_LOGS)

export default model('UserLogs', UserLogs)
