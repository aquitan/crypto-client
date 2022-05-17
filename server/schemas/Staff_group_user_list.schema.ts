import { Schema } from 'mongoose';

export const STAFF_GROUP_USERS_SCHEMA = {
  staffEmailList: {
    type: [],
    require: true
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'staff_groups',
    require: true
  }
}