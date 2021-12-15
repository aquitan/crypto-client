import express from 'express'
import * as http from 'http'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import compression from 'compression'

import router from './routes/index'
import CORS_OPTIONS from './config/cors_config'

const server = http.createServer(app)
const PORT: any = process.env.PORT

function FreePort(port: number): any {
  console.log(port, ' was used')
  const clear = process.kill(port)
  console.log('done.')
  return clear
}


app.use(cors(CORS_OPTIONS))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.disable('x-powered-by')


// routers
app.use('/api', router)

// const request_url = req.protocol + '://' + req.hostname + ':' + process.env.PORT + req.path



server.listen(PORT, () => {
  try {
    if (process.pid === PORT) {
      console.log('port is busy..');

      FreePort(process.pid)
    }
    console.clear()
    console.log('process..')
    console.log(process.env.PORT);
  } catch (e: any) {
    console.error(new Error(e))
  }
})

