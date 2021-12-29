import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'

class StaffController {

  async staffDashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get main info 

    } catch (e) {
      next(e)
    }
  }

  async users(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // get all users list
    } catch (e) {
      next(e)
    }
  }

  async kyc(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get all users & their kyc
    } catch (e) {
      next(e)
    }
  }

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

  async logs(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get all users logs
    } catch (e) {
      next(e)
    }
  }

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

  async domains(req: express.Request, res: express.Response, next: express.NextFunction) {
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

  async createNewUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // create user request
    } catch (e) {
      next(e)
    }
  }

  async promocode(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // add promocode & add before sign up
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

  async ercTwenty(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      //  ????
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