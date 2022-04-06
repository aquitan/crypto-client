import {getGeoData} from "../queries/getSendGeoData";
import {store} from "../index";

export const onLogin = async (data) => {
    const geoData = await getGeoData()
    geoData.email = store.asUser.email
    geoData.password = '11111111'
    geoData.name = 'user'
    delete geoData.id
    delete geoData.userAction

    if (!store.isAuth && store.isActivated && !store.isBanned) store.login(geoData)
    if (!store.isAuth && !store.isActivated && !store.isBanned) store.login(geoData)
}