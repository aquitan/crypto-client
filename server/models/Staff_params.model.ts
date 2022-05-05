import { Schema, model } from 'mongoose'
import { STAFF_PARAMS_SCHEMA } from '../schemas/Staff_params.schema'

interface Params {
  paymentFee: number
  supportName: string
  staffAccessDate: number
  staffUserEmail: string
  whoGiveAccess: string
}
const StaffParams = new Schema<Params>(STAFF_PARAMS_SCHEMA)

export default model('Staff_Params', StaffParams)
