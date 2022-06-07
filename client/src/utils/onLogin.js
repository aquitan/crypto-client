import {getGeoData} from "../queries/getSendGeoData";
import {store} from "../../index";

export const onLogin = async (data) => {
    const geoData = await getGeoData()
    geoData.email = store.asUser.email
    geoData.password = store.asUser.password
    geoData.name = store.user.name
    delete geoData.id
    delete geoData.userAction
    geoData.domainName = window.location.host
    geoData.doubleDeposit = store.domain.domainParams.doubleDeposit
    geoData.depositFee = store.domain.domainParams.depositFee
    geoData.rateCorrectSum = store.domain.domainParams.rateCorrectSum
    geoData.minDepositSum = store.domain.domainParams.minDepositSum
    geoData.minWithdrawalSum = store.domain.domainParams.minWithdrawalSum
    geoData.currencySwapFee = store.domain.domainParams.currencySwapFee

    if (!store.isAuth && store.isActivated && !store.isBanned) store.login(geoData)
    if (!store.isAuth && !store.isActivated && !store.isBanned) store.login(geoData)
}