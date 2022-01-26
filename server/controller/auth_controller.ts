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

      if (promocodeList.length > 0) {
        return res.json({
          query_status: true,
          promocodeList: promocodeList,
          status: 'complete'
        })
      }
      if (promocodeList === false) {
        return res.json({
          query_status: false,
          status: 'complete'
        })
      }
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

      const { email, password, name, promocode, domainName, datetime } = req.body

      if (promocode !== 'empty') {
        const result: boolean = await authService.rebasePromocodeToUsed(promocode, email)
        if (result === true) {
          const userData = await authService.registration(email, password, promocode, domainName, datetime, name)
          res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 4 * 60 * 60 * 1000,
            httpOnly: true
          })
          await telegram.sendMessageByUserActions(email, ` зарегистрировался по  промокоду ${promocode}`, domainName)
          return res.json(userData)
        }
      }
      const userData = await authService.registration(email, password, promocode, domainName, datetime, name)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })
      await telegram.sendMessageByUserActions(email, ` зарегистрировался `, domainName)
      return res.json(userData)

    } catch (e) {
      next(e)
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { email, password, domainName } = req.body

      console.log('req.body: ', req.body);

      console.log('req pass: ', req.body.password);

      const userData = await authService.login(email, password, domainName)

      console.log('method', req.method)
      // console.log(req.useragent);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })

      await telegram.sendMessageByUserActions(email, ' зашел', domainName)
      return res.json(userData)

    } catch (e) {
      next(e)
    }
  }

  async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { activationLink, user_id } = req.body
      const result: any = await authService.activate(user_id, activationLink)
      return res.json(result)

    } catch (e) {
      next(e)
    }
  }


  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const refreshToken: string = req.cookies.refreshToken
      console.log(refreshToken);
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const userData = await authService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async forgotPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user: any = authService.forgotPassword(req.body.email)

      if (user === true) {
        return res.json({
          message: 'new password was send',
          status: 'complete'
        })
      }

      return res.json({
        message: 'wrong email address',
        status: 'rejected'
      })

    } catch (e) {
      next(e)
    }
  }

}

export default new AuthController()