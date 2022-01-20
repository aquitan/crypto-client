export default class AuthUserDto {
  ID
  name
  email
  isActivated
  isUser
  isStaff
  isAdmin
  isBanned


  constructor(model: any) {
    this.ID = model.ID
    this.name = model.name || null
    this.email = model.email
    this.isActivated = model.isActivated
    this.isUser = model.isUser
    this.isStaff = model.isStaff
    this.isAdmin = model.isAdmin
    this.isBanned = model.isBanned
  }
}
