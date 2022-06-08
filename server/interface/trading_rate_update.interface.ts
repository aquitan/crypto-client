
export default interface TRADING_COIN_RATE_UPDATE {
  coinName: string
  valueInPercent: number
  growthParams: boolean
  domainName: string
  timeRangeInMs: number
}