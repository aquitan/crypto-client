import baseUserData from '../models/User_base_data.model'
import userKyc from '../models/KYC.model'
import userParams from '../models/User_params.model'
import userLogs from '../models/User_logs.model'

export default async function ProfileUserDto(userId: string) {

  const userBase: any = await baseUserData.findById({ id: userId })
  const userDetails: any = await userParams.findOne({ userId: userId })
  const kycParams: any = await userKyc.findOne({ userId: userId })
  const loginInfo: any = await userLogs.find({ userId: userId })

  let UserDto: any = {
    name: userBase.id,
    email: userBase.email,
    dateOfBitrh: null,
    phoneNumber: null,
    mainAddress: null,
    kycStatus: userDetails.kycStatus,
    twoStepStatus: userDetails.twoStepStatus,
    doubleDeposit: userDetails.doubleDeposit,
    swapBan: userDetails.swapBan,
    internalBan: userDetails.internalBan,
    depositFee: userDetails.depositFee,
    logs: loginInfo
  }
  if (kycParams) {
    UserDto.dateOfBitrh.kycParams.dateOfBirth
    UserDto.phoneNumber.kycParams.phoneNumber
    UserDto.mainAddress.kycParams.mainAddress
  }

  return UserDto
}