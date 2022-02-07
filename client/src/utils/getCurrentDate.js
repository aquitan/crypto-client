export const getCurrentDate = () => {
  const timeDate = new Date()
  let y = timeDate.getUTCFullYear() 
  let m = timeDate.getUTCMonth()+1 
  let d = timeDate.getUTCDate() 
  let h = timeDate.getUTCHours() 
  let min = timeDate.getUTCMinutes()
  let s = timeDate.getUTCSeconds()
  function PrefInt(number, len) {
    if (number < len)
    {
      let newNum = '0'+number
      return newNum
    }
    else {
      return number
    }
  }
  const currentDate = y+'-'+PrefInt(m,10)+'-'+PrefInt(d,10)+' '+PrefInt(h,10)+':'+ PrefInt(min,10) +':'+ PrefInt(s,10)
  return currentDate
}