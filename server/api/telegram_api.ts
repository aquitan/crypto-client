import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

async function SendMessage(userRequest: string, currentChatId?: string) {

  // https://github.com/axios/axios/blob/master/test/typescript/axios.ts

  if (userRequest) {
    const message: string = encodeURI(userRequest)

    console.log('log from server :', userRequest)
    const token: string | undefined = process.env.TELEGRAM_TOKEN
    let chatId: string | undefined

    if (currentChatId) {
      chatId = currentChatId
    } else {
      chatId = process.env.TELEGRAM_CHAT_ID
    }

    const url: string = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`

    const config: AxiosRequestConfig = {
      method: 'GET',
      data: userRequest,
      responseType: 'stream'
    }
    const handleResponse = (response: AxiosResponse) => {
      console.log(response.status)
      console.log(response.statusText)
    }

    const handleError = (error: AxiosError) => {
      if (error.response) {
        // console.log(error.response.data)
        console.log(error.response.status)
        // console.log(error.response.headers)
      } else {
        console.log(error.message)
      }
    }

    await axios(url, config)
      .then(handleResponse)
      .catch(handleError)
  }
}

// main logic

class Telegram {

  async sendMessageByUserActions(userEmail: string, page_name: string, domain_name: string) {
    // user actions bot 

    const userRequest: string = `Пользователь ` + `${userEmail}` + ` зашел на  ` + `${page_name}` + ` на домене ` + `${domain_name}`
    console.log(userRequest)
    await SendMessage(userRequest)
  }

  async sendMessageSignup(userEmail: string, domain_name?: string) {

    // const userRequest: string = `User ` + `${userEmail}` + ` was registred at ` + ` ${domain_name}`
    const userRequest: string = `Пользователь ` + `${userEmail}` + ` зарегистрировался на ` + ` ${domain_name}`
    console.log(userRequest)
    await SendMessage(userRequest)
  }

  async sendMessageSignIn(userEmail: string, domain_name?: string) {

    // const userRequest: string = `User ` + `${userEmail}` + ` was login at ` + ` ${domain_name}`
    const userRequest: string = `Пользователь ` + `${userEmail}` + ` зашел на  ` + ` ${domain_name}`
    console.log(userRequest)
    await SendMessage(userRequest)
  }

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
    // secure deal guarant message
  }

  async sendMessageToSecureDealChatAsStaff() {
    // secure deal guarant message
  }

  async sendMessageFromContactUs(email: string, text: string, phone: number) {
    // const userRequest: string = `Request to contact from user : ` + '\n' + `${email}` + `\n` + `${phone}` + `\n` + `${text}`
    const userRequest: string = `Новый запрос в contact us от пользователя ` + '\n' + `${email}` + `\n` + `${phone}` + `\n` + `${text}`
    console.log(userRequest)
    await SendMessage(userRequest)
  }
}

export default new Telegram()