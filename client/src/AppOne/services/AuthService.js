import $api from "../API";

export default class AuthService {
    static async login(obj) {
        return await $api.post('/login', obj)
    }

    static async registration(obj) {
        return $api.post('/registration', obj)
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async activation(activationLink) {
        return $api.post('/activate', {activationLink})
    }
}