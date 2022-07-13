import { Schema, model } from 'mongoose'
import { NEWS_LIST_SCHEMA } from '../schemas/News_list.schema'
import NEWS_INFO from '../interface/news_info.interface'

const NewsList = new Schema<NEWS_INFO>(NEWS_LIST_SCHEMA)

export default model('News_list', NewsList)
