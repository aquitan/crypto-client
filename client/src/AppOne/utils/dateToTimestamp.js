export const dateToTimestamp = (time) => {
    if (time) {
        let date = new Date(time)
        return Math.floor(Date.now() / 1000)
    } else {
        let date = new Date()
        return Math.floor(Date.now() / 1000)
    }
}