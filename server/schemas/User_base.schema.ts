
export const USER_BASE = {
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unic: true
  },
  password: {
    type: String,
    required: true
  },
  activationLink: {
    type: String,
    required: true
  },
  registrationType: {
    type: String,
    required: true
  },
  promocode: {
    type: String,
    required: true
  },
  domainName: {
    type: String,
    required: true
  },
  dateOfEntry: {
    type: Number,
    required: true
  },

}