export const USER_IP_MATCH = {
  userEmail: {
    type: String,
    require: true
  },
  ipAddress: {
    type: String,
    require: true
  },
  loginDate: {
    type: Number,
    require: true
  },
  browser: {
    type: String,
    require: true
  }
}