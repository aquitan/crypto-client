import staffWallet from '../models/staff_wallet.model'
import CheckBalance from './crypto.lib/baseUsage/balance_checker'
import { walletData } from './crypto.lib/lib.helper/wallet.interface'
import GenerateWalletByName from './crypto.lib/baseUsage/generate_wallets'
import { coinList } from './crypto.lib/lib.helper/coinList'

class CryptoService {

  async addressGen(coinName: string): Promise<walletData | boolean> {
    if (!coinName) return false
    const coin: string = coinName.toLowerCase()
    console.log('available coins => ', coinList);

    for (let i = 0; i <= coinList.length - 1; i++) {
      console.log('iter coinList => ', coinList[i]);
      if (coin === coinList[i]) {
        const dataObject: walletData | boolean = await GenerateWalletByName(coin);
        console.log('received wallet is => ', dataObject);
        return dataObject
      } else {
        continue;
      }
    }

    return false
  }

  async balanceChecker(coinName: string, address: string): Promise<number | boolean> {
    if (!coinName && !address) return false
    const coin: string = coinName.toLowerCase()
    console.log('available coins => ', coinList);

    for (let i = 0; i <= coinList.length - 1; i++) {
      console.log('iter coinList => ', coinList[i]);
      if (coin !== coinList[i]) {
        continue;
      } else {
        const balanceData: number | boolean = await CheckBalance(coin, address);
        console.log('received balance is => ', balanceData);
        return balanceData

      }
    }

    return false
  }


  async sendTransaction(coinName: string, domainName: string,): Promise<boolean> {


    // const curBalance: number | boolean = await this.balanceChecker(curDeposit.coinName, curDeposit.address)



    return false
  }



}

export default new CryptoService()