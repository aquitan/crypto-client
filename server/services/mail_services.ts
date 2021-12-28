import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const SMTP_HOST: string | any = process.env.SMTP_HOST
const SMTP_PORT: number | any = process.env.SMTP_PORT

class MailService {
  transporter: any

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: 'Account activate ' + process.env.API_URL,
      text: '',
      html:
        `
          <div>
            <h1>Click to activate: </h1>
            <a href='${link}'>${link}</a>
          </div>
        `
    })
  }
}

export default new MailService()