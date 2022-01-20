import $api from "../API";

export default class AuthService {
    static async login(email, password, domain_name) {
        return $api.post('/login', {email, password, domain_name})
    }

    static async registration(email, password, name) {
        return $api.post('/registration', {email, password, name})
    }

    static async logout() {
        return $api.post('/logout')
    }
}