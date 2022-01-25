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

  async sendActivationMail(to: string, user_domain: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: 'Activate account at ' + `${user_domain}`,
      text: '',
      html:
        `
          <div>
            <h1>Copy this string and past in activation form at the  '${user_domain}': </h1>
            <p>${link}</p>
          </div>
        `
    })
  }

  async sendNewPassword(to: string, user_domain: string, password: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: 'New password at ' + `${user_domain}`,
      text: '',
      html:
        `
          <div>
            <h1>Your new password at '${user_domain}': </h1>
            <p>${password}</p>
          </div>
        `
    })
  }
}

export default new MailService()