import express from 'express'
import * as http from 'http'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import Telegram from './api/telegram_api'
import { mysqlConnect } from './config/mysql_config'
import router from './routes/index'

import CORS_OPTIONS from './config/cors_config'

const server = http.createServer(app)
const PORT: any = process.env.PORT

app.use(cors(CORS_OPTIONS))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.disable('x-powered-by')

// routers
app.use('/api', router)


async function Connection() {
  // connect to mongo
  // await mongo
  // start tg bots
  await Telegram.TwoFactorBotGreeting()
  // connect to mysql
  await mysqlConnect()
  console.log('process..')
}

server.listen(PORT, async () => {
  try {
    console.clear()
    await Connection()
  } catch (e: any) {
    return console.error(new Error(e))
  }
})

// https://tproger.ru/translations/guide-to-threads-in-node-js/   clone threads

// 2fa google 
// https://medium.com/@allistair.vilakazi/2fa-with-node-js-and-google-authenticator-7ddd44881493


// autopayment + wallet generator + seed phrase generator

// https://www.quicknode.com/guides/web3-sdks/how-to-send-a-transaction-on-solana-using-javascript
// https://www.npmjs.com/package/node-ethereum-wallet

// https://github.com/sagivo/accept-bitcoin

// https://www.npmjs.com/package/bitcoinjs-lib#examples