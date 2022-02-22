import TelegramBot from 'node-telegram-bot-api'
const token: any = process.env.TELEGRAM_2FA_BOT_TOKEN
const bot = new TelegramBot(token, {polling: true})

//
// export default async function SendMessageTwoStepVerification(domain_name: string, code: string) {
//
//   if (!domain_name && !code) return console.log ('request error')
//
//   bot.onText(/\/start/, async (msg) => {
//     const chatId = msg.chat.id
//     await bot.sendMessage(chatId, `Welcome to ${domain_name} two factor authentication bot.`)
//     await bot.sendMessage(chatId, `Your two factor authenticate code at ${domain_name} is: ` + '\n' + `${code}`)
//   })
//
//   bot.onText(/\/getmychat_id/, async (msg) => {
//     const chatId = msg.chat.id
//     await bot.sendMessage(chatId, `Your chat id is: ${chatId}`)
//   })
//
//   bot.on('message', async (msg) => {
//     const chatId = msg.chat.id
//     if( msg.text !== '/getmychat_id' && msg.text !== '/start' ) {
//       // console.log(msg)
//       console.log('wrong text')
//       await bot.sendMessage(chatId, 'Received your message, but you can get only 2fa code or your tg chatID in this bot =( ')
//     }
//   })
// }

export default async function SendTwoStepCode(domain_name: string, code: string){
  if (!domain_name && !code) return console.log ('request error')
  await bot.sendMessage(chatId, `Your two factor authenticate code at ${domain_name} is: ` + '\n' + `${code}`)
}