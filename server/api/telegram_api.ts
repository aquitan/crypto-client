import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';


class Telegram {

  async sendMessageFromContactUs(name: string, email: string, phone: string, text: string) {

    const userRequest: any = [
      `Name: ${name}` + '\n',
      `Email: ${email}` + '\n',
      `Phone: ${phone}` + '\n',
      `Message: ` + '\n' + `${text}`
    ]

    console.log(userRequest)

    const message: string = encodeURI(userRequest)

    // https://github.com/axios/axios/blob/master/test/typescript/axios.ts
    if (userRequest) {
      console.log('log from server :', userRequest)
      const token: string | undefined = process.env.TELEGRAM_TOKEN
      const chatId: string | undefined = process.env.TELEGRAM_PERSONAL_CHAT_ID

      const url: string = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`


      const config: AxiosRequestConfig = {
        method: 'GET',
        data: userRequest,
        responseType: 'stream'
      }
      const handleResponse = (response: AxiosResponse) => {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        // console.log(response.config)
      }

      const handleError = (error: AxiosError) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log(error.message)
        }
      }

      await axios(url, config)
        .then(handleResponse)
        .catch(handleError)
    }
  }

  async sendMessageToActionsBot() {
    // user actions bot 
  }

  async sendMessageToNewUserBot() {
    // i someone sing up => send message
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
}