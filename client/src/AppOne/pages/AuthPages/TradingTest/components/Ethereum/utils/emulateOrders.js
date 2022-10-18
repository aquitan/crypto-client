import {randomizeOrders} from './generateOrders';

let dataArray = []
let validArray = []
export function emulateOrders(len, curRate) {
  for (let x = 0; x <= len; x++) {
    const rand = randomizeOrders(0.5, 1.3)
    const valueUp = randomizeOrders(40, 130)
    let valueData = shaffleData(curRate)
    let obj = {
      price: (+valueData.price + +rand).toFixed(2),
      amountInCrypto: valueData.amountInCrypto,
    }
    if (dataArray.length > 17) {
      dataArray.shift(dataArray[0])
    }
    for (let n = 0; n <= dataArray.length - 1; n++) {
      if (dataArray[n].price === obj.price) {
        obj.price = (+obj.price + valueUp).toFixed(3)
      }
    }
    dataArray.push(obj)
  }
  // console.log('data arr len is', dataArray.length, 'elems => ', dataArray);
  validArray = sortDataArray(dataArray)

  return validArray
}


function shaffleData(from) {
  const cryptoValue = randomizeOrders(0.006, 5.8372)
  let obj = {
    price: from,
    amountInCrypto: cryptoValue.toFixed(3)
  }

  return obj
}

function sortDataArray(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - 1; j++) {
      if (arr[j].price > arr[j + 1].price) {
        let temp = arr[j].price
        arr[j].price = arr[j + 1].price
        arr[j + 1].price = temp
      }
    }
  }
  return arr
}