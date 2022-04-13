import database from "../services/database_query"
import domainList from '../models/Domain_list.model'

class adminService {


  async GetUsersList() {
    const usersList: any = await database.GetAllUsersForAdmin()
    console.log("list is: ", usersList)
    if (!usersList[0]) return false
    return usersList
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

    const usersList: any = await database.GetAllUsersForAdmin()
    const userOnline: any = await database.GetOnlineUsersForAdmin()

    console.log('user list: ', usersList.length);
    console.log('user online list: ', userOnline.length);

    if (!usersList[0]) return false

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
    if (!userOnline.length) dataLIst.baseInfo.onlineUsers = 0
    console.log('received data list is: ', dataLIst)
    return usersList
  }

  async UpdateStaffStatus(staff_email: string, currentDate: string, user_id: number, status: boolean) {
    const user: any = await database.GetBaseUserParamsById(user_id)
    console.log('found user: ', user[0])

    if (!user[0]) return false
    await database.SaveStaffParams(staff_email, 80, 'support team', currentDate, user_id)

    await database.UpdateStaffStatus(user_id, status)
    return true
  }

  async GetKycForAdmin() {
    const kycList: any = await database.GetKycForAdmin()
    console.log("list is: ", kycList)
    if (!kycList[0]) return false
    return kycList

  }

  async GetPromocodeListForAdmin() {
    const promocodeList: any = await database.GetPromocodeListForAdmin()
    console.log('promo list is: ', promocodeList);
    if (!promocodeList[0]) return false
    return promocodeList
  }


  async GetUsedPromocodeListForAdmin() {
    const promocodeList: any = await database.GetUsedPromocodeListForAdmin()
    console.log('promo list is: ', promocodeList);
    if (!promocodeList[0]) return false
    return promocodeList
  }

  async DeleteUsedPromocodesAsAdmin() {
    await database.DeleteUsedPromocodeListAsAdmin()
    const codeList: any = await database.GetUsedPromocodeListForAdmin()
    if (codeList[0]) return false
    return true
  }


  async GetDomainListForAdmin() {
    const list: any = await domainList.find()
    console.log('domainList is: ', list);
    if (!list.length) return false
    return list
  }

  async GetNewsListForAdmin() {
    const newsList: any = await database.GetNewsForAdmin()
    console.log('found news: ', newsList);
    if (!newsList[0]) return false
    return newsList[0]
  }

}

export default new adminService()