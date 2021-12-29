import $api from "../API";

export default class UserService {
   static fetchUsers() {
      return $api.get('/users')
   }
}