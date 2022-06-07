import { Schema, model } from 'mongoose'
import { TRADING_ORDER_SCHEMA } from '../schemas/Trading_orders.schema'
import TRADING_ORDER_INTERFACE from '../interface/make_trading_order.interface'

const tradingOrder = new Schema<TRADING_ORDER_INTERFACE>(TRADING_ORDER_SCHEMA)

export default model('trading_orders', tradingOrder)
