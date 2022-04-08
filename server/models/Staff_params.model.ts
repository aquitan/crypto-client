import { Schema, model } from 'mongoose'
import { STAFF_PARAMS_SCHEMA } from '../schemas/Staff_params.schema'

interface Params {
  staffEmail: string
  paymentFee: number
  supportName: string
  staffAccessDate: number
  whoGiveAccess: Schema.Types.ObjectId
}
const StaffParams = new Schema<Params>(STAFF_PARAMS_SCHEMA)

export default model('StaffParams', StaffParams)
