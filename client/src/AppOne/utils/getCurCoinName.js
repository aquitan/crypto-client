import {store} from "../../index";

export const getCurCoinName = (coin, bucs) => {
    if (coin === 'usd' || coin === 'usdt') {
        return bucs
    }
    else {
        return store.rates[coin] * bucs
    }
}