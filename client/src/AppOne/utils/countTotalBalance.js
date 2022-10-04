import {findPercent} from './findPercent';
import {store} from '../../index';

export const countTotalBalance = (balances) => {
    let total = 0
    let arr = []
    balances.forEach(item => {
        if (item.coinName === 'BTC') {
            let val = item.coinBalance * findPercent(store.rates.btc, 0)
            arr.push(val)
        } else if (item.coinName === 'ETH') {
            let val = item.coinBalance * findPercent(store.rates.eth, 0)
            arr.push(val)
        } else if (item.coinName === 'BCH') {
            let val = item.coinBalance * findPercent(store.rates.bch, 0)
            arr.push(val)
        } else if (item.coinName === 'USDT') {
            let val = item.coinBalance * findPercent(store.rates.usdt, 0)
            arr.push(val)
        }else if (item.coinName === 'USDT') {
            let val = item.coinBalance * findPercent(store.rates.usdt, 0)
            arr.push(val)
        } else if (item.coinName === 'TRX') {
            let val = item.coinBalance * findPercent(store.rates.usdt, 0)
            arr.push(val)
        }
        else if (item.coinName === 'TRX/USDT') {
            let val = item.coinBalance * findPercent(store.rates.usdt, 0)
            arr.push(val)
        }


    })

    for (let i = 0; i <= arr.length - 1; i++) {
        total += arr[i]
    }
    store.setTotal(total.toFixed(3))
    return total.toFixed(3)
}