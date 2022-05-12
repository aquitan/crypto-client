export const dateToTimestamp = (time) => {
    if (time) {
        let date = new Date(time)
        return date.getTime()
    } else {
        let date = new Date()
        return date.getTime()
    }
}