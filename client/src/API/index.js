import axios from "axios";

export const BASE_URL = '/api'
export const GEO_API = 'https://geolocation-db.com/json/'

const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})
export const $geo_api = axios.create({
    baseURL: GEO_API,
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api