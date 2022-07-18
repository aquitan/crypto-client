// import { Schema } from 'mongoose'

export default interface DOMAIN_INFO {
  staffEmail: string
  fullDomainName: string
  domainName: string
  companyAddress: string
  companyPhoneNumber: number
  companyEmail: string
  companyOwnerName: string
  companyYear: number
  companyCountry: string
  showNews: boolean
  doubleDeposit: boolean
  depositFee: number
  minDepositSum: number
  minWithdrawalSum: number
  currencySwapFee: number
  designName: string
  errorList: {
    verif_document: {
      domainName: string
      errorName: string
      title: string
      text: string
      button: string
    },
    verif_address: {
      domainName: string
      errorName: string
      title: string
      text: string
      button: string
    },
    insurance: {
      domainName: string
      errorName: string
      title: string
      text: string
      button: string
    },
    premium: {
      domainName: string
      errorName: string
      title: string
      text: string
      button: string
    },
    multi_account: {
      domainName: string
      errorName: string
      title: string
      text: string
      button: string
    }
  }
  dateOfDomainCreate: string
  staffId: string
}