import $api, { $geo_api, GEO_API } from "../API";

export default class SendLocationService {
    static async path(path) {
        return $api.post('/user_logs', {path})
    }
    static async geoData() {
        return $geo_api.get(GEO_API)
    }
    static async sendGeoData(geoDatas) {
        return $api.post('/user_logs', {geoDatas})
    }
    static async sendDate(date) {
        return $api.post('/user_logs', {date})
    }
}