import { Schema, model } from 'mongoose'
import { TWO_FACTOR_CODE_LIST } from '../schemas/User_2fa_code_list.schema'

interface CodeList {
  code: string
  userEmail: string
}

const TwoFactorCodeList = new Schema<CodeList>(TWO_FACTOR_CODE_LIST)

export default model('Two_Factor_Code_List', TwoFactorCodeList)
