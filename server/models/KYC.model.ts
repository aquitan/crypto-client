import { Schema, model } from 'mongoose'
import { USER_KYC } from '../schemas/KYC.schema'

interface User_KYC {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  documentNumber: string
  mainAddress: string
  subAddress?: string
  city: string
  state?: string
  zipCode: number
  documentType: string
  frontDocumentPhoto: string
  backDocumentPhoto: string
  selfieDocumentPhoto: string
  userId: Schema.Types.ObjectId
}

const UserKyc = new Schema<User_KYC>(USER_KYC)

export default model('User_Kyc', UserKyc)

