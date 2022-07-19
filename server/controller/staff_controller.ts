import * as express from 'express'
import staffService from '../services/staff_services'
import adminService from '../services/admin_services'
import telegram from '../api/telegram_api'
import UserServices from '../services/user_services'
import DOMAIN_INFO from '../interface/domain_info.interface'
import CREATE_USER_AS_STAFF from 'interface/create_user_as_staff.interface'
import CREATE_CUSTOM_ERROR from '../interface/create_custom_error.interface'
import NEWS_INFO from '../interface/news_info.interface'
import DEPOSIT_HISTORY from '../interface/deposit_history.interface'
import WITHDRAWAL_HISTORY from '../interface/withdrawal_history.interface'
import INTERNAL_HISTORY from '../interface/internal_history.interface'
import ApiError from '../exeptions/api_error'
import moneyService from '../services/money_service'
import bodyValidator from '../api/body_validator'
import TRADING_COIN_RATE_UPDATE from '../interface/trading_rate_update.interface'
import Notification from '../services/notificationServices'
import CHAT_DATA from '../interface/chat_data.interface'
import SECURE_CHAT_DATA from 'interface/secure_deal_chat.interface'
import CryptoService from '../services/crypto_services'


class StaffController {

  async staffDashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user_id: string = req.body.userId
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (rootAccess || adminPermission) {
        const result: any = await adminService.DashboardInfo()
        console.log('result is: ', result);
        if (!result) return res.status(400).json({ message: 'rejected' })
        return res.status(200).json({ message: 'OK', data: result })
      }
      if (staffPermission) {
        const result: any = await staffService.staffDashboardInfo(user_id)
        console.log('result is: ', result);
        if (!result) return res.status(400).json({ message: 'wrong data' })
        return res.status(200).json({ message: 'OK', data: result })
      }

