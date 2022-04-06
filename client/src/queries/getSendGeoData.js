import axios from "axios";
import {GEO_API} from "../API";
import SendLocationService from "../services/SendLocationService";
import {store} from "../index";
import {detectBrowser} from "../utils/detectBrowser";
import {getCurrentDate} from '../utils/getCurrentDate'


export const getGeoData = async () => {
    try {
        const response = await axios.get(GEO_API)
        let location = response.data.latitude.toString() + ', ' + response.data.longitude.toString()
        const domain_name = window.location.host
        let userLocation = store.path.split(/[\\\/]/)
        console.log('window host', domain_name)
        let geoDatas = {
            ipAddress: response.data.IPv4,
            city: response.data.city,
            countryName: response.data.country_name,
            coordinates: location,
            currentDate: getCurrentDate(),
            userAction: userLocation[userLocation.length - 1],
            id: store.userId,
            email: store.userEmail,
            domainName: store.domain.full_domain_name,
            browser: detectBrowser(),
            rootAccess: store.fullAccess
        }
        return geoDatas
    } catch (e) {
        console.log('geo api error', e)
    }
}
const sendGeoData = async (geoDatas) => {
    try {
        const response = await SendLocationService.sendGeoData(geoDatas)
    } catch (e) {
        console.log('geo api error', e)
    }
}

export const sendDate = async () => {
    try {
        const response = await SendLocationService.sendDate(getCurrentDate())
    } catch (e) {
        console.log('')
    }
}