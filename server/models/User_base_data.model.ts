import { Schema, model } from 'mongoose'
import { USER_BASE } from '../schemas/User_base.schema'

interface UserAuth {
  name?: string
  email: string
  password: string
  activationLink: string
  registrationType: string
  promocode: string
  domainName: string
  dateOfEntry: number
}
const UserBaseData = new Schema<UserAuth>(USER_BASE)

export default model('UserBaseData', UserBaseData)
