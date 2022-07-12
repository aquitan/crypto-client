import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

export default async function SendMessage(userRequest: string, currentChatId?: number) {
  if (!userRequest) return console.log('request error')

  const message: string = encodeURI(userRequest)
  const token: string | undefined = process.env.TELEGRAM_TOKEN
  let chatId: any

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