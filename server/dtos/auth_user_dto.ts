export default class AuthUserDto {
  ID
  name
  email
  isActivated
  isUser
  isStaff
  isAdmin
  isBanned
  kyc_status
  two_step_status
  premium_status
  double_deposit
  swap_ban
  internal_ban
  deposit_fee
  


  constructor(model: any) {
    this.ID = model.ID
    this.name = model.name || null
    this.email = model.email
    this.isActivated = model.isActivated
    this.isUser = model.isUser
    this.isStaff = model.isStaff
    this.isAdmin = model.isAdmin
    this.isBanned = model.isBanned
    this.kyc_status = model.kyc_status
    this.two_step_status = model.two_step_status
    this.premium_status = model.premium_status
    this.double_deposit = model.double_deposit
    this.swap_ban = model.swap_ban
    this.internal_ban = model.internal_ban
    this.deposit_fee = model.deposit_fee
  }
}
