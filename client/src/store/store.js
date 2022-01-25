import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {BASE_URL, GEO_API} from "../API";
import SendLocationService from "../services/SendLocationService";

export default class Store {
    userId = ''
    userEmail = ''
    path = ''
    isAuth = false
    isLoading = false
    isActivated = false
    isAdmin = false
    showConfirmation = false
    geoData = {}


    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool) {
        this.isAuth = bool
    }
    setUserId(str) {
        this.userId = str
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
    setPath(str) {
        this.path = str
    }
    setUserEmail(str) {
        this.userEmail = str
    }

    async login(email, password, domain_name) {
        try {
            const response = await AuthService.login(email, password, domain_name)
            localStorage.setItem('token', response.data.accessToken)
            this.setUserId(response.data.user.ID)
            this.setUserEmail(response.data.user.email)
            this.setIsLoading(true)
            if (response.data.user.isAdmin === 1) {
                this.setIsAdmin(true)
            }
            if (response.data.user.isActivated === 1) {
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
    async registration(email, password, name, domain_name, datetime) {
        try {
            const response = await AuthService.registration(email, password, name, domain_name, datetime)
            console.log('register', response)
            localStorage.setItem('token', response.data.accessToken)
            this.setUserId(response.data.user.ID)
            this.setShowConfirmation(true)
            this.setIsLoading(true)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log('error', e)
        } finally {
            this.setIsLoading(false)
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
            this.setUserId(response.data.user.ID)
            this.setUserEmail(response.data.user.email)
            localStorage.setItem('token', response.data.accessToken)
            if (response.data.user.isActivated === 1) {
                this.setIsActivated(true)
            }
            if (response.data.user.isAdmin === 1) {
                this.setIsAdmin(true)
            }
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log('error---', e)
        } finally {
            this.setIsLoading(false)
        }
    }

    async sendActivation(activationLink, user_id) {
        try {
            const response = await AuthService.activation(activationLink, user_id)
            this.setIsActivated(true)
        } catch(e) {
            console.log('activation error', e)
        }
    }

    async sendPath(path) {
        try {
            this.setPath(path)
            console.log('path----', path)

        } catch(e) {
            console.log('path error', e)
        }
    }
}