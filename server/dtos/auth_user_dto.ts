export default class AuthUserDto {
  id
  name
  email
  isActivated
  isUser
  isStaff
  isAdmin
  isBanned
  kycStatus
  twoStepStatus
  premiumStatus
  doubleDeposit
  swapBan
  internalBan
  depositFee



  constructor(model: any) {
    this.id = model._id
    this.name = model.name || null
    this.email = model.email
    this.isActivated = model.isActivated
    this.isUser = model.isUser
    this.isStaff = model.isStaff
    this.isAdmin = model.isAdmin
    this.isBanned = model.isBanned
    this.kycStatus = model.kycStatus
    this.twoStepStatus = model.twoStepStatus
    this.premium_status = model.premium_status
    this.double_deposit = model.double_deposit
    this.swap_ban = model.swap_ban
    this.internal_ban = model.internal_ban
    this.deposit_fee = model.deposit_fee
  }
}
