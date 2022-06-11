import TelegramBot from 'node-telegram-bot-api'
import userService from '../services/user_services'
import SendActionMessage from '../config/telegram_action_message'
const token: any = process.env.TELEGRAM_2FA_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

class Telegram {

	async TwoFactorBotGreeting() {
		bot.onText(/\/start/, async (msg) => {
			const chatId = msg.chat.id
			await bot.sendMessage(chatId, `Welcome, ${msg.chat.first_name}! Two factor authentication bot is activate.`)
		})

		// bot.on('message', async (msg) => {
		// 	const chatId = msg.chat.id
		// 	if (msg.text !== '/getmychat_id' && msg.text !== '/start') {
		// 		console.log(msg)
		// 		console.log(' => wrong text in 2fa tg bot' + ' ( ' + msg.text + ' ) .')
		// 		await bot.sendMessage(chatId, 'Received your message, but you can get only 2fa code or your tg chatID in this bot =( ')
		// 	}
		// })

		bot.onText(/\/getmychat_id/, async (msg) => {
			const chatId = msg.chat.id
			await bot.sendMessage(chatId, `Your chat id is: ${chatId}`)
		})

		bot.on('message', async (msg) => {
			console.log('message is => ', msg);

			const result: boolean | any = await userService.validateTwoStepCodeAtEnable2fa(msg.text)
			if (!result) {
				await bot.sendMessage(msg.chat.id, `two step code validation error.`)
				return console.log('request error')
			}

			let dataObj = {
				twoFaType: 'telegram',
				userId: result.userId,
				userEmail: result.userEmail,
				domainName: result.domainName,
				twoFaStatus: true,
				enableDate: new Date().getTime()
			}

			await userService.enableTwoStepVerificationStatus(dataObj, msg.chat.id)
			await bot.sendMessage(msg.chat.id, `Success! `)
		})

	}

	async SendTwoStepCode(chatId: number, domain_name: string, code: string) {
		if (!domain_name && !code && !chatId) return console.log('request error')
		await bot.sendMessage(chatId, `Your two factor authenticate code at ${domain_name} is: ` + '\n' + `${code}. The Code will be deleted five minutes after this message.`)

		// bot.on('message', async () => {
		// })
	}

	// async ValidateCode() {

	// }



	// async sendLoginMessageToUser(chatId: string, message: string) {
	// 	await bot.sendMessage(chatId, message)
	// }

	async sendMessageByUserActions(userEmail: string, page_or_action: string, domain_name: string) {
		// user actions bot
		if (!userEmail && !domain_name && !page_or_action) return console.log('wrong request data')
		const userRequest: string = `Пользователь ` + `${userEmail}` + `${page_or_action}` + ' на ' + `${domain_name}`
		console.log(userRequest)
		await SendActionMessage(userRequest)
	}

	async sendMessageByStaffActions(userEmail: string, action: string, domain_name: string) {
		// user actions bot
		if (!userEmail && !domain_name && !action) return console.log('wrong request data')
		const userRequest: string = `Стафф ` + `${userEmail}` + `${action}` + ' на ' + `${domain_name}`
		console.log(userRequest)
		await SendActionMessage(userRequest)
	}
	// async enable2fa(domain_name: string, code: string) {
	// 	// 2fa code sender & get chat ID command
	// 	if (!domain_name && !code) return console.log('wrong request data')
	// 	console.log('send => ', domain_name, code)
	// 	await this.SendTwoStepCode(domain_name, code)
	// }

	// async send2faMessage(domain_name: string, code: string) {
	// 	// 2fa code sender & get chat ID command
	// 	if (!domain_name && !code) return console.log('wrong request data')
	// 	console.log('send => ', domain_name, code)
	// 	await this.SendTwoStepCode(domain_name, code)
	// }

	async getMessageFromSupportChat() {
		// get platform support message to tg
	}

	async sendMessageToSupportChat() {
		// send message to  platform support chat
	}

	async getMessageFromSecureDealChat() {
		// secure deal required guarantor message
	}

	async sendMessageToSecureDealChatAsGuarantor() {
		// secure deal guarantor message
	}

	async sendMessageToSecureDealChatAsStaff() {
		// secure deal guarantor message
	}

	async sendMessageFromContactUs(email: string, text: string, phone: number) {
		if (!email && !text && !phone) return console.log('wrong request data')
		// const userRequest: string = `Request to contact from user : ` + '\n' + `${email}` + `\n` + `${phone}` + `\n` + `${text}`
		const userRequest: string = `Новый запрос в contact us от пользователя ` + '\n' + `${email}` + `\n` + `${phone}` + `\n` + `${text}`
		console.log(userRequest)
		await SendActionMessage(userRequest)
	}

	async sendProjectSupportMessage(staffEmail: string, title: string, message: string) {
		if (!staffEmail && !title && !message) return console.log('wrong request data')

		const userRequest: string = `Стафф  ` + `${staffEmail}` + ' оставил сообщение: ' + '\n' + `${title}` + `\n` + `${message}`
		console.log(userRequest)
		await SendActionMessage(userRequest)
	}


}

export default new Telegram()