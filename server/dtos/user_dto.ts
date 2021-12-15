export default class UserDto {
  email
  id
  isActivated
  isUser

  constructor(model: any) {
    this.email = model.email
    this.id = model.id
    this.isActivated = model.isActivated
    this.isUser = model.isUser
  }
}