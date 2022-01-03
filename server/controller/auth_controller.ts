import * as express from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api_error'
import authService from '../services/auth_services'

import UserAgent from 'express-useragent'

class AuthController {

  async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('validation error', errors.array()))
      }

      const { email, password, name } = req.body
      const userData = await authService.registration(email, password, name)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      // const errors = validationResult(req)
      // if (!errors.isEmpty()) {
      //   return next(ApiError.BadRequest('validation error', errors.array()))
      // }
      const { email, password } = req.body
      const userData = await authService.login(email, password)


      console.log('ip address: ', req.socket.remoteAddress);
      console.log('method', req.method);
      console.log('path: ', req.hostname + process.env.PORT + req.originalUrl);

      console.log(req.useragent);






      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 4 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const activationLink: string = req.params.link
      const clientUrl: string | any = process.env.CLIENT_URL
      await authService.activate(activationLink)
      return res.redirect(clientUrl)
    } catch (e) {
      next(e)
    }
  }


  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const refreshToken: string = req.cookies.refreshToken
      // console.log(refreshToken);
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
}

export default new AuthController()