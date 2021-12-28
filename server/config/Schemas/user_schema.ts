
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
  },
  isUser: {
    type: Boolean
  },
  isStaff: {
    type: Boolean
  },
  isAdmin: {
    type: Boolean
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