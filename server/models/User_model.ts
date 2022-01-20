
export interface USER {
  // id: number
  email: string
  password: string
  name?: string
  isUser: boolean
  isStaff: boolean
  isAdmin: boolean
  isBanned: boolean
  isActivated: boolean
  activationLink: string
  userDomain: string
}

// //  add 2fa types
// //  google, telegram, phone ?
// //