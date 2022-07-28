export async function sortDataArray(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - 1; j++) {
            if (arr[j].price > arr[j + 1].price) {
                let temp = arr[j].price
                arr[j].price = arr[j + 1].price
                arr[j + 1].price = temp
            }
        }
    }
    // console.log('sorted arr => ', arr);
    return arr
}