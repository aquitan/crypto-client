
import baseUserData from '../models/User_base_data.model'
import userNotif from '../models/User_notifications.model'


class NotificationServices {

  async CreateNotification(object: any) {
    const user: any = await baseUserData.findOne({ email: object.user_email })
    if (!user) return false
    await userNotif.create({
      notifText: object.notificationText,
      userDomain: object.domainName,
      userEmail: object.userEmail,
      userId: user.id
    })
    return true
  }

  async GetNotificationForUser(user_id: string) {
    const notificationList: any = await userNotif.find({ userId: user_id })
    console.log('notificationList is =>  ', notificationList);
    if (!notificationList) return false
    return notificationList
  }

  async deleteNotification(notifId: string) {
    const curNotif: any = await userNotif.findOne({ _id: notifId })
    console.log('cur notif is => ', curNotif);
    if (!curNotif) return false

    await userNotif.deleteOne({ _id: notifId })

    const checkNotif: any = await userNotif.findOne({ _id: notifId })
    console.log('found notif is => ', checkNotif);
    if (checkNotif) return false
    return true

  }


}

export default new NotificationServices()