
export default class ProfileUserDto {
  name
  email
  dateOfBirth
  phone
  mainAddress


  constructor(model: any) {
    this.name = model.name
    this.email = model.email
    this.dateOfBirth = model.dateOfBirth
    this.phone = model.phone
    this.mainAddress = model.main_address
  }
}