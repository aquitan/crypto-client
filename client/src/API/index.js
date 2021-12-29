import axios from "axios";

export const BASE_URL = '/api'

const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    config.headers.Authorizetion = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api