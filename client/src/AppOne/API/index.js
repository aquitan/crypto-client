import axios from "axios";

export const BASE_URL = 'https://fujitutti.art/api/'
export const GEO_API = 'https://api.ipdata.co?api-key=5ac29a510a7f382e9ab5f818b16171f54b4e5f127d2a66da25be8e9f'
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
    withCredentials: true,
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
        try {
            const response = await axios.post(`${BASE_URL}refresh`, {refreshToken: localStorage.getItem('refresh')})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch(e) {
        }
    }
    throw error
})

export default $api;