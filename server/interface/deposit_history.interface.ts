
export default interface DEPOSIT_HISTORY {
  userId: number
  userEmail: string
  domainName: string
  coinName: string
  amountInCrypto: number
  amountInUsd: number
  currentDate: string
  depositAddress: string
  depositStatus: string
  // status is approved ONLY here !
}