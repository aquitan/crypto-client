import axios from "axios";

export const BASE_URL = '/api'
export const GEO_API = 'https://geolocation-db.com/json/'

export const $usersApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})

export const $geo_api = axios.create({
    baseURL: GEO_API,
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
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true})
            localStorage.getItem('token', response.data.accessToken)
            return originalRequest
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН!')
        }
    } throw error
})
export default $api;