      return res.status(500).json({ message: 'internal server error' })

    } catch (e) {
      next(e)
    }
  }

  async usersList(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    const staffId: string = req.body.staffId
    const staffEmail: string = req.body.staffEmail
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission) {
        const usersList: any = await adminService.GetUsersList(skipValue, limitValue)
        if (!usersList) throw ApiError.ServerError()
        return res.status(200).json({ usersList })

      }
      if (staffPermission) {
        const usersList: any = await staffService.GetUsersList(staffId, staffEmail, skipValue, limitValue)
        if (!usersList) throw ApiError.ServerError()
        return res.status(200).json({ usersList })
      }

      return res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async userDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user_id: string = req.params.id
    try {
      const user: any = await staffService.GetUserDetail(user_id)
      console.log('found user: ', user)
      if (!user) return res.status(400).json({ message: 'wrong data' })

      return res.status(200).json({ user: user, message: 'ok' })
    } catch (e) {
      next(e)
    }
  }


  // async changeUserDomain(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   const user_id: string = req.body.
  //   try {
  //     const user: any = await staffService.GetUserDetail(user_id)
  //     console.log('found user: ', user)
  //     if (!user) return res.status(400).json({ message: 'wrong data' })

  //     return res.status(200).json({ user: user, message: 'ok' })
  //   } catch (e) {
  //     next(e)
  //   }
  // }


  async getIpForMatch(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { ipAddress } = req.body
      console.log('req body: ', req.body);

      if (!ipAddress) {
        return res.status(400).json({
          message: 'wrong data',
          status: 'rejected'
        })
      }

      const matchUsers: any = await staffService.getUserForIpMatch(ipAddress)
      if (matchUsers === false) {
        return res.status(200).json({
          matchList: false,
          status: 'complete'
        })
      }

      return res.status(200).json({
        matchList: matchUsers,
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async kycList(req: express.Request, res: express.Response, next: express.NextFunction) {

    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    const staffEmail: string = req.body.staffEmail
    const staffId: string = req.body.staffId
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {

      if (adminPermission || rootAccess) {
        const usersKycList: any = await adminService.GetKycForAdmin(skipValue, limitValue)
        if (!usersKycList) throw ApiError.ServerError()
        return res.status(200).json({ usersKycList: usersKycList })

      }
      if (staffPermission) {
        const usersKycList: any = await staffService.GetKycForStaff(staffId, staffEmail, skipValue, limitValue)
        if (!usersKycList) throw ApiError.ServerError()
        return res.status(200).json({ usersKycList: usersKycList })
      }

      return res.status(403).json({
        message: 'permission denied',
        status: 'rejected'
      })

    } catch (e) {
      next(e)
    }
  }

  async changeKycStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { status, staffId, staffEmail, userEmail, userId, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        const result: boolean = await staffService.changeKycStatusAsStaff(status, userId)
        console.log('operation result is: ', result);
        if (!result) throw ApiError.ServerError()

        return res.status(202).json({ message: 'kyc status was changed' })
      }

      const result: boolean = await staffService.changeKycStatusAsStaff(status, userId)
      console.log('operation result is: ', result);
      if (!result) throw ApiError.ServerError()

      await telegram.sendMessageByStaffActions(staffEmail, `изменил статус ${userEmail} на  ${status} `, domainName)
      await staffService.saveStaffLogs(staffEmail, ` изменил статус ${userEmail} на  ${status} `, domainName, staffId)

      return res.status(202).json({ message: 'kyc status was changed' })

    } catch (e) {
      next(e)
    }
  }


  async deleteKyc(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { staffId, staffEmail, userId, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        const result: boolean = await staffService.DeleteKyc(userId)
        console.log('operation result is: ', result);
        if (!result) throw ApiError.ServerError()

        return res.status(202).json({ message: 'kyc was delete' })
      }

      const result: boolean = await staffService.DeleteKyc(userId)
      console.log('operation result is: ', result);
      if (!result) throw ApiError.ServerError()

      await telegram.sendMessageByStaffActions(staffEmail, ` удалил KYC юзера ${userEmail} на `, domainName)
      await staffService.saveStaffLogs(staffEmail, ` удалил KYC юзера ${userEmail} `, domainName, staffId)

      return res.status(202).json({ message: 'kyc was delete' })
    } catch (e) {
      next(e)
    }
  }

  async changeUserDomain(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: string = req.body.isAdmin
    const updatedDomain: string = req.body.updatedDomain
    const userEmail: string = req.body.userEmail
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission) {
        const result: boolean = await staffService.changeUserDomain(userEmail, updatedDomain)
        if (!result) throw ApiError.ServerError()

        return res.status(202).json(result)
      }
      return res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async updateChatBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { staffId, staffEmail, chatStatus, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        const result: boolean | string = await staffService.updateChatBanForUser(userEmail, chatStatus)
        if (!result) throw ApiError.ServerError()

        return res.status(202).json(result)
      }
      const result: boolean | string = await staffService.updateChatBanForUser(userEmail, chatStatus)
      if (!result) throw ApiError.ServerError()

      await staffService.saveStaffLogs(staffEmail, ` поменял статус чата юзера ${userEmail} на ${chatStatus}`, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` поменял статус чата юзера ${userEmail} на ${chatStatus}`, domainName)
      return res.status(202).json(result)


    } catch (e) {
      next(e)
    }
  }


  async updateUserError(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { staffId, staffEmail, curError, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        const result: boolean | string = await staffService.UpdateUserError(userEmail, curError)
        if (!result) throw ApiError.ServerError()

        return res.status(202).json(result)
      }
      const result: boolean | string = await staffService.UpdateUserError(userEmail, curError)
      if (!result) throw ApiError.ServerError()

      await staffService.saveStaffLogs(staffEmail, ` поменял ошибку пользователя ${userEmail} на ${curError}`, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` поменял ошибку пользователя ${userEmail} на ${curError}`, domainName)
      return res.status(202).json(result)
    } catch (e) {
      next(e)
    }
  }

  async updateDepositFee(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId, staffId, depositFee, staffEmail, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess) {
        const result: boolean = await staffService.UpdateDepositFee(userId, depositFee)
        if (!result) {
          console.log('error');
          return res.status(400).json({ message: 'rejected' })
        }
        return res.status(202).json({ message: 'ok' })
      }
      const result: boolean = await staffService.UpdateDepositFee(userId, depositFee)
      if (result === false) {
        console.log('error');
        return res.status(400).json({ message: 'wrong data' })
      }
      await staffService.saveStaffLogs(staffEmail, ` изменил комиссию ${userEmail} при пополнении на ${depositFee} `, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` изменил комиссию ${userEmail} при пополнении на ${depositFee} `, domainName)
      return res.status(202).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }


  async updatePremiumStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (rootAccess) {
        const result: boolean = await staffService.UpdatePremiumStatus(userId, status)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      } else {
        const result: boolean = await staffService.UpdatePremiumStatus(userId, status)
        if (!result) throw ApiError.ServerError()

        await staffService.saveStaffLogs(staffEmail, ` изменил премиум статус ${userEmail} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил премиум статус ${userEmail} `, domainName)
        return res.status(202).json({ message: 'ok' })
      }

    } catch (e) {
      next(e)
    }
  }

  async updateSwapBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {

      if (rootAccess) {
        const result: boolean = await staffService.UpdateSwapBan(userId, status)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      }
      const result: boolean = await staffService.UpdateSwapBan(userId, status)
      if (!result) throw ApiError.ServerError()

      await staffService.saveStaffLogs(staffEmail, ` изменил бан свапов для ${userEmail} на  ${status} `, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` изменил бан свапов для  ${userEmail} на  ${status} `, domainName)
      return res.status(202).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async updateInternalBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (rootAccess) {
        const result: boolean = await staffService.UpdateInternalBan(userId, status)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      } else {

        const result: boolean = await staffService.UpdateInternalBan(userId, status)
        if (!result) throw ApiError.ServerError()

        await staffService.saveStaffLogs(staffEmail, ` изменил бан внутренних транзакций для ${userEmail} на  ${status} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил бан внутренних транзакций для  ${userEmail} на  ${status} `, domainName)
        return res.status(202).json({ message: 'ok' })
      }
    } catch (e) {
      next(e)
    }
  }

  async updateFullBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (rootAccess) {
        const result: boolean = await staffService.UpdateFullBan(userId, status)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      } else {
        const result: boolean = await staffService.UpdateFullBan(userId, status)
        if (!result) throw ApiError.ServerError()

        await staffService.saveStaffLogs(staffEmail, ` изменил статус полного бана для ${userEmail} на  ${status} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил статус полного бана для  ${userEmail} на  ${status} `, domainName)
        return res.status(202).json({ message: 'ok' })
      }
    } catch (e) {
      next(e)
    }
  }

  async updateStaffStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { status, staffEmail, userEmail, domainName, currentDate } = req.body
    const rootAccess: boolean = req.body.rootAccess
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    let staffId: string = req.body.staffId

    const validData: boolean = await bodyValidator(req.body, 9)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (rootAccess) {
        staffId = process.env.SUPER_ID
        const result: boolean = await adminService.UpdateStaffStatus(process.env.SUPER_1_LOGIN, userEmail, currentDate, status)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      }

      if (adminPermission || staffPermission) {
        const result: boolean = await adminService.UpdateStaffStatus(staffEmail, userEmail, currentDate, status)
        if (!result) throw ApiError.ServerError()

        await staffService.saveStaffLogs(staffEmail, ` изменил стафф права пользователя ${userEmail} на  ${status} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил стафф права пользователя  ${userEmail} на  ${status} `, domainName)
        return res.status(202).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async updateStaffSupportName(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { staffId, updatedName, staffEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (rootAccess) {
        const result: boolean = await staffService.UpdateStaffSupportName(process.env.SUPER_1_LOGIN, updatedName)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })

      } else {
        const result: boolean = await staffService.UpdateStaffSupportName(staffEmail, updatedName)
        if (!result) throw ApiError.ServerError()
        await staffService.saveStaffLogs(staffEmail, ` изменил имя в саппорте на  ${updatedName} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил имя в саппорте на  ${updatedName} `, domainName)
        return res.status(202).json({ message: 'ok' })
      }


    } catch (e) {
      next(e)
    }
  }

  async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userEmail: string = req.body.userEmail
    const userId: string = req.body.userId
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    if (!rootAccess) return res.status(403).json({ message: 'permission denied' })
    try {
      const result: boolean = await adminService.fullUserDelete(userId)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json({ message: `user ${userEmail} was deleted with all params` })

    } catch (e) {
      next(e)
    }
  }

  async updateDoubleDeposit(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        const result: boolean = await staffService.UpdateDoubleDepositStatus(userId, status)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      }

      const result: boolean = await staffService.UpdateDoubleDepositStatus(userId, status)
      if (!result) throw ApiError.ServerError()

      await staffService.saveStaffLogs(staffEmail, ` изменил статус даблдепов пользователя ${userEmail} на  ${status} `, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` изменил статус даблдепов пользователя  ${userEmail} на  ${status} `, domainName)
      return res.status(202).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async clearMatchIpList(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { staffId, staffEmail, userEmail, domainName, ipAddress } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        const result: boolean = await staffService.ClearMatchIpUsers(process.env.SUPER_1_LOGIN, ipAddress)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })

      }
      const result: boolean = await staffService.ClearMatchIpUsers(userEmail, ipAddress)
      if (!result) throw ApiError.ServerError()

      await staffService.saveStaffLogs(staffEmail, ` очистил повторяющиеся IP пользователя ${userEmail}`, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` очистил повторяющиеся IP пользователя  ${userEmail} `, domainName)
      return res.status(202).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async createNewUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    const rootAccess: boolean = req.body.rootAccess
    let transfer_object: CREATE_USER_AS_STAFF = {
      staffEmail: req.body.staffEmail,
      staffId: req.body.staffId,
      userEmail: req.body.userEmail,
      password: req.body.password,
      domainName: req.body.domainName,
      currentDate: req.body.currentDate,
      name: req.body.name
    }

    const validData: boolean = await bodyValidator(req.body, 8)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (!rootAccess) {
        transfer_object.staffId = process.env.SUPER_ID
        transfer_object.staffEmail = process.env.SUPER_1_LOGIN
        const result: boolean = await staffService.CreateUserAsStaff(transfer_object)
        if (!result) throw ApiError.ServerError()
        return res.status(201).json({ message: 'ok' })
      }

      const result: boolean = await staffService.CreateUserAsStaff(transfer_object)
      if (!result) throw ApiError.ServerError()

      await telegram.sendMessageByStaffActions(transfer_object.staffEmail, ` создал пользователя ${transfer_object.userEmail} `, transfer_object.domainName)
      await staffService.saveStaffLogs(transfer_object.staffEmail, ` создал пользователя ${transfer_object.userEmail} `, transfer_object.domainName, transfer_object.staffId)
      return res.status(201).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async createDomain(req: express.Request, res: express.Response, next: express.NextFunction) {

    const rootAccess: boolean = req.body.rootAccess
    let object_to_send: DOMAIN_INFO = {
      staffEmail: req.body.staffEmail,
      fullDomainName: req.body.fullDomainName,
      domainName: req.body.domainName,
      companyAddress: req.body.companyAddress,
      companyPhoneNumber: req.body.companyPhoneNumber,
      companyEmail: req.body.companyEmail,
      companyOwnerName: req.body.companyOwnerName,
      companyYear: req.body.companyYear,
      companyCountry: req.body.companyCountry,
      showNews: req.body.showNews,
      doubleDeposit: req.body.doubleDeposit,
      depositFee: req.body.depositFee,
      minDepositSum: req.body.minDepositSum,
      minWithdrawalSum: req.body.minWithdrawalSum,
      currencySwapFee: req.body.currencySwapFee,
      designName: req.body.designName,
      errorList: {
        verif_document: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.verif_document.errorName,
          title: req.body.errorList.verif_document.title,
          text: req.body.errorList.verif_document.text,
          button: req.body.errorList.verif_document.button
        },
        verif_address: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.verif_address.errorName,
          title: req.body.errorList.verif_address.title,
          text: req.body.errorList.verif_address.text,
          button: req.body.errorList.verif_address.button,
        },
        insurance: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.insurance.errorName,
          title: req.body.errorList.insurance.title,
          text: req.body.errorList.insurance.text,
          button: req.body.errorList.insurance.button,
        },
        premium: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.premium.errorName,
          title: req.body.errorList.premium.title,
          text: req.body.errorList.premium.text,
          button: req.body.errorList.premium.button
        },
        multi_account: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.multi_account.errorName,
          title: req.body.errorList.multi_account.title,
          text: req.body.errorList.multi_account.text,
          button: req.body.errorList.multi_account.button
        }
      },
      dateOfDomainCreate: req.body.dateOfDomainCreate,
      staffId: req.body.staffId
    }

    const coinList: string[] = req.body.coinList

    for (let index in req.body) {
      if (req.body[index] === null || req.body[index] === undefined) {
        if (typeof req.body[index] === 'object') {
          for (let i in req.body[index]) {
            if (req.body[index][i] === null || req.body[index][i] === undefined) {
              return res.status(400).json({ message: 'wrong data' })
            }
          }
          return res.status(400).json({ message: 'wrong data' })
        }
      }
    }

    try {
      if (rootAccess === true) {
        object_to_send.staffId = process.env.SUPER_ID
        object_to_send.staffEmail = process.env.SUPER_1_LOGIN
      }

      const result: string | boolean = await staffService.CreateNewDomain(object_to_send, coinList)

      if (!result) return res.status(400).json({
        message: 'wrong data saving. please try one more time.'
      })
      if (result === 'error') throw ApiError.ServerError()
      // const checkTerms: boolean = await staffService.CheckDomainTerms()
      // if (!checkTerms) await staffService.addTerms(req.body.fullDomainName)

      if (!rootAccess) {
        await telegram.sendMessageByStaffActions(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName} `, req.body.domainName)
        await staffService.saveStaffLogs(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName} `, '', req.body.staffId)
      }
      return res.status(201).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }


  async getDomainDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domain_id: string = req.params.id
      console.log('current domain id is: ', domain_id);
      const result: any = await staffService.GetDomainDetail(domain_id)
      if (!result) throw ApiError.ServerError()
      return res.status(202).json({ domain_detail: result })

    } catch (e) {
      next(e)
    }
  }

  async createCustomError(req: express.Request, res: express.Response, next: express.NextFunction) {

    let obj_to_send: CREATE_CUSTOM_ERROR = {
      domain_id: req.body.domainId,
      domain_name: req.body.domainName,
      errorName: req.body.errorName,
      errorTitle: req.body.errorTitle,
      errorText: req.body.errorText,
      errorButton: req.body.errorButton
    }

    const adminPermission: boolean = req.body.isAdmin
    const staffPremission: boolean = req.body.isStaff
    let staffEmail: string = req.body.staffEmail
    let staffId: string = req.body.stafId
    const rootAccess: boolean = req.body.rootAccess


    const validData: boolean = await bodyValidator(req.body, 11)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess || adminPermission) {
        staffId = process.env.SUPER_ID
        staffEmail = process.env.SUPER_1_LOGIN

        const result: any = await staffService.CreateCustomError(obj_to_send)
        console.log('result is: ', result);
        if (!result) throw ApiError.ServerError()
        return res.status(201).json({ message: 'ok' })

      }

      if (staffPremission) {
        const result: any = await staffService.CreateCustomError(obj_to_send)
        if (!result) throw ApiError.ServerError()

        await telegram.sendMessageByStaffActions(staffEmail, ` создал кастомную ошибку `, obj_to_send.domain_name)
        await staffService.saveStaffLogs(staffEmail, ` создал новый домен ${req.body.fullDomainName}} `, obj_to_send.domain_name, staffId)
        return res.status(201).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async getAllErrors(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domainName: string = req.params.domainName
      console.log('current domain id is: ', domainName);
      const result: any = await staffService.GetDomainErrors(domainName)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ errorList: result })

    } catch (e) {
      next(e)
    }
  }


  async getErrorsByDomainName(req: express.Request, res: express.Response, next: express.NextFunction) {

    const domainName: string = req.params.domainName
    if (!req.params) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await staffService.GetErrorsByDomainName(domainName)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ errorsList: result })
    } catch (e) {
      next(e)
    }
  }

  async getDomainsList(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    let staffId: string = req.body.staffId
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess || adminPermission) {
        staffId = process.env.SUPER_ID

        const result: any = await adminService.GetDomainListForAdmin()
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }

      if (staffPermission) {
        const result: any = await staffService.GetDomainListForStaff(staffId)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }
      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async fullDomainDelete(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const domainName: string = req.body.domainName

    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (!rootAccess || !adminPermission) return res.status(403).json({ message: 'permission denied' })

      const result: boolean = await adminService.DeleteDomain(domainName)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }


  async editDomainInfo(req: express.Request, res: express.Response, next: express.NextFunction) {

    let object_to_send: DOMAIN_INFO = {
      staffEmail: req.body.staffEmail,
      fullDomainName: req.body.fullDomainName,
      domainName: req.body.domainName,
      companyAddress: req.body.companyAddress,
      companyPhoneNumber: req.body.companyPhoneNumber,
      companyEmail: req.body.companyEmail,
      companyOwnerName: req.body.companyOwnerName,
      companyYear: req.body.companyYear,
      companyCountry: req.body.companyCountry,
      showNews: req.body.showNews,
      doubleDeposit: req.body.doubleDeposit,
      depositFee: req.body.depositFee,
      minDepositSum: req.body.minDepositSum,
      minWithdrawalSum: req.body.minWithdrawalSum,
      currencySwapFee: req.body.currencySwapFee,
      designName: req.body.designName,
      errorList: {
        verif_document: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.verif_document.errorName,
          title: req.body.errorList.verif_document.title,
          text: req.body.errorList.verif_document.text,
          button: req.body.errorList.verif_document.button
        },
        verif_address: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.verif_address.errorName,
          title: req.body.errorList.verif_address.title,
          text: req.body.errorList.verif_address.text,
          button: req.body.errorList.verif_address.button,
        },
        insurance: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.insurance.errorName,
          title: req.body.errorList.insurance.title,
          text: req.body.errorList.insurance.text,
          button: req.body.errorList.insurance.button,
        },
        premium: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.premium.errorName,
          title: req.body.errorList.premium.title,
          text: req.body.errorList.premium.text,
          button: req.body.errorList.premium.button
        },
        multi_account: {
          domainName: req.body.fullDomainName,
          errorName: req.body.errorList.multi_account.errorName,
          title: req.body.errorList.multi_account.title,
          text: req.body.errorList.multi_account.text,
          button: req.body.errorList.multi_account.button
        }
      },
      dateOfDomainCreate: req.body.dateOfDomainCreate,
      staffId: req.body.staffId
    }

    const rootAccess: boolean = req.body.rootAccess

    for (let index in req.body) {
      if (req.body[index] === null || req.body[index] === undefined) {
        if (typeof req.body[index] === 'object') {
          for (let i in req.body[index]) {
            if (req.body[index][i] === null || req.body[index][i] === undefined) {
              return res.status(400).json({ message: 'wrong data' })
            }
          }
          return res.status(400).json({ message: 'wrong data' })
        }
      }
    }
    const validData: boolean = await bodyValidator(req.body, 44)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        object_to_send.staffId = process.env.SUPER_ID
        object_to_send.staffEmail = process.env.SUPER_1_LOGIN
      }

      const result: boolean = await staffService.EditDomainInfo(object_to_send)
      if (!result) throw ApiError.ServerError()
      if (!rootAccess) {
        await telegram.sendMessageByStaffActions(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName}} `, req.body.domainName)
        await staffService.saveStaffLogs(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName}} `, '', req.body.staffId)
        return res.status(201).json({ message: 'ok' })
      }

      return res.status(201).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async createNewNotification(req: express.Request, res: express.Response, next: express.NextFunction) {
    interface request_object {
      userEmail: string
      notificationText: string
      domainName: string
    }
    const obj_to_send: request_object = {
      userEmail: req.body.userEmail,
      notificationText: req.body.notifText,
      domainName: req.body.domainName
    }

    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      const result: any = await Notification.CreateNotification(obj_to_send)
      if (!result) throw ApiError.ServerError()

      return res.status(201).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }


  async getNotificationList(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.params.userId
    console.log('req body is: ', req.params);
    try {
      const result: any = await Notification.GetNotificationForUser(userId)
      if (!result) return res.status(200).json({ listForUser: 'empty list' })

      return res.status(200).json({ listForUser: result })
    } catch (e) {
      next(e)
    }
  }

  async removeNotif(req: express.Request, res: express.Response, next: express.NextFunction) {
    const notifId: string = req.params.notifId
    console.log('req is: ', req.params);
    try {
      const result: boolean = await Notification.deleteNotification(notifId)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async newsCreate(req: express.Request, res: express.Response, next: express.NextFunction) {

    let transfer_object: NEWS_INFO = {
      staffEmail: req.body.staffEmail,
      staffId: req.body.staffId,
      newsTitle: req.body.newsTitle,
      newsDate: req.body.newsDate,
      newsBody: req.body.newsBody,
      newsImage: req.body.newsImage,
      newsDomain: req.body.newsDomain
    }
    const rootAccess: boolean = req.body.rootAccess


    const validData: boolean = await bodyValidator(req.body, 8)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess) {
        transfer_object.staffId = process.env.SUPER_ID
        transfer_object.staffEmail = process.env.SUPER_1_LOGIN
      }

      const result: any = await staffService.CreateNews(transfer_object)
      if (!result) throw ApiError.ServerError()

      return res.status(201).json(result)

    } catch (e) {
      next(e)
    }
  }

  async editNews(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transfer_object: NEWS_INFO = {
      staffEmail: req.body.staffEmail,
      staffId: req.body.staffId,
      newsTitle: req.body.newsTitle,
      newsDate: req.body.newsDate,
      newsBody: req.body.newsBody,
      newsImage: req.body.newsImage,
      newsDomain: req.body.newsDomain
    }
    const newsId: string = req.body.newsId
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 9)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess) {
        transfer_object.staffId = process.env.SUPER_ID
        transfer_object.staffEmail = process.env.SUPER_1_LOGIN
      }

      const result: boolean = await staffService.EditNews(transfer_object, newsId)
      if (!result) throw ApiError.ServerError()
      return res.status(202).json({ message: 'news was update' })

    } catch (e) {
      next(e)
    }
  }

  async getNewsList(req: express.Request, res: express.Response, next: express.NextFunction) {
    const isAdmin: boolean = req.body.isAdmin
    const isStaff: boolean = req.body.isStaff
    const staffEmail: string = req.body.staffEmail
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue


    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (isStaff) {
        const result: any = await staffService.GetNewsList(staffEmail, skipValue, limitValue)
        if (!result) throw ApiError.ServerError()

        return res.status(200).json(result)
      }
      if (rootAccess || isAdmin) {
        const result: any = await adminService.GetNewsListForAdmin(skipValue, limitValue)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'rejected' })

    } catch (e) {
      next(e)
    }
  }

  async deleteNews(req: express.Request, res: express.Response, next: express.NextFunction) {
    const newsId: string = req.body.newsId
    if (!newsId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: boolean = await staffService.DeleteNEwsById(newsId)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async staffList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // get all users who have staff permissions
    } catch (e) {
      next(e)
    }
  }

  async statistics(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // get staff users statistics (dep, withdraw, total staff users, staff domains, total 30d, chats)
    } catch (e) {
      next(e)
    }
  }

  async depositRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // user deposit requests
    } catch (e) {
      next(e)
    }
  }

  async withdrawRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // user withdraw  requests
    } catch (e) {
      next(e)
    }
  }

  async addStaffWallets(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // post staff withdraw wallets and save
    } catch (e) {
      next(e)
    }
  }

  async staffWalletsList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      //  get & show staff wallets 
    } catch (e) {
      next(e)
    }
  }

  async promocodeCreate(req: express.Request, res: express.Response, next: express.NextFunction) {
    let { date, value, currency, notification, staffId, domainName, counter } = req.body
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 8)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess) staffId = process.env.SUPER_ID

      const codesArray: any = await staffService.CreatePromocode(date, value, currency, notification, staffId, domainName, counter)
      if (!codesArray[0]) throw ApiError.ServerError()

      return res.status(201).json({ codesArray: codesArray })
    } catch (e) {
      next(e)
    }
  }

  async getPromocodeListForStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const staffPremission: boolean = req.body.isStaff
    let staffId: string = req.body.id
    // let staffEmail: string = req.body.staffEmail
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue


    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (rootAccess) {
        staffId = process.env.SUPER_ID
        // staffEmail = process.env.SUPER_1_LOGIN

        const codesList: any = await adminService.GetPromocodeListForAdmin(skipValue, limitValue)
        if (codesList !== false) return res.status(200).json({ promocodeList: codesList })
        return res.status(200).json({ promocodeList: null })

      }

      if (adminPermission) {
        const codesList: any = await adminService.GetPromocodeListForAdmin(skipValue, limitValue)
        if (codesList !== false) return res.status(200).json({ promocodeList: codesList })
        return res.status(200).json({ promocodeList: null })
      }

      if (staffPremission) {
        const codesList: any = await staffService.GetPromocodeListForStaff(staffId, skipValue, limitValue)
        if (codesList !== false) return res.status(200).json({ promocodeList: codesList })
        return res.status(200).json({ promocodeList: null })
      }
      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async removePromocode(req: express.Request, res: express.Response, next: express.NextFunction) {
    const code: string = req.body.promocode
    try {

      const result: boolean = await staffService.RemovePromocode(code)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async getUsedPromocodeListForStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    // const domainName: string = req.body.domainName
    let staffId: string = req.body.id
    // let staffEmail: string = req.body.staffEmail
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue


    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess === true) {
        staffId = process.env.SUPER_ID
        // staffEmail = process.env.SUPER_1_LOGIN

        const codesList: any = await adminService.GetPromocodeListForAdmin(skipValue, limitValue)
        if (codesList !== false) return res.status(200).json({ promocodeList: codesList })
        return res.status(200).json({ promocodeList: null })

      }

      if (adminPermission) {
        const codesList: any = await adminService.GetUsedPromocodeListForAdmin(skipValue, limitValue)
        if (codesList !== false) return res.status(200).json({ promocodeList: codesList })
        return res.status(200).json({ promocodeList: null })
      }
      if (staffPermission) {
        const codesList: any = await staffService.GetUsedPromocodeList(staffId, skipValue, limitValue)
        if (codesList !== false) return res.status(200).json({ promocodeList: codesList })
        return res.status(200).json({ promocodeList: null })

      }
      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async deleteUsedPromocodes(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    const staff_id: string = req.body.id


    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      if (adminPermission) {
        const result: boolean = await adminService.DeleteUsedPromocodesAsAdmin()
        if (!result) throw ApiError.ServerError()
        res.status(200).json({ message: 'OK' })
      }
      if (staffPermission) {
        const result: boolean = await staffService.DeleteUsedPromocodesAsStaff(staff_id)
        if (!result) throw ApiError.ServerError()
        res.status(200).json({ message: 'OK' })
      }
      return res.status(403).json({ message: 'permission denied' })
    }
    catch (e) {
      next(e)
    }
  }


  async recruiterList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      //  get & show all recruiters
    } catch (e) {
      next(e)
    }
  }


  // async getTermsByDomainName(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {
  //     const domainName: string = req.body
  //     console.log('req body is: ', req.body);
  //     const result: any = await staffService.GetTermsByDomainName(domainName)
  //     if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })
  //     res.status(202).json({ message: 'terms was updated', status: 'complete' })
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  // async updateTerms(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {
  //     const { domainName, termsBody } = req.body
  //     console.log('req body is: ', req.body);
  //     const result: any = await staffService.UpdateTerms(domainName, termsBody)
  //     if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })
  //     res.status(202).json({ message: 'terms was updated', status: 'complete' })
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  async projectSupport(req: express.Request, res: express.Response, next: express.NextFunction) {
    const wallet: string | undefined = process.env.SUPPORT_WALLET
    console.log('wallet is => ', wallet);

    try {
      return res.status(202).json({ wallet: wallet })
    } catch (e) {
      next(e)
    }
  }

  async projectSupportRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffEmail: string = req.body.staffEmail
    const title: string = req.body.title
    const message: string = req.body.message

    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      await telegram.sendProjectSupportMessage(staffEmail, title, message)
      res.status(200).json({ message: 'done' })
    } catch (e) {
      next(e)
    }
  }



  async makeWithdrawalForUserAsStaff(req: express.Request, res: express.Response, next: express.NextFunction) {

    let transfer_object: WITHDRAWAL_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinName: req.body.coinName,
      coinFullName: req.body.coinFullName,
      amountInCrypto: req.body.amountInCrypto,
      amountInUsd: req.body.amountInUsd,
      currentDate: req.body.currentDate,
      withdrawalAddress: req.body.withdrawalAddress,
      withdrawalStatus: req.body.withdrawalStatus
    }
    if (req.body.withdrawalStatus !== 'complete') {
      transfer_object.withdrawalStatus = 'complete'
    }
    const staffId: string = req.body.staffId

    const validData: boolean = await bodyValidator(req.body, 11)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: boolean = await moneyService.MakeWithdrawalAsStaff(transfer_object, staffId)
      console.log('result is: ', result)
      if (!result) throw ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }


  async createDepositForUserAsStaff(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transfer_object: DEPOSIT_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinName: req.body.coinName,
      coinFullName: req.body.coinFullName,
      amountInCrypto: req.body.amountInCrypto,
      amountInUsd: req.body.amountInUsd,
      currentDate: req.body.currentDate,
      depositAddress: req.body.depositAddress,
      depositStatus: req.body.depositStatus,
    }
    const staffId: string = req.body.staffId

    const validData: boolean = await bodyValidator(req.body, 11)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      const result: boolean = await moneyService.MakeDepositAsStaff(transfer_object, staffId)
      if (!result) return ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async createWithdrawalAsStaff(req: express.Request, res: express.Response, next: express.NextFunction) {

    let transfer_object: WITHDRAWAL_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinName: req.body.coinName,
      coinFullName: req.body.coinFullName,
      amountInCrypto: req.body.amountInCrypto,
      amountInUsd: req.body.amountInUsd,
      currentDate: req.body.currentDate,
      withdrawalAddress: req.body.withdrawalAddress,
      withdrawalStatus: req.body.withdrawalStatus
    }
    if (req.body.withdrawalStatus !== 'complete') {
      transfer_object.withdrawalStatus = 'complete'
    }

    const staffId: string = req.body.staffId

    const validData: boolean = await bodyValidator(req.body, 11)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: boolean = await moneyService.MakeWithdrawalAsStaff(transfer_object, staffId)
      if (!result) throw ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async createInternalTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transfer_object: INTERNAL_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinName: req.body.coinName,
      amountInCrypto: req.body.amountInCrypto,
      amountInUsd: req.body.amountInUsd,
      currentDate: req.body.currentDate,
      fromAddress: req.body.fromAddress,
      toAddress: req.body.toAddress,
      transferType: req.body.transferType,
      transferStatus: req.body.transferStatus
    }
    const staffId: string = req.body.staffId

    const validData: boolean = await bodyValidator(req.body, 12)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      const result: boolean | string = await moneyService.MakeInternalTransfer(transfer_object, staffId)
      if (!result) throw ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async sortHelper(arr: any[]) {
    for (let i = 0; i <= arr.length - 1; i++) {

    }
  }

  async getTransactionsHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffId: string = req.body.staffId
    const rootAccess: boolean = req.body.rootAccess
    const adminPermission: boolean = req.body.isAdmin
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {

      const dataArray = [{}]

      if (rootAccess || adminPermission) {
        const deposit: any = await UserServices.GetDepositHistory(skipValue, limitValue)
        const withdraw: any = await UserServices.GetWithdrawalHistory(skipValue, limitValue)
        const internal: any = await UserServices.GetInternalTransferHistory(skipValue, limitValue)
        for (let d = 0; d <= deposit.length - 1; d++) {
          if (deposit[d]) dataArray.push(deposit[d])
        }
        for (let w = 0; w <= withdraw.length - 1; w++) {
          if (withdraw[w]) dataArray.push(withdraw[w])
        }
        for (let i = 0; i <= internal.length - 1; i++) {
          if (internal[i]) dataArray.push(internal[i])
        }

        // console.log('history data is => ', dataArray);
        if (!dataArray.length) throw ApiError.ServerError()
        return res.status(200).json({ history: dataArray })

      }
      if (staffId !== '1') {

        const deposit: any = await UserServices.GetDepositHistory(skipValue, limitValue, staffId)
        const withdraw: any = await UserServices.GetWithdrawalHistory(skipValue, limitValue, staffId)
        const internal: any = await UserServices.GetInternalTransferHistory(skipValue, limitValue, staffId)

        for (let d = 0; d <= deposit.length - 1; d++) {
          if (deposit[d]) dataArray.push(deposit[d])
        }
        for (let w = 0; w <= withdraw.length - 1; w++) {
          if (withdraw[w]) dataArray.push(withdraw[w])
        }
        for (let i = 0; i <= internal.length - 1; i++) {
          if (internal[i]) dataArray.push(internal[i])
        }

        // console.log('history data is => ', dataArray);
        if (!dataArray.length) throw ApiError.ServerError()
        return res.status(200).json({ history: dataArray })

      }



      // const dataArray = [
      //   deposit,
      //   withdraw,
      //   internal
      // ]
      // console.log('history data is => ', dataArray);
      // if (!dataArray.length) return res.status(500).json({ message: 'internal server error' })

      // return res.status(200).json({
      //   message: 'ok',
      //   history: dataArray,
      //   sortBy: [
      //     'deposit history array',
      //     'withdraw history array',
      //     'internal history array'
      //   ]
      // })
      return res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async getSecureDealHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffId: string = req.body.staffId
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess) {
        const result: any = await adminService.getSecureDealHistoryAsAdmin(skipValue, limitValue)
        if (!result) throw ApiError.ServerError()

        return res.status(200).json({ message: 'ok', history: result })
      }
      const result: any = await staffService.getSecureDealHistoryAsStaff(staffId, skipValue, limitValue)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok', history: result })
    } catch (e) {
      next(e)
    }
  }

  async createStaffWallet(req: express.Request, res: express.Response, next: express.NextFunction) {

    const staffId: string = req.body.staffId
    const staffTelegramId: number = req.body.staffTelegramId
    const walletList = [
      {
        coinName: 'BTC',
        coinAddress: req.body.walletList.btcWallet,
      },
      {
        coinName: 'BCH',
        coinAddress: req.body.walletList.bchWallet,
      },
      {
        coinName: 'ETH',
        coinAddress: req.body.walletList.ethWallet,
      },
      {
        coinName: 'USDT',
        coinAddress: req.body.walletList.usdtWallet,
      },
      {
        coinName: 'TRX',
        coinAddress: req.body.walletListtronWallet,
      },
      {
        coinName: 'USDTTRX',
        coinAddress: req.body.walletList.trxUsdtWallet,
      },
      {
        coinName: 'SOL',
        coinAddress: req.body.walletList.solanaWalet
      }
    ]

    const validData: boolean = await bodyValidator(req.body, 9)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      const result: boolean = await staffService.createStaffWallet(walletList, staffId, staffTelegramId)
      if (!result) throw ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async editStaffWallets(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffId: string = req.body.staffId
    const rootAccess: boolean = req.body.rootAccess
    const wallet: string = req.body.wallet
    const coinName: string = req.body.coinName

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (!rootAccess) return res.status(403).json({ message: 'permission denied' })

      const result: boolean = await adminService.editStaffWallets(wallet, coinName, staffId)
      if (!result) throw ApiError.ServerError()
      return res.status(202).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async getStaffWallet(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffId: string = req.body.staffId
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess) {
        const result: any = await adminService.getStaffWalletForAdmin(skipValue, limitValue)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }
      const result: any = await staffService.getStaffWallet(staffId)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }


  async getStaffUserByWallet(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffWallet: string = req.params.staffWallet
    if (!staffWallet) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: boolean = await staffService.getStaffUserByWallet(staffWallet)
      if (!result) return res.status(202).json({ message: "can't find any wallet" })
      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }

  async checkStaffUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userEmail: string = req.params.userEmail
    if (!userEmail) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await staffService.validateStaffUser(userEmail)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }

  async deleteSecureDeal(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dealId: string = req.params.dealId
    console.log('dealId => ', dealId);
    if (!dealId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: boolean = await staffService.deleteSecureDeal(dealId)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async createNewGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
    const groupName: string = req.body.groupName
    const date: number = req.body.currentDate
    const viewParams: boolean = req.body.viewParams
    let creatorId: string = req.body.creatorId
    const staffEmail: string = req.body.staffEmail

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })


    try {
      if (creatorId === 'root') creatorId = process.env.SUPER_ID
      const result: boolean = await staffService.createNewStaffGroup(groupName, staffEmail, date, viewParams, creatorId)
      if (!result) throw ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async addNewStaffToGroup(req: express.Request, res: express.Response, next: express.NextFunction) {

    const staffEmail: string = req.body.staffEmail
    const groupId: string = req.body.groupId

    const validData: boolean = await bodyValidator(req.body, 2)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      const result: any = await staffService.addNewGroupMember(staffEmail, groupId)
      if (!result) throw ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }


  async deleteUserFromGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
    const groupId: string = req.body.groupId
    const staffId: string = req.body.staffId
    const staffEmail: string = req.body.staffEmail
    const rootAccess: boolean = req.body.rootAccess
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff

    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess || adminPermission) {
        const result: any = await adminService.deleteUserFromGroup(groupId, staffEmail)
        if (!result) throw ApiError.ServerError()
        if (typeof result === 'string') return res.status(200).json(result)
        return res.status(202).json(result)
      }
      if (staffPermission) {
        const result: any = await staffService.deleteUserFromGroup(groupId, staffId, staffEmail)
        if (!result) throw ApiError.ServerError()
        if (typeof result === 'string') return res.status(200).json(result)
        return res.status(202).json(result)
      }
      res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }


  async getGroupList(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffEmail: string = req.body.staffEmail
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue


    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission) {
        const result: any = await adminService.getGroupListForAdmin(skipValue, limitValue)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }

      if (staffPermission) {
        const result: any = await staffService.getGroupListForStaff(staffEmail, skipValue, limitValue)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }

      res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async deleteGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffId: string = req.body.staffId
    const groupId: string = req.body.groupId
    const adminPermission: boolean = req.body.isAdmin
    const staffPermission: boolean = req.body.isStaff
    const rootAccess: boolean = req.body.rootAccess

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (staffPermission) {
        const result: any = await staffService.deleteGroup(staffId, groupId)
        if (typeof result === 'string') return res.status(200).json(result)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      }

      if (adminPermission || rootAccess) {
        const result: boolean = await adminService.deleteGroup(groupId)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      }
      res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async checkUserBeforeMakeRecruiter(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userEmail: string = req.params.userEmail
    console.log('userEmail => ', userEmail);
    if (!userEmail) throw ApiError.BadRequest()
    try {
      const result: boolean = await staffService.validateStaffEmail(userEmail)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }


  async addNewRecruiter(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const recruiterFee: number = req.body.recruiterFee
    const currentDate: number = req.body.currentDate
    const userEmail: string = req.body.userEmail
    const adminId: string = req.body.adminId

    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    const transferObject: object = {
      staffEmail: userEmail,
      recruiterFee: recruiterFee,
      permissionDate: currentDate,
      adminId: adminId
    }
    try {
      if (adminPermission || rootAccess) {
        const result: boolean | string = await adminService.addNewRecruiterUser(transferObject)
        if (!result) throw ApiError.ServerError()
        return res.status(201).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async addNewStaffToRecruiter(req: express.Request, res: express.Response, next: express.NextFunction) {

    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const staffEmail: string = req.body.staffEmail
    const recruiterFee: number = req.body.recruiterFee
    const recruiterId: string = req.body.recruiterId

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (adminPermission || rootAccess) {
        const result: boolean | string = await adminService.addStaffToRecruiter(staffEmail, recruiterFee, recruiterId)
        if (!result) throw ApiError.ServerError()
        return res.status(201).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async getRecruiterList(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const skipValue: number = req.body.skipValue
    const limitValue: number = req.body.limitValue


    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (adminPermission || rootAccess) {
        const result: any | string = await adminService.getRecruiterList(skipValue, limitValue)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async getRecruiterDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const recruiterId: string = req.body.recruiterId

    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (adminPermission || rootAccess) {
        const result: any | string = await adminService.getRecruiterDetail(recruiterId)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async updateRecruiterFee(req: express.Request, res: express.Response, next: express.NextFunction) {
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const recruiterId: string = req.body.recruiterId
    const updatedFee: number = req.body.updatedFee

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (adminPermission || rootAccess) {
        const result: boolean | string = await adminService.updateRecruiterFee(recruiterId, updatedFee)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async addRecruiterWallet(req: express.Request, res: express.Response, next: express.NextFunction) {

    const recruiterId: string = req.body.recruiterId
    const walletList = [
      {
        coinName: 'BTC',
        coinAddress: req.body.walletList.btcWallet,
      },
      {
        coinName: 'BCH',
        coinAddress: req.body.walletList.bchWallet,
      },
      {
        coinName: 'ETH',
        coinAddress: req.body.walletList.ethWallet,
      },
      {
        coinName: 'USDT',
        coinAddress: req.body.walletList.usdtWallet,
      },
      {
        coinName: 'TRX',
        coinAddress: req.body.walletListtronWallet,
      },
      {
        coinName: 'USDTTRX',
        coinAddress: req.body.walletList.trxUsdtWallet,
      },
      {
        coinName: 'SOL',
        coinAddress: req.body.walletList.solanaWalet
      }
    ]

    for (let index in req.body) {
      if (req.body[index] === null || req.body[index] === undefined) {
        if (typeof req.body[index] === 'object') {
          for (let i in req.body[index]) {
            if (req.body[index][i] === null || req.body[index][i] === undefined) {
              return res.status(400).json({ message: 'wrong data' })
            }
          }
          return res.status(400).json({ message: 'problem in received data' })
        }
      }
    }
    try {

      const result: boolean = await adminService.createRecruiterWallet(walletList, recruiterId)
      if (!result) throw ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async getRecruiterWallets(req: express.Request, res: express.Response, next: express.NextFunction) {
    const recruiterId: string = req.body.recruiterId
    const rootAccess: boolean = req.body.rootAccess
    const adminPermission: boolean = req.body.isAdmin

    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess || adminPermission) {
        const result: any = await adminService.getRecruiterWallets(recruiterId)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })

    } catch (e) {
      next(e)
    }
  }

  async updateCurrentRecruiterWallet(req: express.Request, res: express.Response, next: express.NextFunction) {
    const recruiterId: string = req.body.recruiterId
    const rootAccess: boolean = req.body.rootAccess
    const adminPermission: boolean = req.body.isAdmin
    const wallet: string = req.body.wallet
    const coinName: string = req.body.coinName

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess || adminPermission) {
        const result: boolean = await adminService.editRecruiterWallet(wallet, coinName, recruiterId)
        if (!result) throw ApiError.ServerError()
        return res.status(202).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async deleteStaffFromRecruiter(req: express.Request, res: express.Response, next: express.NextFunction) {
    const recruiterId: string = req.body.recruiterId
    const rootAccess: boolean = req.body.rootAccess
    const adminPermission: boolean = req.body.isAdmin
    const staffId: string = req.body.staffId
    const staffEmail: string = req.body.staffEmail

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess || adminPermission) {
        const result: boolean = await adminService.deleteStaffFromRecruiter(staffId, staffEmail, recruiterId)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async deleteRecruiterUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const recruiterId: string = req.body.recruiterId
    const rootAccess: boolean = req.body.rootAccess
    const adminPermission: boolean = req.body.isAdmin

    const validData: boolean = await bodyValidator(req.body, 3)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      if (rootAccess || adminPermission) {
        const result: boolean = await adminService.deleteRecruiterUser(recruiterId)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async getTradingData(req: express.Request, res: express.Response, next: express.NextFunction) {

    const domainName: string = req.params.domainName
    if (!domainName) return res.status(400).json({ message: 'problem in received data' })

    try {

      const result: boolean | object = await staffService.getTradingParams(domainName)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)

    } catch (e) {
      next(e)
    }
  }

  async updateCoinRate(req: express.Request, res: express.Response, next: express.NextFunction) {

    let transferObject: TRADING_COIN_RATE_UPDATE = {
      coinName: req.body.coinName,
      valueInPercent: req.body.valueInPercent,
      growthParams: req.body.growthParams,
      domainName: req.body.domainName,
      timeRangeInMs: req.body.timeRangeInMs
    }


    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: any = await staffService.updateCoinRate(transferObject)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)

    } catch (e) {
      next(e)
    }
  }


  async checkAddressBalance(req: express.Request, res: express.Response, next: express.NextFunction) {

    const staffPermission: boolean = req.body.isStaff
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const coinName: string = req.body.coinName
    const address: string = req.body.address

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: boolean | number = await CryptoService.CheckBalance(coinName, address)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }


  async getUserAddresses(req: express.Request, res: express.Response, next: express.NextFunction) {

    const staffPermission: boolean = req.body.isStaff
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const userId: string = req.body.userId

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: boolean | string[] = await staffService.getUserAddressList(userId)
        if (!result) throw ApiError.ServerError()
        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async getSupportData(req: express.Request, res: express.Response, next: express.NextFunction) {

    const staffPermission: boolean = req.body.isStaff
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const staffId: string = req.body.staffId

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: any = await staffService.getSupportDataByStaffId(staffId)
        if (!result) throw ApiError.ServerError()

        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async getChatDataByChatId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const chatId: string = req.params.chatId
    let skip: string = req.params.skipValue
    const skipValue: number = parseInt(skip)
    let limit: string = req.params.limitValue
    const limitValue: number = parseInt(limit)

    try {

      const result: any = await staffService.getChatData(chatId, skipValue, limitValue)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }

  async sendMessageAsSupportTeam(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffPermission: boolean = req.body.isStaff
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess


    const transferObject: CHAT_DATA = {
      userId: req.body.userId,
      domainName: req.body.domainName,
      supportName: req.body.supportName,
      staffId: req.body.staffId,
      curDate: req.body.curDate,
      isUser: req.body.isUser,
      messageBody: req.body.messageBody,
      imageLink: req.body.imageLink,
      chatId: req.body.chatId
    }

    const validData: boolean = await bodyValidator(req.body, 12)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: boolean = await staffService.sendMessageToSupportChat(transferObject)
        console.log(' result is: ', result)
        if (!result) throw ApiError.ServerError()

        return res.status(202).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }


  async EditChatMessage(req: express.Request, res: express.Response, next: express.NextFunction) {

    const staffPermission: boolean = req.body.isStaff
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess

    const messageId: string = req.body.messageId

    const transferObject = {
      curDate: req.body.curDate,
      messageBody: req.body.messageBody,
      imageLink: req.body.imageLink
    }

    const validData: boolean = await bodyValidator(req.body, 7)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: any = await staffService.editChatMessage(messageId, transferObject)
        if (!result) throw ApiError.ServerError()

        return res.status(200).json(result)
      }
      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }


  async getSecureDealDetail(req: express.Request, res: express.Response, next: express.NextFunction) {

    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const staffPermission: boolean = req.body.isStaff
    const dealId: string = req.body.dealId

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: any = await staffService.getSecureDealDetail(dealId)
        if (!result) throw ApiError.ServerError()

        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }


  async sendMessageInSecureDealChat(req: express.Request, res: express.Response, next: express.NextFunction) {
    const staffPermission: boolean = req.body.isStaff
    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess

    const transferObject: SECURE_CHAT_DATA = {
      userId: req.body.userId,
      domainName: req.body.domainName,
      supportName: req.body.supportName,
      staffId: req.body.staffId,
      curDate: req.body.curDate,
      isUser: req.body.isUser,
      messageBody: req.body.messageBody,
      imageLink: req.body.imageLink,
      chatId: req.body.chatId,
      userEmail: req.body.userEmail,
      secondPartyEmail: req.body.secondPartyEmail
    }

    const validData: boolean = await bodyValidator(req.body, 14)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: boolean = await staffService.sendMessageInSecureDealChat(transferObject)
        console.log(' result is: ', result)
        if (!result) throw ApiError.ServerError()

        return res.status(202).json({ message: 'ok' })
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }

  async GetDepositRequests(req: express.Request, res: express.Response, next: express.NextFunction) {

    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const staffPermission: boolean = req.body.isStaff
    const staffId: string = req.body.staffId
    const skip: number = req.body.skipValue
    const limit: number = req.body.limitValue

    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {
        const result: any = await staffService.getDepositRequestsList(staffId, skip, limit)
        if (!result) throw ApiError.ServerError()

        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }


  async UpdateDepositStatus(req: express.Request, res: express.Response, next: express.NextFunction) {

    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const staffPermission: boolean = req.body.isStaff
    const depositId: string = req.body.depositId
    const status: string = req.body.status

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {

        const result: boolean = await staffService.updateDepositStatus(depositId, status)
        if (!result) return res.status(304).json(result)

        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }


  async DeleteDepositRequest(req: express.Request, res: express.Response, next: express.NextFunction) {

    const adminPermission: boolean = req.body.isAdmin
    const rootAccess: boolean = req.body.rootAccess
    const staffPermission: boolean = req.body.isStaff
    const depositId: string = req.body.depositId

    const validData: boolean = await bodyValidator(req.body, 4)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      if (rootAccess || adminPermission || staffPermission) {

        const result: boolean = await staffService.deleteDepositRequest(depositId)
        if (!result) throw ApiError.ServerError()

        return res.status(200).json(result)
      }

      return res.status(403).json({ message: 'permission denied' })
    } catch (e) {
      next(e)
    }
  }


}



export default new StaffController()