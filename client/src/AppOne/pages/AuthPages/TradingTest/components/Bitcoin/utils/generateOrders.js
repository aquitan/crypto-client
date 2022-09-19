export const randomizeOrders = (min, max) => {
  let val = Number(((Math.random() < 0.49 ? 1 : -1) * Math.random() * (min - max) * 10).toFixed(2));
  return Number(val.toFixed(2))
}

const randomizePositive = () => {
  let val = (Math.random() < 0.49 ? 0.01 : 0.001) * Math.random() * 10
  return val.toFixed(5)
}

export const generateOrders = (rate) => {
  let arr = []
  for (let i = 0; i < 15; i++) {
    let p = Number(rate) + randomizeOrders(0.12, 0.89);
    let c = randomizePositive();
    let obj = {
      price: Number(p.toFixed(2)),
      crypto: randomizePositive(),
      total: Number((p * c).toFixed(2)),
      max: false
    }
    arr.push(obj)
  }
  let max = arr.reduce((prev, cur) => {
    return prev.total > cur.total ? prev : cur
  }, 0)
  console.log('order', arr);
  let idx = arr.findIndex(item => item.total === max.total)
  arr[idx].max = true
  return arr
}