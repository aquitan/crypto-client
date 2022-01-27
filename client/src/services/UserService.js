import $api from "../API";

export default class UserService {
   static fetchUsers() {
      return $api.get('/users')
   }

   static postUserDetailData(obj) {
      return $api.post('/123', obj)
   }
   static editUser(obj) {
      return $api.post('/personal_area/profile/edit/', obj)
   }
}