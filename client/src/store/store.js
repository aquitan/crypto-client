import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {BASE_URL} from "../API";

export default class Store {
    isAuth = false

    cunstructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.setAuth = bool
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
        } catch(e) {
            console.log(e)
        }
    }

    async register(email, password) {
        try {
            const response = await AuthService.register(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
        } catch(e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
        } catch(e) {
            console.log(e)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
        } catch(e) {
            console.log(e)
        }
    }
}