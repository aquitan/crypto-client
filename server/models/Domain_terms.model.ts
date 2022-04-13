import { Schema, model } from 'mongoose'
import { TERMS } from '../schemas/Domain_terms.schema'

interface Terms {
  domainName: string
  body: string
}
const DomainTerms = new Schema<Terms>(TERMS)

export default model('Domain_Terms', DomainTerms)
