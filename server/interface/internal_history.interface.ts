
export default interface INTERNAL_HISTORY {
  userId: number
  userEmail: string
  secondPartyEmail: string
  domainName: string
  coinName: string
  amountInCrypto: number
  amountInUsd: number
  currentDate: string
  fromAddress: string
  toAddress: string
  transferType: string
  // type is *deposit* OR *withdrawal*
  transferStatus: string
}