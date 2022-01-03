
const USER_SCHEMA_SETTINGS = {
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    default: '',
  },
  isUser: {
    type: Boolean,
    default: true
  },
  isStaff: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  activationLink: {
    type: String
  }
}

export default USER_SCHEMA_SETTINGS;