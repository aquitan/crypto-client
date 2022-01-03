export default class UserDto {
  email
  id
  isActivated
  isUser
  isStaff
  isAdmin
  isBanned

  constructor(model: any) {
    this.email = model.email
    this.id = model.id
    this.isActivated = model.isActivated
    this.isUser = model.isUser
    this.isStaff = model.isStaff
    this.isAdmin = model.isAdmin
    this.isBanned = model.isBanned
  }
}