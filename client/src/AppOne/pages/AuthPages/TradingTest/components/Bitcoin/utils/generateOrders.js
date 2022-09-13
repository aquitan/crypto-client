export const randomizeOrders = (min, max) => {
  let val = Math.floor(Math.random() * (max - min + 1)) + min
  return val
}

export const generateOrders = (rate) => {
  let arr = []
  for (let i = 0; i < 15; i++) {
    let obj = {
      price: rate + randomizeOrders(0.5, 1.2),
      crypto: randomizeOrders(0.001, 1.220),
      total: '123'
    }
    arr.push(obj)
  }
  return arr
}