
export default interface KYC_DATA {
  userId: string
  userEmail: string
  firstName: string
  lastName: string
  phoneNumber: string
  dateOfBirth: string
  documentNumber: string
  mainAddress: string
  zipCode: number
  documentType: string
  ipAddress: string
  state?: string | null
  city: string
  browser: string
  documents: {
    frontDocumentPhoto: string
    backDocumentPhoto: string
    selfieDocumentPhoto: string
  }
  subAddress?: string | null
  countryName: string
  coordinates: string
  currentDate: string
  userAction: string
  domainName: string
  kycStatus: string
}