import * as express from 'express'
import ApiError from '../exeptions/api_error'
import tokenService from '../services/token_services'

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) return next(ApiError.UnauthorizedError())

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) return next(ApiError.UnauthorizedError())
    
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) return next(ApiError.UnauthorizedError())

    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}