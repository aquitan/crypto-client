import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import authService from '../services/auth_services'
import telegram from '../api/telegram_api'

class AuthController {

  async getDomainParams(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domain_name: string = req.body.domainName
      const result: any = await authService.GetDomainInfo(domain_name)
      if (result === false) return res.status(400).json({ message: 'rejected' })

      return res.status(200).json({ domainInfo: result })
    } catch (e) {
      next(e)
    }
  }

  async getPromocodeList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const domainName: string = req.body.domainName
      console.log('body from front: ', req.body);

      const promocodeList: any = await authService.GetPromocodeListBeforeSignup(domainName)
      console.log('promocodeList', promocodeList);
      if (promocodeList === false) return res.status(200).json({ promocode: false })

      return res.status(200).json({ promocode: true })

    } catch (e) {
      next(e)
    }
  }

  async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('validation error', errors.array()))
      }

      interface userData {
        email: string
        password: string
        name?: string
        promocode: string
        domainName: string
        ipAddress: string
        city: string
        countryName: string
        coordinates: string
        currentDate: string
        doubleDeposit: boolean
        depositFee: number
        rateCorrectSum: number
        minDepositSum: number
        minWithdrawalSum: number
        currencySwapFee: number
      }

      const transfer_object: userData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        promocode: req.body.promocode,
        domainName: req.body.domainName,
        ipAddress: req.body.ipAddress,
        city: req.body.city,
        countryName: req.body.countryName,
        coordinates: req.body.coordinates,
        currentDate: req.body.currentDate,
        doubleDeposit: req.body.doubleDeposit,
        depositFee: req.body.depositFee,
        rateCorrectSum: req.body.rateCorrectSum,
        minDepositSum: req.body.minDepositSum,
        minWithdrawalSum: req.body.minWithdrawalSum,
        currencySwapFee: req.body.currencySwapFee
      }

      if (transfer_object.promocode !== 'empty') {
        const result: boolean = await authService.rebasePromocodeToUsed(transfer_object.promocode, transfer_object.email)
        if (result === true) {
          const userData = await authService.registration(transfer_object)
          res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 4 * 60 * 60 * 1000,
            httpOnly: true
          })
          await telegram.sendMessageByUserActions(transfer_object.email, ` зарегистрировался по  промокоду ${transfer_object.promocode}`, transfer_object.domainName)
          await authService.SaveAuthLogs(userData[0].ID, transfer_object.email, transfer_object.ipAddress, transfer_object.city, transfer_object.countryName, transfer_object.coordinates, transfer_object.currentDate, ' зарегистрировался на ', transfer_object.domainName)
          return res.status(201).json(userData)
        }
      }
      const userData = await authService.registration(transfer_object)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })

      await telegram.sendMessageByUserActions(transfer_object.email, ` зарегистрировался `, transfer_object.domainName)
      return res.status(201).json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getVerifiedPromocode(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const code: string = req.body.code
      const result: any = await authService.GetVerifiedPromocode(code)
      if (result === false) return res.status(400).json({ verivication: false })

      return res.status(202).json({ verivication: true })
    } catch (e) {
      next(e)
    }
  }

  async checkTwoStep(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const email: string = req.body.email
      const result: any = await authService.checkTwoStep(email)
      if (result === false) return res.status(202).json({ twoStepStatus: false })
      return res.status(202).json({ twoStepStatus: true })
    } catch (e) {
      next(e)
    }
  }

  async getVerifiedTwoStepCode(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const code: string = req.body.code
      const result: any = await authService.GetVerifiedTwoStepCode(code)
      if (result === false) return res.status(400).json({ verification: false })

      return res.status(202).json({ verification: true })
    } catch (e) {
      next(e)
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { email, password, domainName, ipAddress, city, countryName, coordinates, currentDate, browser, twoStepCode } = req.body
  
      if (email === process.env.SUPER_1_LOGIN && password === process.env.SUPER_1_PASSWORD) {
        console.log('root access is on by: ', email);
        res.cookie('refreshToken', process.env.ROOT_REFRESH_TOKEN, {
          maxAge: 30 * 4 * 60 * 60 * 1000,
          httpOnly: true
        })

        return res.status(200).json({
          accessToken: process.env.ROOT_ACCESS_TOKEN,
          refreshToken: process.env.ROOT_REFRESH_TOKEN,
          user: {
            email: 'email',
            password: 'password'
          },
          rootAccess: true
        })
      }

      const ip_match: boolean = await authService.GetUserIpLogs(ipAddress)
      console.log('ip address in database: ', ip_match);
      if (ip_match === true) {
        console.log('ip was matched!');
        await authService.SaveIpMatchLogs(email, ipAddress, currentDate, browser)
      }

      console.log('req.body: ', req.body);
      const userData: any = await authService.login(email, password, domainName, twoStepCode || null)
      if (userData === false) return res.status(400).json({ message: 'wrong data' })

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })

      console.log('auth log: ', userData);
      await authService.SaveAuthLogs(userData.user.ID, email, ipAddress, city, countryName, coordinates, currentDate, 'зашел на ', domainName)

      await telegram.sendMessageByUserActions(email, ' зашел', domainName)
      return res.status(200).json(userData)

    } catch (e) {
      next(e)
    }
  }

  async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const activationLink: string = req.body.activationLink
      const user_id: number = req.body.user_id

      const result: any = await authService.activate(user_id, activationLink)
      if (result === false) return res.status(401).json({ message: 'wrong data' })

      return res.status(202).json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }


  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const refreshToken: string = req.cookies.refreshToken
      console.log(refreshToken);
      if (refreshToken === process.env.ROOT_REFRESH_TOKEN) {
        res.clearCookie('refreshToken')
        return res.status(200).json({
          message: 'root user was disconnect',
          status: 'complete'
        })
      }
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { refreshToken } = req.cookies

      if (refreshToken === process.env.ROOT_REFRESH_TOKEN) {

        res.cookie('refreshToken', process.env.ROOT_REFRESH_TOKEN, {
          maxAge: 30 * 4 * 60 * 60 * 1000,
          httpOnly: true
        })

        return res.status(200).json({
          accessToken: process.env.ROOT_ACCESS_TOKEN,
          refreshToken: process.env.ROOT_REFRESH_TOKEN,
          user: {
            email: process.env.SUPER_1_LOGIN,
            password: process.env.SUPER_1_PASSWORD
          },
          fullAccess: true,
          status: 'complete'
        })
      }

      const userData: any = await authService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.status(200).json(userData)
    } catch (e) {
      next(e)
    }
  }

  async forgotPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

      const { email, domainName } = req.body
      console.log('req body: ', req.body);
      const result: boolean = await authService.forgotPassword(email, domainName)
      if (result === false) return res.status(400).json({
        message: 'wrong email address',
        status: 'rejected'
      })

      return res.status(202).json({
        message: 'new password was send to email.',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

}

export default new AuthController()