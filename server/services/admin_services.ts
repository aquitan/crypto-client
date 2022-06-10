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
import depositHistory from '../models/Deposit_history.model'
import internalHistory from '../models/Internal_history.model'
import withdrawalHistory from '../models/Withdrawal_history.model'
import swapHistory from '../models/Swap_history.model'
import depositWallets from '../models/deposit_address.model'
import staffLogs from '../models/Staff_logs.model'
import staffWallet from '../models/staff_wallet.model'
import secureDeal from '../models/secure_deal.model'
import staffGroup from '../models/Staff_group.model'
import staffGroupUserList from '../models/staff_group_user_list.model'
import staffServices from './staff_services'
import recruiterModel from '../models/recruiter.model'
import recruiterOwnUsers from '../models/recruiter_own_users.model'
import recruiterWallet from '../models/recruiter_wallet.model'


async function deleteHelper(modelName: any, paramValue: string) {
  if (!modelName) return
  await modelName.deleteMany({ userId: paramValue })
  return
}

class adminService {

  async GetUsersList(skipValue: number, limitValue: number) {
    const usersList: any = await baseUserData.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log('user list: ', usersList);

    let dataArray: any = []

    for (let i = 0; i <= usersList.length - 1; i++) {
      let curId: string = usersList[i].id.toString()
      const kycParams: any = await userParams.findOne({ userId: curId })
      if (!kycParams) return false
      let dataObject = {
        userId: usersList[i].id,
        registerDate: usersList[i].dateOfEntry,
        userName: usersList[i].name,
        userEmail: usersList[i].email,
        userStatus: kycParams.isStaff,
        kycStatus: kycParams.kycStatus,
        userDomain: usersList[i].domainName
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

  async GetKycForAdmin(skipValue: number, limitValue: number) {
    const kycList: any = await userKyc.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log("list is: ", kycList.length)
    if (!kycList) return false
    if (!kycList.length) return 'empty set'
    return kycList
  }

  async GetPromocodeListForAdmin(skipValue: number, limitValue: number) {
    const promocodeList: any = await userPromocode.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log('service code list is: ', promocodeList);
    if (!promocodeList.length) return false
    return promocodeList
  }


  async GetUsedPromocodeListForAdmin(skipValue: number, limitValue: number) {
    const list: any = await usedPromoList.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log('service code list is: ', list);
    if (!list.length) return false
    return list
  }

  async DeleteUsedPromocodesAsAdmin() {
    const codeList: any = await usedPromoList.find()
    console.log('service code list is: ', codeList.length);
    if (!codeList.length) return false
    await usedPromoList.deleteMany()
    return true
  }


  async GetDomainListForAdmin() {
    const list: any = await domainList.find()
    console.log('domainList is: ', list);
    if (!list.length) return 'empty list'
    if (!list) return false

    let domainListArray: any = []
    for (let i = 0; i <= list.length - 1; i++) {
      console.log('domain name is => ', list[i].fullDomainName);
      let obj = {
        domainName: list[i].fullDomainName,
        domainId: list[i].id
      }
      domainListArray.push(obj)
    }
    console.log('current domain list is: ', domainListArray);
    return domainListArray
  }

  async GetNewsListForAdmin(skipValue: number, limitValue: number) {
    const list: any = await newsList.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log('found news: ', newsList);
    if (!list) return false
    if (!list.length) return 'empty set'
    return list
  }

  async editStaffWallets(wallet: string, coinName: string, staffId: string) {
    const getWallets: any = await staffWallet.find({
      staffId: staffId
    })
    console.log('received getWallets is => ', getWallets.length);
    if (!getWallets.length) return false

    for (let i = 0; i < getWallets.length - 1; i++) {
      if (getWallets[i].coinName === coinName) {
        await staffWallet.findOneAndUpdate(
          {
            coinName: coinName,
            staffId: staffId
          },
          { walletAddress: wallet }
        )
      }
    }

    const updatedWallet: any = await staffWallet.findOne({
      walletAddress: wallet
    })
    console.log('received getWallets is => ', updatedWallet);
    if (!updatedWallet || updatedWallet.walletAddress !== wallet) return false
    return updatedWallet.walletAddress

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
    // if (!balanceList.length) return false

    const walletList: any = await userWallet.find({ userId: userId })
    console.log('found  walletList => ', walletList.length);
    // if (!walletList.length) return false

    const withdrHist: any = await withdrawalHistory.find({ userId: userId })
    console.log('found  withdrHist => ', withdrHist.length);
    // if (!withdrHist.length) return false

    const swapHist: any = await swapHistory.find({ userId: userId })
    console.log('found  swapHist => ', swapHist.length);
    // if (!swapHist.length) return false

    const depHistory: any = await depositHistory.find({ userId: userId })
    console.log('found  depoHistory => ', depHistory.length);
    // if (!depHistory.length) return false

    const intenrHistory: any = await internalHistory.find({ userId: userId })
    console.log('found  intenrnalHistory => ', intenrHistory.length);
    // if (!intenrHistory.length) return false

    const depWallets: any = await depositWallets.find({ userId: userId })
    console.log('found  depWallets => ', depWallets.length);
    // if (!depWallets.length) return false

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
      // if (!getStaffWallets.length) return false

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

  async getSecureDealHistoryAsAdmin(skipValue: number, limitValue: number) {
    const history: any = await secureDeal.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log('history is => ', history.length);

    if (!history) return false
    if (!history.length) return 'empty set'
    return history
  }

  async getStaffWalletForAdmin(skipValue: number, limitValue: number) {
    const getWallets: any = await staffWallet.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log('received getWallets is => ', getWallets.length);
    if (!getWallets) return 'empty set'
    if (!getWallets.length) return false
    return getWallets
  }

  async getGroupListForAdmin(skipValue: number, limitValue: number) {
    const getList: any = await staffGroupUserList.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    console.log('received getList => ', getList);
    if (!getList) return false
    if (!getList.length) return 'empty set'

    let dataArray = []
    for (let i = 0; i <= getList.length - 1; i++) {
      console.log('cur elem is: ', getList[i]);

      const receivedData: any = await staffGroup.findById({ _id: getList[i].groupId })
      const userEmail: any = await baseUserData.findById({ _id: receivedData.creatorId })
      console.log('received group object => ', receivedData);
      console.log(' user => ', userEmail);

      let dataObj = {
        groupData: receivedData,
        groupUsers: getList[i].staffEmailList,
        ownerEmail: userEmail.email
      }
      dataArray.push(dataObj)
    }
    console.log(' staff groups list is => ', dataArray);
    if (!dataArray.length) return 'empty set'
    return dataArray
  }

  async deleteUserFromGroup(groupId: string, staffEmail: string) {
    const getList: any = await staffGroupUserList.findOne({
      groupId: groupId
    })
    console.log('received getList => ', getList);
    if (!getList) return false

    let dataArray = []
    for (let x = 0; x <= getList.staffEmailList.length - 1; x++) {
      if (getList.staffEmailList[x] !== staffEmail) {
        console.log('received group email is => ', getList.staffEmailList[x]);
        dataArray.push(getList.staffEmailList[x])
      }
    }

    console.log(' staff groups list is => ', dataArray);
    if (!dataArray.length) return false

    await staffGroupUserList.findOneAndUpdate(
      { groupId: groupId },
      { staffEmailList: dataArray }
    )
    return true
  }

  async deleteGroup(groupId: string) {
    const getGroup: any = await staffGroup.findOne({
      _id: groupId
    })
    console.log('getGroup => ', getGroup);
    if (!getGroup) return false

    const groupUserList: any = await staffGroupUserList.findOne({ groupId: groupId })
    console.log('groupUserList => ', groupUserList);
    if (!groupUserList) return false
    await staffGroupUserList.deleteOne({
      groupId: groupId
    })
    const updatedUsersList: any = await staffGroupUserList.findOne({ groupId: groupId })
    console.log('updatedUsersList => ', updatedUsersList);
    if (updatedUsersList) return false

    await staffGroup.deleteOne({
      _id: groupId
    })
    const updatedList: any = await staffGroup.findOne({
      _id: groupId
    })
    if (updatedList) return false
    return true
  }

  async addNewRecruiterUser(transferObject: any) {
    const staffUser: any = await baseUserData.findOne({ email: transferObject.staffEmail })
    if (!staffUser) return false

    const candidate: any = await recruiterModel.findOne({ recruiterId: staffUser.id })
    console.log('candidate => ', candidate);
    if (candidate) return 'user already added'
    await recruiterModel.create({
      recruiterEmail: transferObject.staffEmail,
      recruiterId: staffUser.id,
      permissionDate: transferObject.currentDate,
      accessFrom: transferObject.adminId,
      currentFee: transferObject.recruiterFee,
    })

    const checkRecruiter: any = await recruiterModel.findOne({ recruiterId: staffUser.id })
    console.log('checkRecruiter => ', checkRecruiter);
    if (!checkRecruiter) return false
    return true
  }

  async getRecruiterList(skipValue: number, limitValue: number) {
    const list: any = await recruiterModel.
      find().
      skip(skipValue).
      limit(limitValue).
      exec()
    if (!list.length) return 'empty set'
    if (!list) return false
    return list
  }

  async addStaffToRecruiter(staffEmail: string, recruiterFee: number, recruiterId: string) {
    const validateUser: boolean = await staffServices.validateStaffEmail(staffEmail)
    if (!validateUser) return false

    const staffSettings: any = await staffParams.findOne({ staffUserEmail: staffEmail })
    console.log('staffSettings => ', staffSettings);
    if (!staffSettings) return false



    const staffFee: number = staffSettings.paymentFee - recruiterFee
    console.log('updated staff fee is => ', staffFee);
    await staffParams.findOneAndUpdate(
      { staffUserEmail: staffEmail },
      { paymentFee: staffFee }
    )

    await recruiterOwnUsers.create({
      staffEmail: staffEmail,
      staffFee: staffFee,
      recruiterFee: recruiterFee,
      recruiterId: recruiterId
    })

    const OwnUsers = await recruiterOwnUsers.findOne({ staffEmail: staffEmail })
    console.log('OwnUsers => ', OwnUsers);
    if (!OwnUsers) return false

    const updatedParams: any = await staffParams.findOne({ staffUserEmail: staffEmail })
    console.log('updatedParams => ', updatedParams);
    if (updatedParams.paymentFee !== OwnUsers.staffFee) {
      console.log('wrong fee in staff params');
      return false
    }
    if (updatedParams.paymentFee !== staffFee || !updatedParams) return false

    return true
  }

  async getRecruiterDetail(recruiterId: string) {

    const getRecruiter: any = await recruiterModel.findOne({ recruiterId: recruiterId })
    console.log('getRecruiter => ', getRecruiter);
    if (!getRecruiter) return false

    const getOwnUsers: any = await recruiterOwnUsers.find({ recruiterId: recruiterId })
    console.log('getOwnUsers => ', getOwnUsers);
    if (!getOwnUsers) return false
    let dataObj = {
      recruiter: getRecruiter,
      staffList: getOwnUsers
    }
    console.log('dataObj => ', dataObj);
    return dataObj
  }

  async updateRecruiterFee(recruiterId: string, updatedFee: number) {
    const foundRecruiter: any = await recruiterModel.findOne({ recruiterId: recruiterId })
    console.log('foundRecruiter => ', foundRecruiter);
    if (!foundRecruiter) return false

    const staffUpdatedFee: number = 80 - updatedFee

    console.log('staffUpdatedFee => ', staffUpdatedFee);


    const getOwnUsers: any = await recruiterOwnUsers.find({ recruiterId: recruiterId })
    console.log('getOwnUsers => ', getOwnUsers);
    if (!getOwnUsers) return false
    if (!getOwnUsers.length) return false

    for (let i = 0; i <= getOwnUsers.length - 1; i++) {
      const foundStaff: any = await staffParams.findOne({ staffUserEmail: getOwnUsers[i].staffEmail })
      console.log('foundStaff => ', foundStaff);
      if (!foundStaff) return false

      await staffParams.findOneAndUpdate(
        { staffUserEmail: getOwnUsers[i].staffEmail },
        { paymentFee: staffUpdatedFee }
      )

      await recruiterOwnUsers.findOneAndUpdate(
        { staffEmail: getOwnUsers[i].staffEmail },
        {
          staffFee: staffUpdatedFee,
          recruiterFee: updatedFee
        }
      )

      const updatedStaffFee: any = await staffParams.findOne({ staffUserEmail: getOwnUsers[i].staffEmail })
      console.log('updatedStaffFee => ', updatedStaffFee.paymentFee);
      if (updatedStaffFee.paymentFee !== staffUpdatedFee) return false
    }


    await recruiterModel.findOneAndUpdate(
      { recruiterId: recruiterId },
      { currentFee: updatedFee, }
    )

    const updatedRecruiterFee: any = await recruiterModel.findOne({ recruiterId: recruiterId })
    console.log('foundRecruiter => ', updatedRecruiterFee);
    if (updatedRecruiterFee.currentFee !== updatedFee) return false

    return true
  }

  async createRecruiterWallet(walletList: any, recruiterId: string) {

    const checkWallets: any = await recruiterWallet.find({
      recruiterId: recruiterId
    })
    console.log('checkWallets is => ', checkWallets.length);
    if (checkWallets.length) return false

    for (let i = 0; i <= walletList.length - 1; i++) {
      console.log('cur walletList item is => ', walletList[i]);
      let dataObj = {
        coinName: walletList[i].coinName,
        walletAddress: walletList[i].coinAddress,
        recruiterId: recruiterId
      }
      console.log('cur data obj is => ', dataObj);
      await recruiterWallet.create(dataObj)
    }

    const getWallets: any = await recruiterWallet.find({
      recruiterId: recruiterId
    })
    console.log('received getWallets is => ', getWallets.length);
    if (!getWallets.length) return false

    return true
  }

  async getRecruiterWallets(recruiterId: string) {
    const getWallets: any = await recruiterWallet.find({
      recruiterId: recruiterId
    })
    console.log('received getWallets is => ', getWallets.length);
    if (!getWallets) return false

    return getWallets
  }

  async editRecruiterWallet(wallet: string, coinName: string, recruiterId: string) {
    const getWallets: any = await recruiterWallet.find({
      recruiterId: recruiterId
    })
    console.log('received getWallets is => ', getWallets.length);
    if (!getWallets.length) return false

    for (let i = 0; i < getWallets.length - 1; i++) {
      if (getWallets[i].coinName === coinName) {
        await recruiterWallet.findOneAndUpdate(
          {
            coinName: coinName,
            recruiterId: recruiterId
          },
          { walletAddress: wallet }
        )
      }
    }

    const updatedWallet: any = await staffWallet.findOne({
      walletAddress: wallet
    })
    console.log('received getWallets is => ', updatedWallet);
    if (!updatedWallet || updatedWallet.walletAddress !== wallet) return false
    return true

  }

  async deleteStaffFromRecruiter(staffId: string, staffEmail: string, recruiterId: string) {
    const getOwnUsers: any = await recruiterOwnUsers.findOne(
      {
        userEmail: staffEmail,
        recruiterId: recruiterId
      })
    console.log('getOwnUsers => ', getOwnUsers);
    if (!getOwnUsers) return false

    await recruiterOwnUsers.deleteOne({ userEmail: staffEmail })
    const getStaff: any = await recruiterOwnUsers.findOne({ userEmail: staffEmail })
    if (getStaff) return false
    await staffParams.findOneAndUpdate(
      { staffId: staffId },
      { paymentFee: 80 }
    )
    const updatedStaffParams: any = await staffParams.findOne({ staffId: staffId })
    if (!updatedStaffParams || updatedStaffParams.paymentFee !== 80) return false
    return true

  }

  async deleteRecruiterUser(recruiterId: string) {
    const foundRecruiter: any = await recruiterModel.findOne({ recruiterId: recruiterId })
    console.log('foundRecruiter => ', foundRecruiter);
    if (!foundRecruiter) return false

    const getOwnUsers: any = await recruiterOwnUsers.find({ recruiterId: recruiterId })
    console.log('getOwnUsers => ', getOwnUsers);

    if (!getOwnUsers) return false
    if (getOwnUsers.length) {

      for (let i = 0; i <= getOwnUsers.length - 1; i++) {
        const staffUser: any = await staffParams.findOne({ staffUserEmail: getOwnUsers[i].userEmail })
        console.log('staffUser => ', staffUser);
        if (!staffUser) return false
        await staffParams.findOneAndUpdate(
          { staffUserEmail: getOwnUsers[i].userEmail },
          { paymentFee: 80 }
        )
        const updatedStaffFee: any = await staffParams.findOne({ staffUserEmail: getOwnUsers[i].userEmail })
        console.log('updatedStaffFee => ', updatedStaffFee);
        if (!updatedStaffFee || updatedStaffFee.paymentFee !== 80) return false

        await recruiterOwnUsers.deleteMany({ recruiterId: recruiterId })
      }
    }

    await recruiterWallet.deleteMany({ recruiterId: recruiterId })

    const getUpdatedOwnUsers: any = await recruiterOwnUsers.find({ recruiterId: recruiterId })
    console.log('getUpdatedOwnUsers => ', getUpdatedOwnUsers);
    if (getOwnUsers.length) return false

    const getUpdatedWallet: any = await recruiterWallet.find({ recruiterId: recruiterId })
    console.log('getUpdatedWallet => ', getUpdatedWallet);
    if (getOwnUsers.length) return false

    await recruiterModel.deleteOne({ recruiterId: recruiterId })

    const checkRecruiter: any = await recruiterModel.findOne({ recruiterId: recruiterId })
    console.log('foundRecruiter => ', checkRecruiter);
    if (checkRecruiter) return false

    return true
  }

}

export default new adminService()