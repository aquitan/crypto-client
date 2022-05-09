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



class StaffController {

  async staffDashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user_id: string = req.body.userId
      const adminPermission: boolean = req.body.isAdmin
      const staffPermission: boolean = req.body.isStaff

      console.log('req body: ', req.body);

      const rootAccess: boolean = req.body.rootAccess

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
    try {

      const adminPermission: boolean = req.body.isAdmin
      const staffPermission: boolean = req.body.isStaff
      const userDomain: string = req.body.domainName
      const rootAccess: boolean = req.body.rootAccess
      console.log('req body is: ', req.body)

      if (rootAccess || adminPermission) {
        const usersList: any = await adminService.GetUsersList()
        if (usersList !== false) {
          return res.status(200).json({
            usersList: usersList,
            status: 'complete'
          })
        }
      }
      if (staffPermission === true) {
        const usersList: any = await staffService.GetUsersList(userDomain)
        if (usersList !== false) {
          return res.status(200).json({
            usersList: usersList,
            status: 'complete'
          })
        }
      }

      return res.status(403).json({
        message: 'permission denied',
        status: 'rejected'
      })

    } catch (e) {
      next(e)
    }
  }

  async userDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      const user_id: string = req.params.id

      const user: any = await staffService.GetUserDetail(user_id)
      console.log('found user: ', user)
      if (!user) return res.status(400).json({ message: 'wrong data' })

      return res.status(200).json({ user: user, message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

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
    try {
      const adminPermission: boolean = req.body.isAdmin
      const staffPermission: boolean = req.body.isStaff
      const domainName: string = req.body.domainName
      console.log('req body is: ', req.body)

      if (adminPermission === true) {
        const usersKycList: any = await adminService.GetKycForAdmin()
        if (usersKycList !== false) {
          return res.status(200).json({
            usersKycList: usersKycList,
            status: 'complete'
          })
        }
      }
      if (staffPermission === true) {
        const usersKycList: any = await staffService.GetKycForStaff(domainName)
        if (usersKycList !== false) {
          return res.status(200).json({
            usersKycList: usersKycList,
            status: 'complete'
          })
        }
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

    try {
      const { status, staffId, staffEmail, userEmail, userId, domainName } = req.body
      console.log('req body: ', req.body);

      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.changeKycStatusAsStaff(status, userId)
        console.log('operation result is: ', result);
        if (result === false) {
          return res.status(400).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'kyc status was changed',
          status: 'complete'
        })
      }
      const result: boolean = await staffService.changeKycStatusAsStaff(status, userId)
      console.log('operation result is: ', result);
      if (result === false) {
        return res.status(400).json({
          message: 'error',
          status: 'rejected'
        })
      }
      await telegram.sendMessageByStaffActions(staffEmail, `изменил статус ${userEmail} на  ${status} `, domainName)
      await staffService.saveStaffLogs(staffEmail, ` изменил статус ${userEmail} на  ${status} `, domainName, staffId)

      return res.status(202).json({
        message: 'kyc status was changed',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async deleteKyc(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { kycId, staffId, staffEmail, userId, userEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.DeleteKyc(userId)
        console.log('operation result is: ', result);

        if (result === false) return res.status(400).json({ message: 'rejected' })

        return res.status(202).json({ message: 'kyc was delete' })
      }

      const result: boolean = await staffService.DeleteKyc(userId)
      console.log('operation result is: ', result);

      if (result === false) return res.status(400).json({ message: 'rejected' })

      await telegram.sendMessageByStaffActions(staffEmail, ` удалил KYC юзера ${userEmail} на `, domainName)
      await staffService.saveStaffLogs(staffEmail, ` удалил KYC юзера ${userEmail} `, domainName, staffId)

      return res.status(202).json({
        message: 'kyc was delete',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }


  async updateUserError(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { staffId, staffEmail, curError, userEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.UpdateUserError('root', curError)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'OK',
          status: 'complete'
        })

      }
      const result: boolean = await staffService.UpdateUserError(userEmail, curError)
      if (result === false) {
        console.log('error');
        return res.status(401).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await staffService.saveStaffLogs(staffEmail, ` поменял ошибку пользователя ${userEmail} на ${curError}`, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` поменял ошибку пользователя ${userEmail} на ${curError}`, domainName)
      return res.status(202).json({
        message: 'OK',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async updateDepositFee(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, depositFee, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.UpdateDepositFee(userId, depositFee)
        if (result === false) {
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
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess) {
        const result: boolean = await staffService.UpdatePremiumStatus(userId, status)
        if (result === false) {
          console.log('error');
          return res.status(400).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'premium status was changed',
          status: 'complete'
        })
      } else {
        const result: boolean = await staffService.UpdatePremiumStatus(userId, status)
        if (result === false) {
          console.log('error');
          return res.status(400).json({
            message: 'error',
            status: 'rejected'
          })
        }
        await staffService.saveStaffLogs(staffEmail, ` изменил премиум статус ${userEmail} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил премиум статус ${userEmail} `, domainName)
        return res.status(202).json({
          message: 'premium status was changed',
          status: 'complete'
        })
      }

    } catch (e) {
      next(e)
    }
  }

  async updateSwapBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);

      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.UpdateSwapBan(userId, status)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'swap ban status was updated',
          status: 'complete'
        })
      }
      const result: boolean = await staffService.UpdateSwapBan(userId, status)
      if (result === false) {
        console.log('error');
        return res.status(401).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await staffService.saveStaffLogs(staffEmail, ` изменил бан свапов для ${userEmail} на  ${status} `, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` изменил бан свапов для  ${userEmail} на  ${status} `, domainName)
      return res.status(202).json({
        message: 'swap ban status was updated',
        status: 'complete'
      })

    } catch (e) {
      next(e)
    }
  }

  async updateInternalBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.UpdateInternalBan(userId, status)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'internal ban status was updated',
          status: 'complete'
        })
      }
      const result: boolean = await staffService.UpdateInternalBan(userId, status)
      if (result === false) {
        console.log('error');
        return res.status(401).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await staffService.saveStaffLogs(staffEmail, ` изменил бан внутренних транзакций для ${userEmail} на  ${status} `, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` изменил бан внутренних транзакций для  ${userEmail} на  ${status} `, domainName)
      return res.status(202).json({
        message: 'internal ban status was updated',
        status: 'complete'
      })


    } catch (e) {
      next(e)
    }
  }

  async updateFullBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.UpdateFullBan(userId, status)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'full ban status was updated',
          status: 'complete'
        })
      }

      const result: boolean = await staffService.UpdateFullBan(userId, status)
      if (result === false) {
        console.log('error');
        return res.status(401).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await staffService.saveStaffLogs(staffEmail, ` изменил статус полного бана для ${userEmail} на  ${status} `, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` изменил статус полного бана для  ${userEmail} на  ${status} `, domainName)
      return res.status(202).json({
        message: 'full ban status was updated',
        status: 'complete'
      })


    } catch (e) {
      next(e)
    }
  }

  async updateStaffStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { status, staffEmail, userEmail, domainName, currentDate } = req.body
      console.log('req body: ', req.body);

      const rootAccess: boolean = req.body.rootAccess
      const adminPermission: boolean = req.body.isAdmin
      const staffPermission: boolean = req.body.isStaff
      let staffId: string = req.body.staffId

      if (rootAccess === true) {
        staffId = 'xxOOOxx--001'
        const result: boolean = await adminService.UpdateStaffStatus('root', userEmail, currentDate, status)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'user staff status was updated',
          status: 'complete'
        })
      }

      if (adminPermission || staffPermission) {
        const result: boolean = await adminService.UpdateStaffStatus(staffEmail, userEmail, currentDate, status)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }

        await staffService.saveStaffLogs(staffEmail, ` изменил стафф права пользователя ${userEmail} на  ${status} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил стафф права пользователя  ${userEmail} на  ${status} `, domainName)
        return res.status(202).json({
          message: 'user staff status was updated',
          status: 'complete'
        })
      }

      return res.status(400).json({
        message: 'rejected',
        status: 'complete'
      })

    } catch (e) {
      next(e)
    }
  }

  async updateStaffSupportName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { staffId, updatedName, staffEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess) {
        const result: boolean = await staffService.UpdateStaffSupportName('root', updatedName)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'support name was updated',
          status: 'complete'
        })
      } else {
        const result: boolean = await staffService.UpdateStaffSupportName(staffEmail, updatedName)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }

        await staffService.saveStaffLogs(staffEmail, ` изменил имя в саппорте на  ${updatedName} `, domainName, staffId)
        await telegram.sendMessageByStaffActions(staffEmail, ` изменил имя в саппорте на  ${updatedName} `, domainName)
        return res.status(202).json({
          message: 'support name was updated',
          status: 'complete'
        })
      }


    } catch (e) {
      next(e)
    }
  }

  async updateDoubleDeposit(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.UpdateDoubleDepositStatus(userId, status)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'double deposit status was updated',
          status: 'complete'
        })
      }

      const result: boolean = await staffService.UpdateDoubleDepositStatus(userId, status)
      if (result === false) {
        console.log('error');
        return res.status(401).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await staffService.saveStaffLogs(staffEmail, ` изменил статус даблдепов пользователя ${userEmail} на  ${status} `, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` изменил статус даблдепов пользователя  ${userEmail} на  ${status} `, domainName)
      return res.status(202).json({
        message: 'double deposit status was updated',
        status: 'complete'
      })

    } catch (e) {
      next(e)
    }
  }

  async clearMatchIpList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, staffEmail, userEmail, domainName, ipAddress } = req.body
      console.log('req body: ', req.body);
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        const result: boolean = await staffService.ClearMatchIpUsers('root', ipAddress)
        if (result === false) {
          console.log('error');
          return res.status(401).json({
            message: 'error',
            status: 'rejected'
          })
        }
        return res.status(202).json({
          message: 'Match IP addresses was cleared',
          status: 'complete'
        })

      }
      const result: boolean = await staffService.ClearMatchIpUsers(userEmail, ipAddress)
      if (result === false) {
        console.log('error');
        return res.status(401).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await staffService.saveStaffLogs(staffEmail, ` очистил повторяющиеся IP пользователя ${userEmail}`, domainName, staffId)
      await telegram.sendMessageByStaffActions(staffEmail, ` очистил повторяющиеся IP пользователя  ${userEmail} `, domainName)
      return res.status(202).json({
        message: 'Match IP addresses was cleared',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async createNewUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      let transfer_object: CREATE_USER_AS_STAFF = {
        staffEmail: req.body.staffEmail,
        staffId: req.body.staffId,
        userEmail: req.body.userEmail,
        password: req.body.password,
        domainName: req.body.domainName,
        currentDate: req.body.currentDate,
        name: req.body.name
      }
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        transfer_object.staffId = 'xx999xx--001'
        transfer_object.staffEmail = 'root'
        const result: boolean = await staffService.CreateUserAsStaff(transfer_object)
        if (result === false) return res.status(400).json({ message: 'wrong data' })

        return res.status(201).json({ message: 'ok' })
      }

      const result: boolean = await staffService.CreateUserAsStaff(transfer_object)
      if (result === false) return res.status(400).json({ message: 'wrong data' })
      await telegram.sendMessageByStaffActions(transfer_object.staffEmail, ` создал пользователя ${transfer_object.userEmail} `, transfer_object.domainName)
      await staffService.saveStaffLogs(transfer_object.staffEmail, ` создал пользователя ${transfer_object.userEmail} `, transfer_object.domainName, transfer_object.staffId)

      return res.status(201).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async createDomain(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      console.log('req body is: ', req.body);

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
        rateCorrectSum: req.body.rateCorrectSum,
        minDepositSum: req.body.minDepositSum,
        minWithdrawalSum: req.body.minWithdrawalSum,
        currencySwapFee: req.body.currencySwapFee,
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

      if (rootAccess === true) {
        object_to_send.staffId = 'xx999xx--001'
        object_to_send.staffEmail = 'root'
      }

      const result: string | boolean = await staffService.CreateNewDomain(object_to_send)

      if (result === false) return res.status(400).json({
        message: 'wrong data. please try one more time.'
      })
      if (result === 'error') return res.status(500).json({
        message: 'internal server error.'
      })
      // const checkTerms: boolean = await staffService.CheckDomainTerms()
      // if (!checkTerms) await staffService.addTerms(req.body.fullDomainName)

      if (rootAccess === false) {
        await telegram.sendMessageByStaffActions(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName}} `, req.body.domainName)
        await staffService.saveStaffLogs(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName} `, '', req.body.staffId)
      }

      return res.status(201).json({
        message: 'domain was created with all settings.',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }


  async getDomainDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domain_id: string = req.params.id
      console.log('current domain id is: ', domain_id);
      const result: any = await staffService.GetDomainDetail(domain_id)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(202).json({
        domain_detail: result,
        status: 'complete'
      })

    } catch (e) {
      next(e)
    }
  }

  async createCustomError(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      console.log('req body is: ', req.body)

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

      if (rootAccess === true || adminPermission) {
        staffId = 'xx999xx--001'
        staffEmail = 'root'

        const result: any = await staffService.CreateCustomError(obj_to_send)
        console.log('result is: ', result);
        if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

        return res.status(201).json({ message: 'Error was created', status: 'completed' })

      }

      if (staffPremission) {
        const result: any = await staffService.CreateCustomError(obj_to_send)
        console.log('result is: ', result);

        if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

        await telegram.sendMessageByStaffActions(staffEmail, ` создал кастомную ошибку `, obj_to_send.domain_name)
        await staffService.saveStaffLogs(staffEmail, ` создал новый домен ${req.body.fullDomainName}} `, obj_to_send.domain_name, staffId)


        return res.status(201).json({ message: 'Error was created', status: 'completed' })
      }

      throw ApiError.ServerError()

    } catch (e) {
      next(e)
    }
  }

  async getAllErrors(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domainName: string = req.body.domainName
      console.log('current domain id is: ', domainName);
      const result: any = await staffService.GetDomainErrors(domainName)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(202).json({
        errorList: result,
        status: 'complete'
      })

    } catch (e) {
      next(e)
    }
  }


  async getErrorsByDomainName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domain_name: string = req.body.domainName
      console.log('req body is: ', req.body);

      const result: any = await staffService.GetErrorsByDomainName(domain_name)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(202).json({
        domainErrorsList: result,
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async getDomainsList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('req body is: ', req.body)

      const adminPermission: boolean = req.body.isAdmin
      const staffPermission: boolean = req.body.isStaff
      // const domainName: string = req.body.domainName
      let staffId: string = req.body.id
      let staffEmail: string = req.body.staffEmail
      const rootAccess: boolean = req.body.rootAccess
      let domainListArray: any = []

      if (rootAccess === true || adminPermission === true) {
        staffId = 'xx999xx--001'
        staffEmail = 'root'

        const result: any = await adminService.GetDomainListForAdmin()

        if (result !== false) {
          if (result.length > 1) {
            for (let i = 0; i <= result.length - 1; i++) {
              console.log('domain name is => ', result[i].fullDomainName);
              let obj = {
                domainName: result[i].fullDomainName,
                domainId: result[i].id
              }
              domainListArray.push(obj)
            }
            console.log('current domain list is: ', domainListArray);

            return res.status(200).json({
              domainsList: domainListArray,
              status: 'complete'
            })
          } else {

            return res.status(200).json({
              domainsList: [
                {
                  domainName: result[0].fullDomainName,
                  domainId: result[0].id
                }
              ],
              status: 'complete'
            })
          }
        }
        return res.status(200).json({ message: 'empty list' })

      }

      if (staffPermission === true) {

        const result: any = await staffService.GetDomainListForStaff(staffId)

        if (result !== false) {
          if (result.length > 1) {
            for (let i = 0; i <= result.length - 1; i++) {
              console.log('domain name is => ', result[i].fullDomainName);
              let obj = {
                domainName: result[i].fullDomainName,
                domainId: result[i].id
              }
              domainListArray.push(obj)
            }
            console.log('current domain list is: ', domainListArray);

            return res.status(200).json({
              domainsList: domainListArray,
              status: 'complete'
            })
          } else {

            return res.status(200).json({
              domainsList: [
                {
                  domainName: result[0].fullDomainName,
                  domainId: result[0].id
                }
              ],
              status: 'complete'
            })
          }
        }
        return res.status(200).json({ message: 'empty list' })
      }

      return res.status(403).json({
        message: 'permission denied',
        status: 'rejected'
      })
    } catch (e) {
      next(e)
    }
  }

  async editDomainInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      console.log('req body is: ', req.body);

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
        rateCorrectSum: req.body.rateCorrectSum,
        minDepositSum: req.body.minDepositSum,
        minWithdrawalSum: req.body.minWithdrawalSum,
        currencySwapFee: req.body.currencySwapFee,
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

      if (rootAccess === true) {
        object_to_send.staffId = 'xx999xx--001'
        object_to_send.staffEmail = 'root'
      }

      const result: boolean = await staffService.EditDomainInfo(object_to_send)

      if (result === false) return res.status(400).json({ message: 'wrong data' })
      if (rootAccess === false) {
        await telegram.sendMessageByStaffActions(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName}} `, req.body.domainName)
        await staffService.saveStaffLogs(req.body.staffEmail, ` создал новый домен ${req.body.fullDomainName}} `, '', req.body.staffId)
        return res.status(201).json({
          message: 'domain was created with all settings.',
          status: 'OK'
        })
      }

      return res.status(201).json({ message: 'domain was created.' })
    } catch (e) {
      next(e)
    }
  }

  async createNewNotification(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      interface request_object {
        user_email: string
        notification_text: string
        domain_name: string
      }
      console.log('req body is: ', req.body);

      const obj_to_send: request_object = {
        user_email: req.body.userEmail,
        notification_text: req.body.notifText,
        domain_name: req.body.domainName
      }

      const result: any = await staffService.CreateNotification(obj_to_send)
      console.log('result is: ', result);
      if (!result) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(201).json({ message: 'notification was create', status: 'complete' })


    } catch (e) {
      next(e)
    }
  }


  async getNotificationList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const userId: string = req.body.userId
      console.log('req body is: ', req.body);
      const result: any = await staffService.GetNotificationForUser(userId)

      if (result === false) return res.status(200).json({ message: 'empty list' })

      return res.status(200).json({ listForUser: result })

    } catch (e) {
      next(e)
    }
  }

  async newsCreate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      const transfer_object: NEWS_INFO = {
        staffEmail: req.body.staffEmail,
        staffId: req.body.staffId,
        newsTitle: req.body.newsTitle,
        newsDate: req.body.newsDate,
        newsBody: req.body.newsBody,
        newsImage: req.body.newsImage,
        newsDomain: req.body.newsDomain
      }

      const result: any = await staffService.CreateNews(transfer_object)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(201).json({
        message: 'news was create',
        status: 'complete',
        content: result
      })
    } catch (e) {
      next(e)
    }
  }

  async editNews(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      const transfer_object: NEWS_INFO = {
        staffEmail: req.body.staffEmail,
        staffId: req.body.staffId,
        newsTitle: req.body.newsTitle,
        newsDate: req.body.newsDate,
        newsBody: req.body.newsBody,
        newsImage: req.body.newsImage,
        newsDomain: req.body.newsDomain
      }

      const result: boolean = await staffService.EditNews(transfer_object)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(202).json({ message: 'news was update', status: 'complete' })

    } catch (e) {
      next(e)
    }
  }

  async getNewsList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const isAdmin: boolean = req.body.isAdmin
      const isStaff: boolean = req.body.isStaff
      const staffId: string = req.body.staffId

      if (isStaff === true) {
        const result: any = await staffService.GetNewsList(staffId)
        if (!result) return res.status(400).json({ message: 'wrong data', status: 'rejected' })
        return res.status(200).json({
          message: 'news was found',
          status: 'complete',
          content: result
        })
      }
      if (isAdmin === true) {
        const result: any = await adminService.GetNewsListForAdmin()
        if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })
        return res.status(200).json({
          message: 'news was found',
          status: 'complete',
          content: result
        })
      }

      return res.status(500).json({ message: 'some server error', status: 'rejected' })

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
    try {
      // add promocode & add before sign up

      const { date, value, currency, notification, staffId, domainName, counter } = req.body
      console.log('body is: ', req.body);

      const codesArray: any = await staffService.CreatePromocode(date, value, currency, notification, staffId, domainName, counter)
      console.log('operation result is: ', codesArray);

      if (!codesArray[0]) {
        return res.status(400).json({
          message: 'wrong data',
          status: 'rejected'
        })
      }
      return res.status(201).json({
        message: 'code was created',
        codesArray: codesArray,
        status: 'complete'
      })

    } catch (e) {
      next(e)
    }
  }

  async getPromocodeListForStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('req body is: ', req.body)

      const adminPermission: boolean = req.body.isAdmin
      const staffPremission: boolean = req.body.isStaff
      // const domainName: string = req.body.domainName
      let staffId: string = req.body.id
      let staffEmail: string = req.body.staffEmail
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        staffId = 'xx999xx--001'
        staffEmail = 'root'

        const codesList: any = await adminService.GetPromocodeListForAdmin()
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.status(200).json({
          promocodeList: null,
          status: 'complete'
        })

      }

      if (adminPermission === true) {
        const codesList: any = await adminService.GetPromocodeListForAdmin()
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.status(200).json({
          promocodeList: null,
          status: 'complete'
        })
      }

      if (staffPremission === true) {
        const codesList: any = await staffService.GetPromocodeListForStaff(staffId)
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.status(200).json({
          promocodeList: null,
          status: 'complete'
        })
      }
      return res.status(403).json({
        message: 'permission denied',
        status: 'rejected'
      })
    } catch (e) {
      next(e)
    }
  }

  async removePromocode(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const code: string = req.body.promocode

      const result: boolean = await staffService.RemovePromocode(code)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(200).json({ message: 'code was delete', status: 'complete' })
    } catch (e) {
      next(e)
    }
  }

  async getUsedPromocodeListForStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('req body is: ', req.body)

      const adminPermission: boolean = req.body.isAdmin
      const staffPermission: boolean = req.body.isStaff
      // const domainName: string = req.body.domainName
      let staffId: string = req.body.id
      let staffEmail: string = req.body.staffEmail
      const rootAccess: boolean = req.body.rootAccess

      if (rootAccess === true) {
        staffId = 'xx999xx--001'
        staffEmail = 'root'

        const codesList: any = await adminService.GetPromocodeListForAdmin()
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.status(200).json({
          promocodeList: null,
          status: 'complete'
        })

      }

      if (adminPermission) {
        const codesList: any = await adminService.GetUsedPromocodeListForAdmin()
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.status(200).json({
          promocodeList: null,
          status: 'complete'
        })
      }
      if (staffPermission) {
        const codesList: any = await staffService.GetUsedPromocodeList(staffId)
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.status(200).json({
          promocodeList: null,
          status: 'complete'
        })

      }
      return res.status(403).json({
        message: 'permission denied',
        status: 'rejected'
      })
    } catch (e) {
      next(e)
    }
  }

  async deleteUsedPromocodes(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const adminPermission: boolean = req.body.isAdmin
      const staffPermission: boolean = req.body.isStaff
      const staff_id: string = req.body.id

      if (adminPermission) {
        const result: boolean = await adminService.DeleteUsedPromocodesAsAdmin()
        if (!result) return res.status(500).json({ message: 'internal server error.' })

        res.status(200).json({ message: 'OK' })
      }
      if (staffPermission && !adminPermission) {
        const result: boolean = await staffService.DeleteUsedPromocodesAsStaff(staff_id)
        if (!result) return res.status(500).json({ message: 'internal server error.' })
        res.status(200).json({ message: 'OK' })
      }

      return res.status(403).json({ message: 'permission denied' })
    }
    catch (e) {
      next(e)
    }
  }

  async secureDeal(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // secure deal
    } catch (e) {
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


  async getTermsByDomainName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domainName: string = req.body
      console.log('req body is: ', req.body);
      const result: any = await staffService.GetTermsByDomainName(domainName)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })
      res.status(202).json({ message: 'terms was updated', status: 'complete' })
    } catch (e) {
      next(e)
    }
  }

  async updateTerms(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { domainName, termsBody } = req.body
      console.log('req body is: ', req.body);
      const result: any = await staffService.UpdateTerms(domainName, termsBody)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })
      res.status(202).json({ message: 'terms was updated', status: 'complete' })
    } catch (e) {
      next(e)
    }
  }

  async projectSupport(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('req. body: ', req.body);

      const wallet: string | undefined = process.env.SUPPORT_WALLET
      console.log('wallet is: ', wallet);

      return res.status(202).json({
        wallet: wallet,
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async projectSupportRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const staffEmail: string = req.body.staffEmail
      const title: string = req.body.title
      const message: string = req.body.message

      console.log('req body is: ', req.body);
      if (!staffEmail && !title && !message) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      await telegram.sendProjectSupportMessage(staffEmail, title, message)
      res.status(200).json({ message: 'done' })
    } catch (e) {
      next(e)
    }
  }



  async makeWithdrawalForUserAsStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)

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

    try {
      const result: boolean = await moneyService.MakeWithdrawalAsStaff(transfer_object, staffId)
      console.log('result is: ', result)
      if (!result) return res.status(400).json({ message: 'wrong data' })
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }


  async createDepositForUserAsStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)

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

    try {

      const result: boolean = await moneyService.MakeDepositAsStaff(transfer_object, staffId)
      console.log('operation result is: ', result)
      if (!result) return ApiError.ServerError()
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async createWithdrawalAsStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)

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

    try {
      const result: boolean = await moneyService.MakeWithdrawalAsStaff(transfer_object, staffId)
      console.log('result is: ', result)
      if (!result) return res.status(400).json({ message: 'wrong data' })
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async createInternalTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)

    const transfer_object: INTERNAL_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      secondPartyEmail: req.body.secondPartyEmail,
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

    try {

      const result: boolean = await moneyService.MakeInternalTransfer(transfer_object, staffId)
      console.log('result is: ', result)
      if (!result) return res.status(400).json({ message: 'wrong data' })
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getTransactionsHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)
    const staffId: string = req.params.userId

    if (!staffId) return res.status(400).json({ message: 'wrong data' })
    try {

      const deposit: any = await UserServices.GetDepositHistory(staffId)
      const withdraw: any = await UserServices.GetWithdrawalHistory(staffId)
      const internal: any = await UserServices.GetInternalTransferHistory(staffId)
      const dataArray = [
        deposit,
        withdraw,
        internal
      ]
      console.log('history data is => ', dataArray);

      if (!dataArray.length) return res.status(500).json({ message: 'internal server error' })
      return res.status(200).json({
        message: 'ok',
        history: dataArray,
        sortBy: [
          'deposit history array',
          'withdraw history array',
          'internal history array'
        ]
      })
    } catch (e) {
      next(e)
    }
  }

}

export default new StaffController()