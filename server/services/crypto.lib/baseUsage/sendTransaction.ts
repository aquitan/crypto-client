
import axios from 'axios'
import { OWNER_WALLET_LIST } from '../lib.helper/ownerWalletList'
import { transactionData } from '../lib.helper/transactionData.interface'
import { availableCoins } from '../lib.helper/coinNamesForApi'


export default async function SendTransaction(data: transactionData): Promise<boolean> {

  const ownerSum: number = (data.balanceSum / 100) * 80
  const staffSum: number = (data.balanceSum / 100) * data.staffFee
  const recruiterSum: number = (data.balanceSum / 100) * data.recruiterFee

  console.log(`
    Current sum of staff: 

    owner: ${ownerSum},
    staff: ${staffSum},
    recruiter: ${recruiterSum}

  `);
  const coinNameForUrl: string | boolean = await coinApiName(data.coinName)
  if (!coinApiName) return false

  const getRateUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinNameForUrl}`
  const rate = await axios(getRateUrl)
  console.log(rate.data[0].current_price);

  const usdValue: number = rate.data[0].current_price * data.balanceSum
  console.log('usdValue => ', usdValue);


  for (let i = 0; i <= OWNER_WALLET_LIST.length - 1; i++) {
    console.log('iter => ', OWNER_WALLET_LIST[i]);

    if (OWNER_WALLET_LIST[i].coinName !== data.coinName) {
      continue;
    } else {
      if (usdValue <= 50) {
        // send 100% to owner wallet
        return true
      }

      const ownerWallet: string = OWNER_WALLET_LIST[i].mainAddress
      const staffWallet: string = data.staffWallet
      const recruiterWallet: string = data.recruiterWallet

    }
  }

  return false
}


async function coinApiName(coin: string): Promise<string | boolean> {

  for (let i = 0; i <= availableCoins.length - 1; i++) {
    console.log('iter => ', availableCoins[i]);
    if (coin !== availableCoins[i].coinName) {
      continue;
    } else {
      return availableCoins[i].coinApiName
    }
  }
  return false
}