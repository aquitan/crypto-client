
export const TWO_FACTOR_CODE_LIST = {
  code: {
    type: String,
    require: true
  },
  email: {
    type: String,
    ref: 'UserBaseData',
    require: true
  }
}