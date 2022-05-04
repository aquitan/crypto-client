import baseUserData from '../models/User_base_data.model'
import userParams from '../models/User_params.model'

export async function getUserData(email: string, userId?: string) {
  let curUser: any;
  if (email !== 'e' && !userId) {
    curUser = await baseUserData.findOne({ email: email })
  }
  if (userId && email === 'e') {
    curUser = await baseUserData.findById({
      _id: userId
    })
  }

  const userParamsInfo: any = await userParams.findOne({ userId: curUser.id })

  const userDto = {
    id: curUser.id,
    name: curUser.name,
    email: curUser.email,
    isActivated: userParamsInfo.isActivated,
    isUser: userParamsInfo.isUser,
    isStaff: userParamsInfo.isStaff,
    isAdmin: userParamsInfo.isAdmin,
    isBanned: userParamsInfo.isBanned,
    kycStatus: userParamsInfo.kycStatus,
    twoStepStatus: userParamsInfo.twoStepStatus,
    premiumStatus: userParamsInfo.premiumStatus,
    doubleDeposit: userParamsInfo.doubleDeposit,
    swapBan: userParamsInfo.swapBan,
    internalBan: userParamsInfo.internalBan,
    depositFee: userParamsInfo.depositFee
  }
  return userDto
}