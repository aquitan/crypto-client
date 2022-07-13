import { Schema } from 'mongoose'

export default interface SECURE_CHAT_DATA {
  userId: string | Schema.Types.ObjectId
  domainName: string
  supportName: string | null
  staffId: string | Schema.Types.ObjectId
  curDate: number
  isUser: boolean
  messageBody: string
  imageLink: string | null
  chatId: string | null
  userEmail: string
  secondPartyEmail: string
}