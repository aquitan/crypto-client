
export default interface User {
  id: number
  email: string
  password: string
  name?: string
  isUser: boolean
  isAdmin: boolean
  isStaff: boolean
  referalLink?: string
}

//  add 2fa types
//  google, telegram, phone ?
//