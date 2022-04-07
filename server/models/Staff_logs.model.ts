import { Schema, model } from 'mongoose'
import { STAFF_LOGS_SCHEMA } from '../schemas/Staff_logs.schema'

interface LogParams {
  staffEmail: string
  staffAction: string
  staffDomain: string
  staffId: Schema.Types.ObjectId
}
const StaffLogs = new Schema<LogParams>(STAFF_LOGS_SCHEMA)

export default model('StaffLogs', StaffLogs)
