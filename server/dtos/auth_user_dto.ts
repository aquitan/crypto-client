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
    this.premiumStatus = model.premiumStatus
    this.doubleDeposit = model.doubleDeposit
    this.swapBan = model.swapBan
    this.internalBan = model.internalBan
    this.depositFee = model.premiumStatus
  }
}
