import { Schema, model } from 'mongoose'
import { USER_LOGS } from '../schemas/User_logs.schema'

interface UserLogs {
  userEmail: string
  ipAddress: string
  requestCity: string | null
  countryName: string
  location: string
  browser: string
  actionDate: number
  userAction: string
  userDomain: string
}
const UserLogs = new Schema<UserLogs>(USER_LOGS)

export default model('User_Logs', UserLogs)
