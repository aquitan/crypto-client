import * as express from 'express'
import ApiError from '../exeptions/api_error'

export default function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error(err)
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'server error' })
}