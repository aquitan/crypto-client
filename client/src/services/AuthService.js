import $api from "../API";

export default class AuthService {
    static async login(email, password, domain_name) {
        return $api.post('/login', {email, password, domain_name})
    }

    static async registration(email, password, name, domain_name, datetime) {
        return $api.post('/registration', {email, password, name, domain_name, datetime})
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async activation(activationLink, user_id) {
        return $api.post('/activate', {activationLink, user_id})
    }
}