import {generateRandomInt} from "./generateRandomInt";

export async function shaffleData(from) {
    // from val is => cur rate
    // to val is => needed rate (rate + min% for order history emulating)
    const cryptoValue = await generateRandomInt(0.006, 5.8372)
    console.log('shaffle', from)
    let obj = {
        price: from,
        amountInCrypto: cryptoValue.toFixed(3)
    }

    return obj
}