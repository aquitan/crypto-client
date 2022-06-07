
export default interface TRADING_COIN_RATE_UPDATE {
  coinName: string
  valueInPercent: number
  growthParams: boolean
  staffId: string
  domainName: string
  currentDate: number
  timeRangeInMs: number
}