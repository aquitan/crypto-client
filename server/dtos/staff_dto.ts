export default class StaffDto {
  email
  id
  domain

  constructor(model: any) {
    this.email = model.email
    this.id = model.id
    this.domain = model.staffDomain

  }
}