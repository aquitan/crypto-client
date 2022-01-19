import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {BASE_URL} from "../API";

export default class Store {
    user = {}
    isAuth = false
    isLoading = false
    isActivated = false
    isAdmin = false
    showConfirmation = false


    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }
    setUser(obj) {
        this.user = obj
    }
    setIsLoading(bool) {
        this.isLoading = bool
    }
    setIsActivated(bool) {
        this.isActivated = bool
    }
    setIsAdmin(bool) {
        this.isAdmin = bool
    }
    setShowConfirmation(bool) {
        this.showConfirmation = bool
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setIsLoading(true)
            if (response.data.user.isAdmin === true) {
                this.setIsAdmin(true)
            }
            if (response.data.user.isActivated === true) {
                this.setIsActivated(true)
            }
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log('error', e)
        } finally {
            this.setIsLoading(false)
        }
    }
    async registration(email, password, name) {
        try {
            const response = await AuthService.registration(email, password, name)
            console.log('register', response)
            localStorage.setItem('token', response.data.accessToken)
            this.setShowConfirmation(true)
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
            this.setIsActivated(false)
            this.setIsAdmin(false)
            this.setUser({})
        } catch(e) {
            console.log('error', e)
        }
    }

    async checkAuth() {
        this.setIsLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true})
            console.log('refresh', response)
            localStorage.setItem('token', response.data.accessToken)
            if (response.data.user.isActivated === true) {
                this.setIsActivated(true)
            }
            if (response.data.user.isAdmin === true) {
                this.setIsAdmin(true)
            }
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log('error', e)
        } finally {
            this.setIsLoading(false)
        }
    }
}