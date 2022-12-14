import axios from "axios";
import {GEO_API} from "../API";
import SendLocationService from "../services/SendLocationService";
import {store} from "../../index";
import {detectBrowser} from "../utils/detectBrowser";
import {getCurrentDate} from '../utils/getCurrentDate'
import {dateToTimestamp} from "../utils/dateToTimestamp";


export const getGeoData = async () => {
    try {
        const response = await axios.get(GEO_API)
        let location = response.data.location.latitude.toString() + ', ' + response.data.location.longitude.toString()
        const domain_name = window.location.host
        let userLocation = store.path.split(/[\\\/]/)
        let geoDatas = {
            ipAddress: response.data.ip, // ------
            city: response.data.location.city, // -----
            countryName: response.data.country.name, //-----
            coordinates: location,
            currentDate: dateToTimestamp(),
            userAction: userLocation[userLocation.length - 1],
            id: store.userId,
            email: store.userEmail,
            browser: detectBrowser(),
            logTime: getCurrentDate(dateToTimestamp())
            // rootAccess: store.fullAccess
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