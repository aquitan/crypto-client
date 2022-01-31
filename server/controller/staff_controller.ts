import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import staffService from '../services/staff_services'
import adminService from '../services/admin_services'
import telegram from '../api/telegram_api'

class StaffController {

  async staffDashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get main info 

      const user_id: any = req.params.id
      console.log('params is: ', req.params.id);
      const current_id: number = parseInt(user_id)
      console.log('int id is: ', current_id);

      return res.status(200).json({
        message: 'data will be here',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async usersList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      const adminPermission: boolean = req.body.isAdmin
      const staffPremisstion: boolean = req.body.isStaff
      const userDomain: string = req.body.domainName
      console.log('req body is: ', req.body)

      if (adminPermission === true) {
        const usersList: any = await adminService.GetUsersList()
        if (usersList !== false) {
          return res.status(200).json({
            usersList: usersList,
            status: 'complete'
          })
        }
      }
      if (staffPremisstion === true) {
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

      const user_id: any = req.params.id
      console.log('params is: ', req.params.id);
      const current_id: number = parseInt(user_id)
      console.log('int id is: ', current_id);

      const user: any = await staffService.GetUserDetail(current_id)
      console.log('found user: ', user)

      if (!user)
        return res.status(400).json({
          message: 'some querry error',
          status: 'rejected'
        })

      return res.status(200).json({
        user: user,
        status: 'complete'
      })


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
      const staffPremisstion: boolean = req.body.isStaff
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
      if (staffPremisstion === true) {
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
      const { status, staffId, staffEmail, userEmail, kycId, domainName } = req.body
      console.log('req body: ', req.body);

      const result: boolean = await staffService.changeKycStatusAsStaff(status, kycId)
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
      const { kycId, staffId, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);

      const result: boolean = await staffService.DeleteKyc(kycId)
      console.log('operation result is: ', result);

      if (result === false) {
        return res.status(400).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await telegram.sendMessageByStaffActions(staffEmail, ` удалил KYC юзера ${userEmail} на `, domainName)
      await staffService.saveStaffLogs(staffEmail, ` удалил KYC юзера ${userEmail} `, domainName, staffId)

      return res.status(202).json({
        message: 'kyc was delete',
        status: 'complete'
      })
    } catch (e) {

    }
  }

  async updatePremiumStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);

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
    } catch (e) {
      next(e)
    }
  }

  async updateSwapBan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);

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
      const { userId, staffId, status, staffEmail, userEmail, domainName, currentDate } = req.body
      console.log('req body: ', req.body);

      const result: boolean = await adminService.UpdateStaffStatus(staffEmail, currentDate, userId, status)
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

    } catch (e) {
      next(e)
    }
  }

  async updateStaffSupportName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { staffId, updatedName, staffEmail, domainName } = req.body
      console.log('req body: ', req.body);

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

    } catch (e) {
      next(e)
    }
  }

  async updateDoubleDeposit(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, status, staffEmail, userEmail, domainName } = req.body
      console.log('req body: ', req.body);

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

  async crearMatchIpList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, staffId, staffEmail, userEmail, domainName, ipAddress } = req.body
      console.log('req body: ', req.body);

      const result: boolean = await staffService.ClearMatchIpUsers(userId, ipAddress)
      if (result === false) {
        console.log('error');
        return res.status(401).json({
          message: 'error',
          status: 'rejected'
        })
      }

      await staffService.saveStaffLogs(staffEmail, ` очистил повторяющиеся IP пользователя ${userEmail} на`, domainName, staffId)
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

      const { staffEmail, staffId, email, password, promocode, domainName, datetime, name } = req.body
      const result: boolean = await staffService.CreateUserAsStaff(staffId, email, password, promocode, domainName, datetime, name || '')

      if (result === false) {
        return res.status(400).json({
          message: 'some server error',
          status: 'rejected'
        })
      }
      console.log('operation result is: ', result);
      await telegram.sendMessageByStaffActions(staffEmail, ` создал пользователя ${email} `, domainName)
      await staffService.saveStaffLogs(staffEmail, ` создал пользователя ${email}} `, domainName, staffId)
      return res.status(201).json({
        message: 'user was created',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  // async getUserLogs() {
  //   try {

  //     // chat with support
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }



  async support(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get active users in platform, chat.
    } catch (e) {
      next(e)
    }
  }

  // async wallet(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {

  //   } catch (e) {
  //     next(e)
  //   }
  // }

  async staffList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // get all users who has staff permissions 
    } catch (e) {
      next(e)
    }
  }

  async statistics(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // get staff users statictics (dep, withdrw, total staff users, staff domains, total 30d, chats)
    } catch (e) {
      next(e)
    }
  }

  async userErrors(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // add customization to user action errors
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

  async domainsAdd(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // add domain form + base user errors + active domains (id, domain_name, stadd user, date, actions with it)
    } catch (e) {
      next(e)
    }
  }

  async domainsList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // add domain form + base user errors + active domains (id, domain_name, stadd user, date, actions with it)
    } catch (e) {
      next(e)
    }
  }

  async addStaffWallets(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // post staff wirhdraw wallets and save
    } catch (e) {
      next(e)
    }
  }

  async promocodeCreate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // add promocode & add before sign up

      const { date, value, staff, domainName, counter } = req.body
      console.log('body is: ', req.body);

      const codesArray: any = await staffService.CreatePromocode(date, value, staff, domainName, counter)
      console.log('operation result is: ', codesArray);

      if (!codesArray[0]) {
        return res.status(201).json({
          message: 'code was created',
          codesArray: codesArray,
          status: 'complete'
        })
      }
      return res.status(500).json({
        message: 'something went wrong',
        status: 'rejected'
      })
    } catch (e) {
      next(e)
    }
  }

  async getPromocodeListForStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('req body is: ', req.body)

      const adminPermission: boolean = req.body.isAdmin
      const staffPremisstion: boolean = req.body.isStaff
      // const domainName: string = req.body.domainName
      const staff_id: number = req.body.id

      if (adminPermission === true) {
        const codesList: any = await adminService.GetPromocodeListForAdmin()
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
      }
      if (staffPremisstion === true) {
        const codesList: any = await staffService.GetPromocodeList(staff_id)
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
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

  async getUsedPromocodeListForStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('req body is: ', req.body)

      const adminPermission: boolean = req.body.isAdmin
      const staffPremisstion: boolean = req.body.isStaff
      // const domainName: string = req.body.domainName
      const staff_id: number = req.body.id

      if (adminPermission === true) {
        const codesList: any = await adminService.GetUsedPromocodeListForAdmin()
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
      }
      if (staffPremisstion === true) {
        const codesList: any = await staffService.GetUsedPromocodeList(staff_id)
        if (codesList !== false) {
          return res.status(200).json({
            promocodeList: codesList,
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



  async makeTransaction(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // add transaction to history
    } catch (e) {
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

  async staffWalletsList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      //  get & show staff wallets 
    } catch (e) {
      next(e)
    }
  }

  async addTerms(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      //  add how to block in frontend !
    } catch (e) {
      next(e)
    }
  }

  async projectSupport(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      //  add address for donation & get some info fiels from frontend to ask a question

    } catch (e) {
      next(e)
    }
  }

}

export default new StaffController()