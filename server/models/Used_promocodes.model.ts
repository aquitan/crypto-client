import { Schema, model } from 'mongoose'
import { ALREADY_USED_PROMO } from '../schemas/Used_promocodes.schema'

interface UsedPromo {
  code: string
  date: number
  value: number
  coinName: string
  notificationText: string
  domainName: string
  usedByUser: string
  staffUserId: Schema.Types.ObjectId
}
const UsedPromocde = new Schema<UsedPromo>(ALREADY_USED_PROMO)

export default model('Used_Promocde', UsedPromocde)
