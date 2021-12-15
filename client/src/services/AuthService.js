import $api from "../API";


export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', {email, password})
    }
    static async register(email, password) {
        return $api.post('/register', {email, password})
    }
    static async logout() {
        return $api.post('/logout')
    }
}