export const checkOrderBuyToComplete = (value, arr) => {
    arr.forEach(item => {
        if (item.orderType && item.coinRate >= value) {
            return item._id
        }
    })
}

export const checkOrderSellToComplete = (value, arr) => {
    arr.forEach(item => {
        if (!item.orderType && item.coinRate <= value) {
            return item._id
        }
    })
}