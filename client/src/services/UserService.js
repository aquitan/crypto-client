import $api from "../API";

export default class UserService {
   static fetchUsers() {
      return $api.get('/users')
   }

   static postUserDetailData(obj) {
      return $api.post('/123', obj)
   }
   static editUser(obj) {
      return $api.patch('/personal_area/profile/edit/', obj)
   }
   static getWallets(obj) {
      return $api.patch('/123', obj)
   }
}