import express from 'express'
import * as http from 'http'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import UserAgent from 'express-useragent'
import compression from 'compression'
import mongo from './config/mongo_DB_config'
import router from './routes/index'

import CORS_OPTIONS from './config/cors_config'

const server = http.createServer(app)
const PORT: any = process.env.PORT

app.use(cors(CORS_OPTIONS))
app.use(express.json())
app.use(UserAgent.express())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.disable('x-powered-by')

// routers
app.use('/api', router)

// const request_url = req.protocol + '://' + req.hostname + ':' + process.env.PORT + req.path

// some info about multidomains services
// https://stackoverflow.com/questions/11960705/expressjs-server-how-to-handle-multiple-domains

// autopayment + wallet generator + seed phrase generator
// https://www.npmjs.com/package/node-ethereum-wallet

async function Connection() {
  await mongo
  console.log('process..')
}

server.listen(PORT, async () => {
  try {
    if (process.pid === PORT) {
      console.log('port is busy..')
      process.kill(process.pid)
    }
    console.clear()
    await Connection()
  } catch (e: any) {
    console.error(new Error(e))
  }
})

