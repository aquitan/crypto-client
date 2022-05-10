
export default interface INTERNAL_HISTORY {
  userId: number
  userEmail: string
  domainName: string
  coinName: string
  amountInCrypto: number
  amountInUsd: number
  currentDate: string
  fromAddress: string
  toAddress: string
  transferType: boolean
  // if type is *deposit* = true OR *withdrawal* = false
  transferStatus: string
}