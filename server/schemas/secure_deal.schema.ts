
export const SECURE_DEAL_SCHEMA = {
  userEmail: {
    type: String,
    require: true
  },
  secondPartyEmail: {
    type: String,
    require: true
  },
  dealCondition: {
    type: String,
    require: true
  },
  coinName: {
    type: String,
    require: true
  },
  amountInCrypto: {
    type: Number,
    require: true
  },
  seller: {
    type: String,
    require: true
  },
  buyer: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ['pending', 'failed', 'complete'],
    require: true,
    default: 'pending'
  },
  acceptCode: {
    type: String,
    require: true
  },
  dealDedline: {
    type: Number,
    require: true
  },
  dateOfCreate: {
    type: Number,
    require: true
  }
}
