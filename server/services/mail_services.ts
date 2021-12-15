// import {
//   TransportOptions,
//   createTransport,
//   sendMail
// } from 'nodemailer'
// import * as dotenv from 'dotenv'
// dotenv.config()

// class MailService {

//   constructor() {
//     this.transporter:= nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD
//       }
//     })
//   }

//   async sendActivationMail(to: string, link: string) {
//     await this.transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: to,
//       subject: 'Account activate ' + process.env.API_URL,
//       text: '',
//       html:
//         `
//           <div>
//             <h1>Click to activate: </h1>
//             <a href='${link}'>${link}</a>
//           </div>
//         `
//     })
//   }
// }

// export default new MailService()