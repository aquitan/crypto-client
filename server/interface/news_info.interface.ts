import { Schema } from 'mongoose'

export default interface NEWS_INFO {
  newsTitle: string
  newsDate: number
  newsBody: string
  newsImage: string | null
  newsDomain: string
  staffEmail: string
  staffId: string | Schema.Types.ObjectId
}