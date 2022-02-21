
export default class ProfileUserDto {
  name
  email
  date_of_bitrh
  phone_number
  main_address
  kyc_status
  two_step_status
  double_deposit
  swap_ban
  internal_ban
  deposit_fee

  constructor(model: any) {
    this.name = model.name
    this.email = model.email
    this.date_of_bitrh = model.date_of_birth
    this.phone_number = model.phone_number
    this.main_address = model.main_address
    this.kyc_status = model.kyc_status
    this.two_step_status = model.two_step_status
    this.double_deposit = model.double_deposit
    this.swap_ban = model.swap_ban
    this.internal_ban = model.internal_ban
    this.deposit_fee = model.deposit_fee
  }
}