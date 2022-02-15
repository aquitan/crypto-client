import SendActionMessage from '../config/telegram_action_message'
import SendMessageTwoStepVerification from '../config/telegram_two_step_verification'

class Telegram {

  async sendMessageByUserActions(userEmail: string, page_or_action: string, domain_name: string) {
    // user actions bot 

    const userRequest: string = `Пользователь ` + `${userEmail}` + `${page_or_action}` + ' на ' + `${domain_name}`
    console.log(userRequest)
    await SendActionMessage(userRequest)
  }

  async sendMessageByStaffActions(userEmail: string, action: string, domain_name: string) {
    // user actions bot 

    const userRequest: string = `Стафф ` + `${userEmail}` + `${action}` + ' на ' + `${domain_name}`
    console.log(userRequest)
    await SendActionMessage(userRequest)
  }

  async send2faMessage(userEmail: string, domain_name: string, code: string) {


    // 

    // await SendMessageTwoStepVerification("To turn on two step verification on ", domain_name, " copy this code to ")
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
    await SendActionMessage(userRequest)
  }

  async sendProjectSupportMessage(staffEmail: string, title: string, message: string) {
    const userRequest: string = `Стафф  ` + `${staffEmail}` + ' оставил сообщение: ' + '\n' + `${title}` + `\n` + `${message}`
    console.log(userRequest)
    await SendActionMessage(userRequest)
  }
}

export default new Telegram()