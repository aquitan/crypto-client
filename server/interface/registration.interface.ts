
export default interface REGISTRATION_DATA {
  email: string
  password: string
  name?: string
  promocode: string
  domainName: string
  ipAddress: string
  city: string
  countryName: string
  coordinates: string
  browser: string
  currentDate: number
  doubleDeposit: boolean
  depositFee: number
  minDepositSum: number
  minWithdrawalSum: number
  currencySwapFee: number
}