import { Schema, model } from 'mongoose'
import { STAFF_PARAMS_SCHEMA } from '../schemas/Staff_params.schema'

interface Params {
  newsTitle: string
  newsDate: number
  newsBody: string
  newsImage: string
  newsDomain: string
  staffEmail: string
  staffId: Schema.Types.ObjectId
}
const StaffParams = new Schema<Params>(STAFF_PARAMS_SCHEMA)

export default model('StaffParams', StaffParams)
