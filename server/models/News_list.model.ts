import { Schema, model } from 'mongoose'
import { NEWS_LIST_SCHEMA } from '../schemas/News_list.schema'

interface Params {
  newsTitle: string
  newsDate: number
  newsBody: string
  newsImage: string
  newsDomain: string
  staffEmail: string
  staffId: Schema.Types.ObjectId
}
const NewsList = new Schema<Params>(NEWS_LIST_SCHEMA)

export default model('News_list', NewsList)
