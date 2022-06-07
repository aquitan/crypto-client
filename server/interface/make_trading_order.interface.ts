import { Schema } from 'mongoose'

export default interface TRADING_ORDER_INTERFACE {
  userEmail: string
  domainName: string
  orderDate: number
  coinName: string
  coinValue: number
  coinRate: number
  orderStatus: string
  orderType: boolean
  userId: Schema.Types.ObjectId
}