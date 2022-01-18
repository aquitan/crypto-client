export default class DashboardUserDto {
  name
  email
  date_of_birth
  phone
  main_address


  constructor(model: any) {
    this.name = model.name
    this.email = model.email
    this.date_of_birth = model.date_of_birth
    this.phone = model.phone
    this.main_address = model.main_address
  }
}