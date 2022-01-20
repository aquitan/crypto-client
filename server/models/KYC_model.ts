
export default interface User_KYC {
  // id: number
  userId: number
  firstName: string
  lastName: string
  email: string
  // by kyc submit - send fetch from front with email
  // if new email equals old email => send fetch
  // if not equals => popup with: 'use new email to login?'
  phoneNumber: number
  dateOfBirth: string
  documentNumber: string
  mainAddress: string
  subAddress?: string
  city: string
  state?: string
  zipCode: number
  documentType: string
  // file ????
  frontDocument: any
  backDocument: any
  selfyWithDocument: any
  status: string
}
