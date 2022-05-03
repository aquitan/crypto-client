
export default interface TWO_STEP_ENABLE {
  twoFaType: string
  twoFaStatus: boolean
  domainName: string
  userId: number
  userEmail: string
  currentTime: string
  code: string
}