
export default class DashboardUserDto {
  name
  email

  constructor(model: any) {
    this.name = model.name
    this.email = model.email
  }
}