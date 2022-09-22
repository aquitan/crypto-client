import {patchData} from '../services/StaffServices';

let counter = 0
let counter2 = 0
let sendReq = false
export const countFunc = async (targetCounter, val, prev, real, time, growth, coin) => {
    if (counter < targetCounter) {
        counter = counter + 1000
        let ms = targetCounter / 1000
        let number = growth ? Number(prev + ((prev * val / 100) / ms)) : Number(prev - ((prev * val / 100) / ms))
        console.log('number', number);
        if (!sendReq) {
            sendReq = true
            await patchData('/trading/send_base_params/', {domainName: window.location.host, coinName: coin})
            console.log('reset------');
        }
        return number
    } else if (counter >= targetCounter) {

        counter2 = counter2 + 1000
        if (counter2 < targetCounter + 10000) {
            let ms = targetCounter / 1000
            let number = growth ? Number(prev - ((prev * val / 100) / ms)) : Number(prev + ((prev * val / 100) / ms))
            return number
        } else if (!targetCounter) {
            return real
        } else {
            return real
        }
    }
}