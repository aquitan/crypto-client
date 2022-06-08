export const findPercent = (sum, percent) => {
    let totalSum = sum
    let percentSum = sum / 100 * percent
    return totalSum - percentSum
}