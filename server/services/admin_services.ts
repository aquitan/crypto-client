import domainList from '../models/Domain_list.model'
import userPromocode from '../models/Promocodes.model'
import usedPromoList from '../models/Used_promocodes.model'
import newsList from '../models/News_list.model'
import userKyc from '../models/KYC.model'
import baseUserData from '../models/User_base_data.model'
import userParams from '../models/User_params.model'
import staffParams from '../models/Staff_params.model'
import TokenModel from '../models/Token.model'

class adminService {

  async GetUsersList() {
    const usersList: any = await baseUserData.find()
    console.log('user list: ', usersList);

    let dataArray: any = []

    for (let i = 0; i <= usersList.length - 1; i++) {
      const kycParams: any = await userParams.findOne({ userId: usersList[i].id })
      if (!kycParams) return false
      let dataObject = {
        userId: usersList[i].id,
        registerDate: usersList[i].dateOfEntry,
        userName: usersList[i].name,
        userEmail: usersList[i].email,
        userStatus: kycParams.isStaff,
        kycStatus: kycParams.kycStatus
      }
      dataArray.push(dataObject)
    }
    if (!dataArray.length) return false
    return dataArray
  }

  async DashboardInfo() {
    interface INFO {
      telegrams: {
        logsBot: string
        twoStepBot: string
        newsTgChanel: string
      }
      baseInfo: {
        totalUsers: number
        unreadMessages: number
        depositAmount: number
        onlineUsers: number
      }
    }

    const usersList: any = await baseUserData.find()
    const userOnline: any = await TokenModel.find()

    console.log('user list: ', usersList.length);
    console.log('user online list: ', userOnline.length);

    if (!usersList.length) return false

    const logsBotName: any = process.env.TELEGRAM_USER_LOGS_BOT
    const twoStepBotName: any = process.env.TELEGRAM_2FA_CODE_SENDER
    const newsTgChanelName: any = process.env.TELEGRAM_PROJECT_NEWS_BOT

    let dataLIst: INFO = {
      telegrams: {
        logsBot: logsBotName,
        twoStepBot: twoStepBotName,
        newsTgChanel: newsTgChanelName,
      },
      baseInfo: {
        totalUsers: usersList.length,
        unreadMessages: 31,
        depositAmount: 13,
        onlineUsers: userOnline.length
      }
    }
    return dataLIst
  }

  async UpdateStaffStatus(staffEmail: string, userEmail: string, currentDate: number, status: boolean) {
    const user: any = await baseUserData.findOne({ email: userEmail })
    console.log('found user: ', user)
    if (!user) return false

    await staffParams.create({
      paymentFee: 80,
      supportName: 'Support team',
      staffAccessDate: currentDate,
      staffUserEmail: userEmail,
      whoGiveAccess: staffEmail
    })
    await userParams.findOneAndUpdate(
      { userId: user._id },
      { isStaff: status }
    )
    return true
  }

  async GetKycForAdmin() {
    const kycList: any = await userKyc.find()
    console.log("list is: ", kycList)
    if (!kycList.length) return false
    return kycList

  }

  async GetPromocodeListForAdmin() {
    const promocodeList: any = await userPromocode.find()
    console.log('service code list is: ', promocodeList);
    if (!promocodeList.length) return false
    return promocodeList
  }


  async GetUsedPromocodeListForAdmin() {
    const list: any = await usedPromoList.find()
    console.log('service code list is: ', list);
    if (!list.length) return false
    return list
  }

  async DeleteUsedPromocodesAsAdmin() {
    const codeList: any = await usedPromoList.find()
    console.log('service code list is: ', codeList);
    if (!codeList.length) return false
    await usedPromoList.deleteMany()
    return true
  }


  async GetDomainListForAdmin() {
    const list: any = await domainList.find()
    console.log('domainList is: ', list);
    if (!list.length) return false
    return list
  }

  async GetNewsListForAdmin() {
    const list: any = await newsList.find()
    console.log('found news: ', newsList);
    if (!list.length) return false
    return list
  }

}

export default new adminService()