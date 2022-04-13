import { Schema, model } from 'mongoose'
import { DOMAIN_SCHEMA } from '../schemas/Domain_list.schema'

interface Domain {
  fullDomainName: string
  domainName: string
  companyAddress: string
  companyPhoneNumber: string
  companyEmail: string
  companyOwnerName: string
  companyYear: number
  companyCountry: string
  domainOwner: Schema.Types.ObjectId
}
const DomainList = new Schema<Domain>(DOMAIN_SCHEMA)

export default model('Domain_List', DomainList)
