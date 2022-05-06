export const currencyRateChangeIndicator = (coin) => {
    if (+coin < 0) {
        return 'down'
    } else {
        return 'up'
    }
}