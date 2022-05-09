import {store} from "../index";
import {findPercent} from "./findPercent";

export function getValue(nameIn, nameOut, valIn) {
    let amountIn = findPercent(store.rates[nameIn], store.domain.domainParams.rateCorrectSum)
    let amountOut = findPercent(store.rates[nameOut], store.domain.domainParams.rateCorrectSum)
    let curValIn = amountIn * valIn
    let getOutVal = curValIn / amountOut
    return getOutVal
}

export function getCurValUsd(nameIn, valIn, fee) {
    let amountIn = findPercent(store.rates[nameIn], store.domain.domainParams.rateCorrectSum)
    let curValIn = amountIn * valIn
    return curValIn
}

// export const getCurCoinVal = (nameIn, valIn, nameTarg) => {
//     let usd = findPercent(store.rates[nameIn], store.domain.domainParams.rateCorrectSum)
//     let target = findPercent(store.rates[nameTarg], store.domain.domainParams.rateCorrectSum)
//     return usd / target
// }
//
// export const getCurValUsd = (name, value, percent) => {
//     let usd = findPercent(store.rates[name], percent) * value
//     console.log('usd', usd)
//     return usd
// }
