import { Schema } from 'mongoose';

export const STAFF_GROUP_SCHEMA = {
  groupName: {
    type: String,
    minlength: 5,
    maxlength: 30,
    require: true
  },
  dateOfCreate: {
    type: Number,
    require: true
  },
  viewParams: {
    type: Boolean,
    require: true
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    require: true
  }
}