import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {BASE_URL} from "../API";

export default class Store {
    user = {}
    isAuth = false
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }
    setUser(obj) {
        this.user = obj
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            console.log('login', response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log('error', e)
        }
    }
    async registration(email, password, name) {
        try {
            const response = await AuthService.registration(email, password, name)
            console.log('register', response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log('error', e)
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch(e) {
            console.log('error', e)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true})
            console.log('refresh', response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log('error', e)
        }
    }
}