
export default interface CREATE_USER_AS_STAFF {
  staffEmail: string
  staffId: string
  userEmail: string
  password: string
  depositFee: number
  domainName: string
  fullDomainName: string
  currentDate: string
  name?: string
}