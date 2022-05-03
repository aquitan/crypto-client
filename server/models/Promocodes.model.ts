import { Schema, model } from 'mongoose'
import { USER_PROMO } from '../schemas/Promocodes.schema'

interface Promo {
  code: string
  date: number
  value: number
  coinName: string
  notificationText: string
  domainName: string
  staffUserId: Schema.Types.ObjectId
}
const PromocdeList = new Schema<Promo>(USER_PROMO)

export default model('Promocde_List', PromocdeList)
