
export default interface WITHDRAWAL_HISTORY {
  userId: number
  userEmail: string
  domainName: string
  coinName: string
  coinFullName: string
  amountInCrypto: number
  amountInUsd: number
  currentDate: string
  withdrawalAddress: string | null
  withdrawalStatus: string
  // status is approved ONLY here !
}