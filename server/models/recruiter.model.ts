import { Schema, model } from 'mongoose'
import { RECRUITER_SCHEMA } from '../schemas/Recruiter.schema'

interface recruiterParam {
  recruiterEmail: string
  recruiterId: Schema.Types.ObjectId
  permissionDate: number
  accessFrom: string
  currentFee: number
}

const recruiter = new Schema<recruiterParam>(RECRUITER_SCHEMA)

export default model('Recruiter', recruiter)

