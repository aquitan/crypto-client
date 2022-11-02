import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {BASE_URL} from "../API";
import {getData} from '../services/StaffServices';

export default class Store {
    userId = ''
    userEmail = ''
    path = ''
    isUser = false
    isAuth = false
    isLoading = false
    isActivated = false
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
    domain = {}
    terms = {}
    asUser = {}
    rates = {}
    ratesFull = {}
    ratesChange = {}
    depositFee = 0
    balance = []
    total = 0
    activeError = 0
    tfaBot = ''
    error500 = false
    error400 = false
    tradingPath = false


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
    setDomain(obj) {
        this.domain = obj
    }
    setTerms(obj) {
        this.terms = obj
    }
    setAsUser(obj) {
        this.asUser = obj
    }
    setRates(obj) {
        this.rates = obj
    }
    setRatesFull(obj) {
        this.ratesFull = obj
    }
    setRatesChange(obj) {
        this.ratesChange = obj
    }
    setDepositFee(num) {
        this.depositFee = num
    }
    setBalance(arr) {
        this.balance = arr
    }
    setTotal(num) {
        this.total = num
    }
    setBot(str) {
        this.tfaBot = str
    }
    setError500(bool) {
        this.error500 = bool
    }
    setError400(bool) {
        this.error500 = bool
    }
    setTradingPath(bool) {
        this.tradingPath = bool
    }



    async login(obj) {
        try {
            this.setIsLoading(true)
            const response = await AuthService.login(obj)
            localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('refresh', response.data.refreshToken)
            if (response.data.rootAccess) {
                this.setFullAccess(true)
                this.setAuth(true)
            } else {
                if (response.data.user.isBanned) {
                    this.setIsBanned(true)
                }
                this.setIsLoading(true)
                if (!this.isBanned) {
                    localStorage.setItem('token', response.data.accessToken)
                    this.setUserId(response.data.user.id)
                    this.setUserEmail(response.data.user.email)
                    if (response.data.user.isAdmin) {
                        this.setIsAdmin(true)
                    }
                    if (response.data.user.isStaff) {
                        this.setIsStaff(true)
                    }
                    if (response.data.user.isActivated) {
                        this.setIsActivated(true)
                    }
                    this.setAuth(true)
                    this.setUser(response.data.user)
                }
            }

        } catch(e) {
            if (e.message === 'Request failed with status code 500') {
                this.setError500(true)
            } else {
                this.setError400(true)
            }
        } finally {
            this.setIsLoading(false)
        }
    }
    async registration(obj) {
        try {
            // this.setIsError(true)
            const response = await AuthService.registration(obj)
            localStorage.setItem('token', response.data.accessToken)
            this.setUserId(response.data.user.ID)
            this.setShowConfirmation(true)
            this.setUser(response.data.user)
            if (response.data === 'email alresdy in use') {
                this.setIsError(true)
            }
        } catch(e) {
            this.setError500(true)
        } finally {
            this.setIsLoading(false)
            this.setShowConfirmation(true)
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            this.setAuth(false)
            this.setIsAdmin(false)
            this.setIsStaff(false)
            this.setIsAdmin(false)
            this.setUser({})
            this.setFullAccess(false)
            this.setIsActivated(false)
        } catch(e) {
            this.setIsError(true)
        }
    }

    async checkAuth() {
        try {
            this.setIsLoading(true)
            this.setError500(false)
            const response = await axios.get(`https://fujitutti.art/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('refresh', response.data.refreshToken)
            // this.setUserId(response.data.user.id)
            // this.setUserEmail(response.data.user.email)
            // if (response.data.user.isActivated) {
            //     this.setIsActivated(true)
            // }
            if (response.data.user.isStaff) {
                this.setIsStaff(true)
            }
            if (response.data.user.isAdmin) {
                this.setIsAdmin(true)
            }
            this.setAuth(true)
            this.setUser(response.data.user)

            if (response.data.user.isBanned) {
                this.setIsBanned(true)
            }
            if (response.data.fullAccess) {
                localStorage.setItem('token', response.data.accessToken)
                this.setFullAccess(true)
                this.setAuth(true)
                this.setIsActivated(true)
            } else {
                if (!this.isBanned) {
                    this.setUserId(response.data.user.ID)
                    this.setUserEmail(response.data.user.email)
                    localStorage.setItem('token', response.data.accessToken)
                    if (response.data.user.isActivated) {
                        this.setIsActivated(true)
                    }
                    if (response.data.user.isStaff) {
                        this.setIsStaff(true)
                    }
                    if (response.data.user.isAdmin) {
                        this.setIsAdmin(true)
                    }
                    this.setAuth(true)
                    this.setUser(response.data.user)
                }
            }

        } catch(e) {
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

    async sendActivation(activationLink) {
        this.setIsLoading(true)
        try {
            const response = await AuthService.activation(activationLink)
            // if (response.data.premium_status === 1) {
            //     this.setPremiumStatus(true)
            // }
            // if (response.data.two_step_status === 1) {
            //     this.setTwoFactor(true)
            // }
            this.setShowConfirmation(false)
            this.setIsActivated(true)
        } catch(e) {
        } finally {
            this.setIsLoading(false)
        }
    }

    async sendPath(path) {
        try {
            this.setPath(path)

        } catch(e) {
        }
    }
}