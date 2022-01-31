import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import authService from '../services/auth_services'
import telegram from '../api/telegram_api'
import UserAgent from 'express-useragent'

class AuthController {

  async getPromocodeList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { domainName } = req.body
      console.log('body from front: ', req.body);

      const promocodeList: any = await authService.GetPromocodeListBeforeSignup(domainName)
      console.log('promocodeList', promocodeList);

      if (promocodeList === false) {
        return res.status(200).json({
          query_status: false,
          status: 'complete'
        })
      }
      return res.status(200).json({
        query_status: true,
        promocodeList: promocodeList,
        status: 'complete'
      })

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

      const { email, password, name, promocode, domainName, ipAddress, city, countryName, coordinates, currentDate } = req.body

      if (promocode !== 'empty') {
        const result: boolean = await authService.rebasePromocodeToUsed(promocode, email)
        if (result === true) {
          const userData = await authService.registration(email, password, promocode, true, domainName, currentDate, name)
          res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 4 * 60 * 60 * 1000,
            httpOnly: true
          })
          await telegram.sendMessageByUserActions(email, ` зарегистрировался по  промокоду ${promocode}`, domainName)
          await authService.SaveAuthLogs(userData[0].ID, email, ipAddress, city, countryName, coordinates, currentDate, 'арегистрировался на ', domainName)
          return res.status(201).json(userData)
        }
      }
      const userData = await authService.registration(email, password, promocode, true, domainName, currentDate, name)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })
      await telegram.sendMessageByUserActions(email, ` зарегистрировался `, domainName)

      return res.status(201).json(userData)

    } catch (e) {
      next(e)
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { email, password, domainName, ipAddress, city, countryName, coordinates, currentDate, browser } = req.body

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
            email,
            password
          },
          fullAccess: true,
          status: 'complete'
        })
      }
      const ip_match: boolean = await authService.GetUserIpLogs(ipAddress)
      console.log('ip address in database: ', ip_match);
      if (ip_match === true) {
        console.log('ip was matched!');
        await authService.SaveIpMatchLogs(email, ipAddress, currentDate, browser)
      }



      console.log('req.body: ', req.body);
      const userData: any = await authService.login(email, password, domainName)
      // console.log(req.useragent);

      if (userData === false) return res.status(400).json({ message: 'wrong data', status: 'rejected' })

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
      const { activationLink, user_id } = req.body
      const result: any = await authService.activate(user_id, activationLink)
      if (result === false) return res.status(401).json({ message: 'wrong data', status: 'rejected' })

      return res.status(202).json(result)
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
      const userData = await authService.refresh(refreshToken)

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

      const { email } = req.body
      console.log('req body: ', req.body);

      const result: boolean = await authService.forgotPassword(email)

      if (result === false) {
        return res.status(400).json({
          message: 'wrong email address',
          status: 'rejected'
        })
      }

      return res.status(202).json({
        message: 'new password was send',
        status: 'complete'
      })
    } catch (e) {
      next(e)
    }
  }

}

export default new AuthController()