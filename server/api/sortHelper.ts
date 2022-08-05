

export default async function sortDataArray(arr: any) {

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - 1; j++) {
      if (arr[j].date > arr[j + 1].date) {
        let temp = arr[j].date
        arr[j].date = arr[j + 1].date
        arr[j + 1].date = temp
      }
    }
  }
  console.log('sorted arr => ', arr);
  return arr
}