import { Schema, model } from 'mongoose'
import { RECRUITER_OWN_USERS_SCHEMA } from '../schemas/Recruiter_own_users.schema'

interface recruiterOwnParams {
  staffEmail: string,
  staffFee: number,
  recruiterFee: number,
  recruiterId: Schema.Types.ObjectId
}

const recruiterOwnUsers = new Schema<recruiterOwnParams>(RECRUITER_OWN_USERS_SCHEMA)

export default model('recruiter_own_users', recruiterOwnUsers)

