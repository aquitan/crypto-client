import axios from "axios";
import {GEO_API} from "../API";
import SendLocationService from "../services/SendLocationService";

const timeDate = new Date()
const currentDate = timeDate.getFullYear() + '-' + timeDate.getMonth()+1 + '-' + timeDate.getDate() + ' ' + timeDate.getHours() + ':' + timeDate.getMinutes() + ':' + timeDate.getSeconds()

export const getGeoData = async () => {
    try {
        const response = await axios.get(GEO_API)
        let location = response.data.latitude.toString() + ', ' + response.data.longitude.toString()
        let geoDatas = {
            ipAddress: response.data.IPv4,
            city: response.data.city,
            countryName: response.data.country_name,
            coordinates: location,
            currentDate: currentDate
        }
        console.log('geoDatas', geoDatas)
        await sendGeoData(geoDatas)
    } catch (e) {
        console.log('geo api error', e)
    }
}
const sendGeoData = async (geo) => {
    try {
        const response = await SendLocationService.sendGeoData(geo)
    } catch (e) {
        console.log('geo api error', e)
    }
}

export const sendDate = async () => {
    try {
        const response = await SendLocationService.sendDate(currentDate)
    } catch (e) {
        console.log('')
    }
}