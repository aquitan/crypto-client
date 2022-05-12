import { Schema, model } from 'mongoose'
import { SECURE_DEAL_SCHEMA } from '../schemas/secure_deal.schema'
import { DEAL_INTERFACE } from 'interface/secure_deal.interface'


const secureDeal = new Schema<DEAL_INTERFACE>(SECURE_DEAL_SCHEMA)

export default model('secure_deals', secureDeal)