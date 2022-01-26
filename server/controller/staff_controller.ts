import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import staffService from '../services/staff_services'
import adminService from '../services/admin_services'

class StaffController {

  async staffDashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get main info 

      const user_id: any = req.params.id
      console.log('params is: ', req.params.id);
      const current_id: number = parseInt(user_id)
      console.log('int id is: ', current_id);

      return res.json({
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
        if (usersList !== 'error') {
          return res.json({
            usersList: usersList,
            status: 'complete'
          })
        }
      }
      if (staffPremisstion === true) {
        const usersList: any = await staffService.GetUsersList(userDomain)
        if (usersList !== 'error') {
          return res.json({
            usersList: usersList,
            status: 'complete'
          })
        }
      }

      return res.json({
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

      if (user) {
        return res.json({
          user: user,
          status: 'complete'
        })
      }
      return res.json({
        message: 'some querry error',
        status: 'rejected'
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
        if (usersKycList !== 'error') {
          return res.json({
            usersKycList: usersKycList,
            status: 'complete'
          })
        }
      }
      if (staffPremisstion === true) {
        const usersKycList: any = await staffService.GetKycForStaff(domainName)
        if (usersKycList !== 'error') {
          return res.json({
            usersKycList: usersKycList,
            status: 'complete'
          })
        }
      }

      return res.json({
        message: 'permission denied',
        status: 'rejected'
      })

    } catch (e) {
      next(e)
    }
  }

  async createNewUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      const { staffId, email, password, promocode, domainName, datetime, name } = req.body
      const result: boolean = await staffService.CreateUserAsStaff(staffId, email, password, promocode, domainName, datetime, name || '')

      if (result === true) {
        console.log('operation result is: ', result);
        return res.json({
          message: 'user was created',
          status: 'complete'
        })
      }

      return res.json({
        message: 'some server error',
        statusCode: 500,
        status: 'rejected'
      })
      // create user request
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

      if (codesArray !== []) {
        return res.json({
          message: 'code was created',
          codesArray: codesArray,
          status: 'complete'
        })
      }

      return res.json({
        message: 'something went wrong',
        status: 'rejected'
      })
    } catch (e) {
      next(e)
    }
  }

  async getPromocodeList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      console.log('req body is: ', req.body)

      const adminPermission: boolean = req.body.isAdmin
      const staffPremisstion: boolean = req.body.isStaff
      // const domainName: string = req.body.domainName
      const staff_id: number = req.body.id


      if (adminPermission === true) {
        const codesList: any = await adminService.GetPromocodeListForAdmin()
        if (codesList !== 'empty') {
          return res.json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.json({
          message: 'something went wrong',
          status: 'rejected'
        })

      }
      if (staffPremisstion === true) {
        const codesList: any = await staffService.GetPromocodeList(staff_id)
        if (codesList !== 'empty') {
          return res.json({
            promocodeList: codesList,
            status: 'complete'
          })
        }
        return res.json({
          message: 'something went wrong',
          status: 'rejected'
        })
      }

      return res.json({
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

  // async ercTwenty(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {
  //     //  ????
  //   } catch (e) {
  //     next(e)
  //   }
  // }

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