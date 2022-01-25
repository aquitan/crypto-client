import axios from "axios";
import {GEO_API} from "../API";
import SendLocationService from "../services/SendLocationService";
import {store} from "../index";

const timeDate = new Date()
const currentDate = timeDate.getFullYear() + '-' + timeDate.getMonth()+1 + '-' + timeDate.getDate() + ' ' + timeDate.getHours() + ':' + timeDate.getMinutes() + ':' + timeDate.getSeconds()

export const getGeoData = async () => {
    try {
        const response = await axios.get(GEO_API)
        let location = response.data.latitude.toString() + ', ' + response.data.longitude.toString()
        const domain_name = window.location.host
        console.log('window host', domain_name)
        let geoDatas = {
            ipAddress: response.data.IPv4,
            city: response.data.city,
            countryName: response.data.country_name,
            coordinates: location,
            currentDate: currentDate,
            userAction: store.path,
            id: store.userId,
            email: store.userEmail,
            domainName: domain_name
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
        const response = await SendLocationService.sendDate(currentDate)
    } catch (e) {
        console.log('')
    }
}