export const findPercent = (sum, percent= 0) => {
    let totalSum = sum
    let percentSum = sum / 100 * percent
    return totalSum - percentSum
}