
export const RECRUITER_SCHEMA = {
  userEmail: {
    type: String,
    require: true
  },
  permissionDate: {
    type: Number,
    require: true
  },
  currentFee: {
    type: Number,
    min: 0,
    max: 50,
    required: true
  }
}