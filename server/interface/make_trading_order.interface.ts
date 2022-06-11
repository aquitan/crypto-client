import { Schema } from 'mongoose'

export default interface TRADING_ORDER_INTERFACE {
  userEmail: string
  domainName: string
  orderDate: number
  coinName: string
  coinValue: number
  valueInUsdt: number
  coinRate: number
  orderStatus: boolean | null
  orderType: boolean
  userId: Schema.Types.ObjectId
}