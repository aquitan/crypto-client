
export default interface DEPOSIT_HISTORY {
  userId: number
  userEmail: string
  domainName: string
  coinName: string
  amountInCrypto: number
  amountInUsd: number
  currentDate: number
  depositAddress: string
  depositStatus: string
  // status is approved ONLY here !
}