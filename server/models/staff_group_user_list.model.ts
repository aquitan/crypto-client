import { Schema, model } from 'mongoose'
import { STAFF_GROUP_USERS_SCHEMA } from '../schemas/Staff_group_user_list.schema'

interface listParam {
  staffList: string[]
  groupId: Schema.Types.ObjectId
}

const groupUserList = new Schema<listParam>(STAFF_GROUP_USERS_SCHEMA)

export default model('group_user_list', groupUserList)

