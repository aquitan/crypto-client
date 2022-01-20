import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import UserServices from '../services/user_services'
import telegram from '../api/telegram_api'
// import database from '../services/database_query'

class UserController {

  async dashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // get user id & => 
      // get total balance & currency balances 
      const user: any = await UserServices.dashboard(req.body.id)

      await telegram.sendMessageDashboard(user.email, user.userDomain)
      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async personalAreaProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get accoutn personal info
      const user: any = await UserServices.personalAreaProfile(req.body.id)
      console.log('found user is: ', user)

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async personalAreaSecurity(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get accoutn security (2fa, login history)
    } catch (e) {
      next(e)
    }
  }

  async verification(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // post kyc form
    } catch (e) {
      next(e)
    }
  }

  async saveUserLogs(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const userLogs: any = {
        ip_address: req.body.ipAddress,
        user_city: req.body.city,
        country_name: req.body.countryName,
        location_on_map: req.body.coordinates,
        date_time: req.body.currentDate
      }
      console.log('recieved logs is: ', userLogs)

      if (userLogs) {
        return res.json('logs was recieved')
      }

      return res.json('logs was rejected')
      // post kyc form
    } catch (e) {
      next(e)
    }
  }

  async getUserLogs() {
    try {

      // chat with support
    } catch (e) {
      console.log(e)
    }
  }

  async support(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // chat with support
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

  async deposit(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // deposit form & history
    } catch (e) {
      next(e)
    }
  }

  async withdraw(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // withdraw form & history
    } catch (e) {
      next(e)
    }
  }

  async swap(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // swap between currencies
    } catch (e) {
      next(e)
    }
  }

  async internalTransfer(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // internal platform transfers
    } catch (e) {
      next(e)
    }
  }

  async secureDeal(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // secure deal form & history
    } catch (e) {
      next(e)
    }
  }

  async detailSecureDeal(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // current secure deal info & support chat
    } catch (e) {
      next(e)
    }
  }

}

export default new UserController()