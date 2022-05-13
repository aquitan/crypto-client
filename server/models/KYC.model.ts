import { Schema, model } from 'mongoose'
import { USER_KYC } from '../schemas/KYC.schema'

interface User_KYC {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  documentNumber: string
  documentType: string
  mainAddress: string
  subAddress?: string | null
  city: string
  countryName: string
  state?: string | null
  zipCode: number
  documents: {
    frontDocumentPhoto: string
    backDocumentPhoto: string
    selfieDocumentPhoto: string
  }
  userDomain: string
  userId: Schema.Types.ObjectId
}

const UserKyc = new Schema<User_KYC>(USER_KYC)

export default model('User_Kyc', UserKyc)

