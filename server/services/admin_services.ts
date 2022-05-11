import domainList from '../models/Domain_list.model'
import userPromocode from '../models/Promocodes.model'
import usedPromoList from '../models/Used_promocodes.model'
import newsList from '../models/News_list.model'
import userKyc from '../models/KYC.model'
import baseUserData from '../models/User_base_data.model'
import userParams from '../models/User_params.model'
import staffParams from '../models/Staff_params.model'
import TokenModel from '../models/Token.model'
import userBase from '../models/User_base_data.model'
import userAction from '../models/User_info_for_action.model'
import userLogs from '../models/User_logs.model'
import userBalance from '../models/User_balance.model'
import userWallet from '../models/user_wallet.model'
import depositHistory from 'models/Deposit_history.model'
import internalHistory from '../models/Internal_history.model'
import withdrawalHistory from '../models/Withdrawal_history.model'
import swapHistory from '../models/Swap_history.model'
import depositWallets from '../models/deposit_address.model'
import staffLogs from '../models/Staff_logs.model'
import staffWallet from '../models/staff_wallet.model'

async function deleteHelper(modelName: any, paramValue: string) {
  if (!modelName) return
  await modelName.deleteMany({ userId: paramValue })
  return
}

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

  async editStaffWallets(walletList: any, staffId: string) {
    const getWallets: any = await staffWallet.find({
      staffId: staffId
    })
    console.log('received getWallets is => ', getWallets.length);
    if (!getWallets.length) return false

    for (let i = 0; i <= walletList.length - 1; i++) {
      console.log('cur transfer_object item is => ', walletList[i]);
      let dataObj = {
        coinName: walletList[i].coinName,
        walletAddress: walletList[i].coinAddress,
      }
      console.log('cur data obj is => ', dataObj);
      await staffWallet.findOneAndUpdate(
        { staffId: staffId },
        dataObj
      )
    }

    const updatedWallets: any = await staffWallet.find({
      staffId: staffId
    })
    console.log('received getWallets is => ', updatedWallets.length);
    if (!updatedWallets.length) return false
    return true

  }

  async fullUserDelete(userId: string) {
    const userToDelete: any = await userBase.findById({ _id: userId })
    console.log('found user userToDelete => ', userToDelete);
    if (!userToDelete) return false

    const params: any = await userParams.findOne({ userId: userId })
    console.log('found user params => ', params);
    if (!params) return false

    const actionData: any = await userAction.findOne({ userId: userId })
    console.log('found user actionData => ', actionData);
    if (!actionData) return false

    const logInfo: any = await userLogs.find({ userEmail: userToDelete.email })
    console.log('found  logInfo => ', logInfo.length);
    if (!logInfo.length) return false

    const balanceList: any = await userBalance.find({ userId: userId })
    console.log('found  balances => ', balanceList.length);
    if (!balanceList.length) return false

    const walletList: any = await userWallet.find({ userId: userId })
    console.log('found  walletList => ', walletList.length);
    if (!walletList.length) return false

    const withdrHist: any = await withdrawalHistory.find({ userId: userId })
    console.log('found  withdrHist => ', withdrHist.length);
    if (!withdrHist.length) return false

    const swapHist: any = await swapHistory.find({ userId: userId })
    console.log('found  swapHist => ', swapHist.length);
    if (!swapHist.length) return false

    const depHistory: any = await depositHistory.find({ userId: userId })
    console.log('found  depoHistory => ', depHistory.length);
    if (!depHistory.length) return false

    const intenrHistory: any = await internalHistory.find({ userId: userId })
    console.log('found  intenrnalHistory => ', intenrHistory.length);
    if (!intenrHistory.length) return false

    const depWallets: any = await depositWallets.find({ userId: userId })
    console.log('found  depWallets => ', depWallets.length);
    if (!depWallets.length) return false

    const isStaffParams: any = await staffParams.findOne({ staffUserEmail: userToDelete.email })
    console.log('found  isStaffParams => ', isStaffParams);

    if (isStaffParams) {
      const staffLogList: any = await staffLogs.find({
        userId: userId
      })
      console.log('found  isStaffParams => ', staffLogList.length);
      if (!staffLogList.length) return false

      const getStaffWallets: any = await staffWallet.find({
        staffId: userId
      })
      console.log('received getWallets is => ', getStaffWallets.length);
      if (!getStaffWallets.length) return false

      await staffParams.findOneAndDelete({
        staffUserEmail: userToDelete.email
      })
      await deleteHelper(getStaffWallets, userId)
      await deleteHelper(staffLogs, userId)
    }
    await deleteHelper(depositWallets, userId)
    await deleteHelper(internalHistory, userId)
    await deleteHelper(depositHistory, userId)
    await deleteHelper(withdrawalHistory, userId)
    await deleteHelper(swapHistory, userId)
    await deleteHelper(userWallet, userId)
    await deleteHelper(userBalance, userId)
    await deleteHelper(userLogs, userId)

    await userAction.findOneAndDelete({
      userId: userId
    })
    await userParams.findOneAndDelete({
      userId: userId
    })
    await userBase.findOneAndDelete({
      _id: userId
    })
    return true
  }





}

export default new adminService()