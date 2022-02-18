import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import UserServices from '../services/user_services'
import telegram from '../api/telegram_api'
import codeGenerator from '../api/password_generator'
import auth_services from '../services/auth_services'


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

      if (user.hasOwnProperty('withoutLogs') && user.withoutLogs === true) {
        return res.status(200).json({ user: user })
      }

      await saveUserLogs(id, email, ipAddress, city, countryName, coordinates, currentDate, 'перешел на dashboard', domainName)
      await telegram.sendMessageByUserActions(email, ' перешел на dashboard ', domainName)

      return res.status(200).json({ user: user })
    } catch (e) {
      next(e)
    }
  }

  async personalAreaProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get accoutn personal info
      interface userData {
        userId: number
        userEmail: string
        ipAddress: string
        city: string
        countryName: string
        coordinates: string
        currentDate: string
        userAction: string
        domainName: string
      }

      const transfer_object: userData = {
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        ipAddress: req.body.ipAddress,
        city: req.body.city,
        countryName: req.body.countryName,
        coordinates: req.body.coordinates,
        currentDate: req.body.currentDate,
        userAction: req.body.userAction,
        domainName: req.body.domainName
      }
      console.log('req body: ', req.body);

      const user: any = await UserServices.personalAreaProfile(transfer_object.userId)
      console.log('found user is: ', user)

      if (!user) return res.status(400).json({ user: 'not found', status: 'rejected' })

      if (user.hasOwnProperty('withoutLogs') && user.withoutLogs === true) return res.status(200).json({ user: user, status: 'complete' })

      await saveUserLogs(transfer_object.userId, transfer_object.userEmail, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.currentDate, `перешел на ${transfer_object.userAction} `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` перешел на ${transfer_object.userAction}`, transfer_object.domainName)
      return res.status(200).json({ user: user, status: 'complete' })

    } catch (e) {
      next(e)
    }
  }

  async usePromocodeInProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      interface reqObject {
        userId: number
        userEmail: string
        ipAddress: string
        city: string
        countryName: string
        coordinates: string
        currentDate: string
        userAction: string
        domainName: string
        promocode: string
      }
      console.log('req body: ', req.body);

      const transfer_object: reqObject = {
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        ipAddress: req.body.ipAddress,
        city: req.body.city,
        countryName: req.body.countryName,
        coordinates: req.body.coordinates,
        currentDate: req.body.currentDate,
        userAction: req.body.userAction,
        domainName: req.body.domainName,
        promocode: req.body.code
      }

      const result: any = await UserServices.UsePromocodeInProfile(transfer_object.promocode)
      if (result === false) return res.status(400).json({ message: 'wrong data' })

      const rebasePromo: boolean = await auth_services.rebasePromocodeToUsed(transfer_object.promocode, transfer_object.userEmail)
      if (rebasePromo === false) return res.status(500).json({ message: 'internal server error' })
      await saveUserLogs(transfer_object.userId, transfer_object.userEmail, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.currentDate, ` использовал промокод ${transfer_object.promocode} на `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` использовал промокод ${transfer_object.promocode} `, transfer_object.domainName)
      return res.status(200).json({ message: 'ok' })

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
      await saveUserLogs(userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, ` поменял имя на ${userName} `, domainName)
      await telegram.sendMessageByUserActions(userEmail, ` поменял имя на ${userName} `, domainName)
      return res.json({
        message: 'name was changed',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

  async twoStepVerificationEnable(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      interface dataObject {
        twoFaType: string
        twoFaStatus: boolean
        domainName: string
        userId: number
        userEmail: string
        code: string
      }

      const code: string = await codeGenerator(8)
      console.log('generated code is: ', code);

      const transferObject: dataObject = {
        twoFaType: req.body.twoFaType,
        twoFaStatus: req.body.twoFaStatus,
        domainName: req.body.domainName,
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        code: code
      }
      const result: boolean = await UserServices.enableTwoStepVerification(transferObject)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(202).json({ message: '2fa was enabled', status: 'complete', userCode: code })


    } catch (e) {
      next(e)
    }
  }

  async enableTwoStepVerificationStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      interface UserParams {
        twoFaType: string
        userId: number
        userEmail: string
        domainName: string
        twoFaStatus: boolean
        enableDate: string
      }

      const transferObject: UserParams = {
        twoFaType: req.body.twoFaType,
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        domainName: req.body.domainName,
        twoFaStatus: req.body.twoFaStatus,
        enableDate: req.body.enableDate
      }

      const result: boolean = await UserServices.enableTwoStepVerificationStatus(transferObject)
      if (result === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

      return res.status(200).json({ message: '2fa turned on', status: 'complete' })
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

      await saveUserLogs(userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, ` выключил 2фа аутентификацию на`, domainName)
      await telegram.sendMessageByUserActions(userEmail, ` выключил 2фа аутентификацию `, domainName)
      return res.json({
        message: '2fa turned off',
        status: 'complete'
      })


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

  async personalAreaKyc(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      interface userData {
        userId: number
        userEmail: string
        firstName: string
        lastName: string
        phoneNumber: string
        dateOfBirth: string
        documentNumber: string
        mainAddress: string
        zipCode: number
        documentType: string
        ipAddress: string
        state: string
        city: string
        subAddress?: string
        countryName: string
        coordinates: string
        currentDate: string
        userAction: string
        domainName: string
        kycStatus: string
      }
      const transfer_object: userData = {
        userId: req.body.id,
        userEmail: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        documentNumber: req.body.documentNumber,
        mainAddress: req.body.mainAddress,
        zipCode: req.body.zipCode,
        documentType: req.body.documentType,
        ipAddress: req.body.ipAddress,
        state: req.body.state,
        city: req.body.city,
        subAddress: req.body.subAddress,
        countryName: req.body.countryName,
        coordinates: req.body.coordinates,
        currentDate: req.body.currentDate,
        userAction: req.body.userAction,
        domainName: req.body.domainName,
        kycStatus: 'pending'
      }


      console.log('req body kyc: ', req.body);


      const result: boolean = await UserServices.personalAreaSendKyc(transfer_object)
      console.log('operation result is: ', result)

      if (result === false) return res.status(400).json({ message: 'kyc already added' })

      await saveUserLogs(transfer_object.userId, transfer_object.userEmail, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.currentDate, ' отправил KYC ', transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ' отправил KYC ', transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

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