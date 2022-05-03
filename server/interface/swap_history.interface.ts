
export default interface SWAP_HISTORY {
  userId: string
  userEmail: string
  domainName: string
  coinNameFrom: string
  coinNameTo: string
  amountInCryptoFrom: number
  amountInCryptoTo: number
  amountInUsdFrom: number
  amountInUsdTo: number
  currentDate: string
  swapStatus: string
  // status is approved ONLY here  ???
}