import $api from "../API";
import { getSwitchQuery } from "../utils/getSwitchQuery";

export default class UserService {
   static fetchUsers() {
      return $api.get('/users')
   }

   static postUserDetailData(path, obj) {
      return $api.patch(path, obj)
   }
   static editUser(obj) {
      return $api.patch(getSwitchQuery('/personal_area/profile/edit_user_name/'), obj)
   }
   static getWallets(obj) {
      return $api.patch('/123', obj)
   }
   static sendLogs(path, obj) {
      return $api.post(path, obj)
   }
}