import { Schema, model } from 'mongoose'
import { SECURE_DEAL_CHAT_SCHEMA } from '../schemas/Secure_deal_chat.schema'
import SECURE_CHAT_DATA from '../interface/secure_deal_chat.interface'

const secureDealChat = new Schema<SECURE_CHAT_DATA>(SECURE_DEAL_CHAT_SCHEMA)

export default model('secure_deal_chat', secureDealChat)

