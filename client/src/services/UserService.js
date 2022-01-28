import $api from "../API";

export default class UserService {
   static fetchUsers() {
      return $api.get('/users')
   }

   static postUserDetailData(path, obj) {
      return $api.patch(path, obj)
   }
   static editUser(obj) {
      return $api.patch('/personal_area/profile/edit/', obj)
   }
   static getWallets(obj) {
      return $api.patch('/123', obj)
   }
   static sendLogs(path, obj) {
      return $api.post(path, obj)
   }
}