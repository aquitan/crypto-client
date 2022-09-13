import {coinList} from './userConstants'

async function addressValidator(address, coinName) {
    if (!address || !coinName) return false
    const coin = coinName.toLowerCase()

    if (coin === coinList[0] || coin === coinList[1]) {
        const defaultSymbolOne = 'bc1'
        const defaultSymbolTwo = '1B'
        const symbolsArray = address.split('')
        const baseSymbolsOne = symbolsArray[0] + symbolsArray[1] + symbolsArray[2]
        const baseSymbolsTwo = symbolsArray[0] + symbolsArray[1]

        if (baseSymbolsOne !== defaultSymbolOne || baseSymbolsOne !== defaultSymbolOne) return false

        if (baseSymbolsOne === defaultSymbolOne) {
            if (
                symbolsArray.length < 26 ||
                symbolsArray.length > 45) {
                return false
            }
            return true
        }

        if (baseSymbolsTwo === defaultSymbolTwo) {
            if (
                symbolsArray.length < 26 ||
                symbolsArray.length > 45) {

                return false
            }
            return true
        }
        return false
    }

    // etherium network ----------
    if (coin === coinList[2] || coin === coinList[3]) {
        const defaultSymbol = '0x'
        const symbolsArray = address.split('')
        const baseSymbols = symbolsArray[0] + symbolsArray[1]
        if (baseSymbols === defaultSymbol) {
            if (
                baseSymbols !== defaultSymbol ||
                symbolsArray.length < 35 ||
                symbolsArray.length > 45
            ) {
                return false
            }
            return true
        }
        return false
    }

    // tron network ----------
    if (coin === coinList[4] || coin === coinList[5]) {
        const defaultSymbol = 'T'
        const symbolsArray = address.split('')
        if (symbolsArray[0] === defaultSymbol) {
            if (
                symbolsArray[0] !== defaultSymbol ||
                symbolsArray.length < 26 ||
                symbolsArray.length > 45
            ) {
                return false
            }
            return true
        }
        return false
    }

    // solana network --------
    if (coin === coinList[6]) {

    }

    return false
}
export default addressValidator