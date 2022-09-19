let counter = 0
let counter2 = 0
export const countFunc = (targetCounter, val, prev, real, time) => {
    if (counter < targetCounter) {
        counter = counter + 1000
        let ms = targetCounter / 1000
        return prev + ((prev * val / 100) / ms)
    } else if (counter >= targetCounter) {
        counter2 = counter2 + 1000
        if (counter2 < 100000) {
            let returnVal = prev - real
            let c = returnVal / 10
            return prev - c
        } else {
            return real
        }
    }
}