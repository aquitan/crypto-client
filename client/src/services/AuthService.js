import $api from "../API";

export default class AuthService {
    static async login(email, password, domainName) {
        return $api.post('/login', {email, password, domainName})
    }

    static async registration(email, password, name, domainName, datetime, promocode = 'empty') {
        return $api.post('/registration', {email, password, name, domainName, datetime, promocode})
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async activation(activationLink, user_id) {
        return $api.post('/activate', {activationLink, user_id})
    }
}