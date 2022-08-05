
import axios from 'axios'
import { coinList } from '../lib.helper/coinList'

export default async function CheckBalance(coinName: string, address: string): Promise<number | boolean> {
  const coin: string = coinName.toLowerCase()

  if (coin === coinList[0]) {
    const coinData: any = await axios(`https://chain.so/api/v2/address/BTC/${address}`)
    console.log('received data  => ', coinData.data.data);
    return coinData.data.data.balance
  }
  if (coin === coinList[1]) {

  }
  if (coin === coinList[2]) {

  }
  if (coin === coinList[3]) {

  }
  if (coin === coinList[4]) {

  }
  if (coin === coinList[5]) {

  }
  if (coin === coinList[6]) {

  }
  return false
}

