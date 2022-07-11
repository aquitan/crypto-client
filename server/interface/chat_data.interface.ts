import { Schema } from 'mongoose'

export default interface CHAT_DATA {
  userId: string | Schema.Types.ObjectId
  domainName: string
  staffId: string | Schema.Types.ObjectId
  curDate: number
  messageBody: string
  imageLink: string | null
  chatId: string | null
}