import axios from "axios";

export const BASE_URL = 'http://164.92.245.8:3832/api/'
export const GEO_API = 'http://geolocation-db.com/json/'
export const COINS_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20bitcoin-cash%2C%20solana%2C%20tron%2C%20tether&order=market_cap_desc&per_page=100&page=1&sparkline=false'

export const $geo_api = axios.create({
    baseURL: GEO_API,
    withCredentials: true
})

export const coinsApi = axios.create({
    baseURL: COINS_API,
    withCredentials: true
})

export const $api = axios.create({
    baseURL: BASE_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        console.log('try 1')
        try {
            console.log('retry 2')
            const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch(e) {
            console.log(e.message)
            console.log('Не авторизованный пользователь')
        }
    }
    throw error
})

export default $api;