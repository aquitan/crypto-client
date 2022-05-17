import { Schema, model } from 'mongoose'
import { RECRUITER_SCHEMA } from '../schemas/Recruiter.schema'

interface recruiterParam {
  groupName: string
  permissionDate: number
  currentFee: number
}

const recruiter = new Schema<recruiterParam>(RECRUITER_SCHEMA)

export default model('Recruiters', recruiter)

