import { Schema, model } from 'mongoose'
import { DOMAIN_ERRORS_SCHEMA } from '../schemas/Domain_errors.schema'

interface ErrorParams {
  domainName: string
  errorName: string
  errorTitle: string
  errorText: string
  errorButton: string
  domainId: Schema.Types.ObjectId
}
const DomainWithdrawalErrors = new Schema<ErrorParams>(DOMAIN_ERRORS_SCHEMA)

export default model('DomainWithdrawalErrors', DomainWithdrawalErrors)
