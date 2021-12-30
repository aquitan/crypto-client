import express from 'express'
import * as http from 'http'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import mongo from './config/mongo_DB_config'
import router from './routes/index'
import authChecker from './middlewares/auth_middleware'
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
app.use('/api', authChecker, router)

// const request_url = req.protocol + '://' + req.hostname + ':' + process.env.PORT + req.path

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

