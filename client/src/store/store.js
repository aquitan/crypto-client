import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {BASE_URL} from "../API";

export default class Store {
    userId = ''
    userEmail = ''
    path = ''
    isUser = false
    isAuth = false
    isLoading = false
    isActivated = true
    isAdmin = false
    isStaff = false
    isBanned = false
    showConfirmation = false
    fullAccess = false
    promocode = ''
    premiumStatus = false
    twoFactor = false
    isError = false
    geoData = {}
    notifications = []


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
    setIsStaff(bool) {
        this.isStaff = bool
    }
    setIsBanned(bool) {
        this.isBanned = bool
    }
    setFullAccess(bool) {
        this.fullAccess = bool
    }
    setPromocode(str) {
        this.promocode = str
    }
    setPremiumStatus(bool) {
        this.premiumStatus = bool
    }
    setTwoFactor(bool) {
        this.twoFactor = bool
    }
    setIsError(bool) {
        this.isError = bool
    }
    setNotification(obj) {
        this.notifications.push(obj)
    }

    async login(obj) {
        try {
            const response = await AuthService.login(obj)
            console.log('response', response)
            if (response.data.two_step_status !== 1) {
                if (response.data.fullAccess) {
                    this.setFullAccess(true)
                } else {
                    if (response.data.user.isBanned === 1) {
                        this.setIsBanned(true)
                    }
                    this.setIsLoading(true)
                    if (!this.isBanned) {
                        localStorage.setItem('token', response.data.accessToken)
                        this.setUserId(response.data.user.ID)
                        this.setUserEmail(response.data.user.email)
                        if (response.data.user.isAdmin === 1) {
                            this.setIsAdmin(true)
                        }
                        if (response.data.user.isStaff === 1) {
                            this.setIsStaff(true)
                        }
                        if (response.data.user.isActivated === 1) {
                            this.setIsActivated(true)
                        }
                        this.setAuth(true)
                        this.setUser(response.data.user)
                    }
                }
            }

        } catch(e) {
            this.setIsError(true)
            console.log('error', e)
        } finally {
            this.setIsLoading(false)
        }
    }
    async registration(obj) {
        try {
            const response = await AuthService.registration(obj)
            console.log('register', response)
            localStorage.setItem('token', response.data.accessToken)
            this.setUserId(response.data.user.ID)
            this.setShowConfirmation(true)
            this.setIsLoading(true)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            this.setIsError(true)
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
            this.setFullAccess(false)
        } catch(e) {
            this.setIsError(true)
            console.log('error', e)
        }
    }

    async checkAuth() {
        this.setIsLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true})
            if (response.data.user.isBanned === 1) {
                this.setIsBanned(true)
            }
            if (!this.isBanned) {
                console.log('refresh', response)
                this.setUserId(response.data.user.ID)
                this.setUserEmail(response.data.user.email)
                localStorage.setItem('token', response.data.accessToken)
                if (response.data.user.isActivated === 1) {
                    this.setIsActivated(true)
                }
                if (response.data.user.isStaff === 1) {
                    this.setIsStaff(true)
                }
                if (response.data.user.isAdmin === 1) {
                    this.setIsAdmin(true)
                }
                this.setAuth(true)
                this.setUser(response.data.user)
            }
        } catch(e) {
            console.log('error---', e)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setIsActivated(false)
            this.setIsAdmin(false)
            this.setUser({})
            this.setFullAccess(false)
        } finally {
            this.setIsLoading(false)
        }
    }

    async sendActivation(activationLink, user_id) {
        this.setIsLoading(true)
        try {
            const response = await AuthService.activation(activationLink, user_id)
            if (response.data.promocode) {
                localStorage.setItem('promocode', response.data.promocode)
                this.setPromocode(localStorage.getItem('promocode'))
            }
            if (response.data.premium_status === 1) {
                localStorage.setItem('prem', 'Y')
                this.setPremiumStatus(localStorage.getItem('prem'))
            }
            if (response.data.two_step_status === 1) {
                localStorage.setItem('2fa', 'Y')
                this.setTwoFactor(localStorage.getItem('2fa'))
            }
            this.setShowConfirmation(false)
            this.setIsActivated(true)
        } catch(e) {
            console.log('activation error', e)
        } finally {
            this.setIsLoading(false)
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