export const setValueBuySell = (val, balance) => {
  return +balance * +val / 100
}

export const setTotalInUsd = (calcPercent ,curRate) => {
  return calcPercent * curRate
}