
export default interface UPDATE_2FA_STATUS {
  twoFaType: string
  userId: string
  userEmail: string
  domainName: string
  twoFaStatus: boolean
  enableDate: string
}