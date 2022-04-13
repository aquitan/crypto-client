import { Schema, model } from 'mongoose'
import { USER_NOTIF } from '../schemas/User_notification.schema'

interface Notif {
  text: string
  domain: string
  email: string
  userId: Schema.Types.ObjectId
}
const UserNotifications = new Schema<Notif>(USER_NOTIF)

export default model('User_Notifications', UserNotifications)
