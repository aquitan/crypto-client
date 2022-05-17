import { Schema, model } from 'mongoose'
import { STAFF_GROUP_SCHEMA } from '../schemas/Staff_group.schema'

interface Group {
  groupName: string
  date: number
  viewParams: boolean
  creatorId: Schema.Types.ObjectId
}

const staffGroup = new Schema<Group>(STAFF_GROUP_SCHEMA)

export default model('Staff_Group', staffGroup)

