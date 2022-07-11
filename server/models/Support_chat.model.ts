import { Schema, model } from 'mongoose'
import { SUPPORT_CHAT_SCHEMA } from '../schemas/Support_chat.schema'
import CHAT_DATA from '../interface/chat_data.interface'

const supportChat = new Schema<CHAT_DATA>(SUPPORT_CHAT_SCHEMA)

export default model('support_chat', supportChat)

