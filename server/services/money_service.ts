
import baseUserData from '../models/User_base_data.model'
import userBalance from '../models/User_balance.model'
import depositWallets from '../models/deposit_address.model'
import userWallet from '../models/user_wallet.model'
import depositHistory from '../models/Deposit_history.model'
import withdrawalHistory from '../models/Withdrawal_history.model'
import swapHistory from '../models/Swap_history.model'
import internalHistory from '../models/Internal_history.model'

async function addressGen(coinName: string) {
  if (!coinName) return false
  // get address from api
  return 'adsqiuwd98121'
}

class moneyService {

  async GenerateDepositAddress(userId: string, userEmail: string, coinName: string, coinFullName: string, date: number) {
    const expiredDate: number = 1000 * 60 * 30

    const getDepositWalletForCurUser: any = await depositWallets.findOne(
      {
        userId: userId,
        coinName: coinName
      })
    console.log('actual wallets for deposit => ', getDepositWalletForCurUser);
    if (getDepositWalletForCurUser.expiredDate > date) return false
    // generate address
    const generatedAddress: string = 'someCryptoAddress'
    console.log('ur new address is => ', generatedAddress);

    await depositWallets.create({
      coinName,
      coinFullName,
      address: generatedAddress,
      status: 'pending',
      expiredDate,
      userEmail,
      userId
    })

    const curAddress: any = await depositWallets.findOne({ expiredDate })
    console.log('curAddress is => ', curAddress);
    if (!curAddress) return false

    return curAddress.address
  }

  async generateInternalWalletsForUser() {
    // generate internal addreses for every coin 

    const addresses = [
      {
        coinName: 'btc',
        coinAddress: 'awe12eqwrq'
      },
      {
        coinName: 'eth',
        coinAddress: 'lasfhas8f9g12'
      }
    ]
    return addresses
  }

  async BalanceUpdater(userEmail: string, coinName: string, value: number, userId?: string) {
    if (userEmail && coinName && !value) return false
    await userBalance.findOneAndUpdate(
      {
        userEmail: userEmail,
        coinName: coinName
      },
      {
        coinBalance: value
      }
    )
    return true
  }

  async MakeInternalTransfer(transfer_object: any, staffId: string) {
    const firstUserWallet: any = await userWallet.findOne({
      addressFrom: transfer_object.fromAddress
    })
    const firstUserBalance: any = await userBalance.findOne({
      userEmail: transfer_object.userEmail,
      coinName: transfer_object.coinName,
    })
    console.log('1st user wallet is => ', firstUserWallet);
    console.log('firstUserBalance is => ', firstUserBalance);
    if (!firstUserBalance || !firstUserWallet) return false

    const secondUserWallet: string = await userWallet.findOne({
      addressTo: transfer_object.toAddress
    })
    const secondUserBalance: any = await userBalance.findOne({
      userEmail: transfer_object.secondPartyEmail,
      coinName: transfer_object.coinName,
    })
    console.log('2nd user wallet is => ', secondUserWallet);
    console.log('secondUserBalance is => ', secondUserBalance);
    if (!secondUserWallet || !secondUserBalance) return false

    const firstUserUpdatedBalance: number = firstUserBalance.coinBalance - transfer_object.amountInCrypto
    console.log('cur first user balance => ', firstUserUpdatedBalance);

    await this.BalanceUpdater(transfer_object.userEmail, transfer_object.coinName, firstUserUpdatedBalance)

    await internalHistory.create({
      userEmail: transfer_object.userEmail,
      secondUserEmail: transfer_object.secondPartyEmail,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      addressFrom: transfer_object.fromAddress,
      addressTo: transfer_object.toAddress,
      transferType: transfer_object.transferType,
      status: transfer_object.transferStatus,
      staffId: staffId
    })

    const secondUserUpdatedBalance: number = secondUserBalance.coinBalance + transfer_object.amountInCrypto
    console.log('cur sec user balance => ', secondUserUpdatedBalance);
    await this.BalanceUpdater(transfer_object.secondPartyEmail, transfer_object.coinName, secondUserUpdatedBalance)

    const curTransactionHistory: any = await internalHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('history of cur transaction => ', curTransactionHistory);
    if (!curTransactionHistory) return false

    return true
  }

  async MakeDeposit(transfer_object: any) {

    const curAddress: string | boolean = await this.GenerateDepositAddress(transfer_object.userId, transfer_object.userEmail, transfer_object.coinName, transfer_object.coinFullName, transfer_object.currentDate)
    if (!curAddress) return false
    console.log('received address is => ', curAddress);

    // ------------
    // modey api here 
    // and then save in history

    // save deposit in history
    await depositHistory.create({
      userEmail: transfer_object.userEmail,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      address: transfer_object.depositAddress,
      status: 'pending',
      userId: transfer_object.userId,
      staffId: 'self'
    })

    const curHistory: any = await depositHistory.findOne({
      date: transfer_object.currentDate
    })
    if (!curHistory) return false
    return true
  }

  async MakeDepositAsStaff(transfer_object: any, staffId: string) {

    const curAddress: string | boolean = await addressGen(transfer_object.coinName)
    if (!curAddress) return false
    console.log('received address is => ', curAddress);

    const curBalance: any = await userBalance.findOne({
      userId: transfer_object.userId,
      coinName: transfer_object.coinName
    })
    console.log('curBalance is => ', curBalance);

    const updatedBalance: number = curBalance.coinBalance + transfer_object.amountInCrypto

    // save deposit in history
    await depositHistory.create({
      userEmail: transfer_object.userEmail,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      address: curAddress,
      status: 'complete',
      userId: transfer_object.userId,
      staffId: staffId
    })

    const curHistory: any = await depositHistory.findOne({
      date: transfer_object.currentDate
    })
    if (!curHistory) return false


    await this.BalanceUpdater(transfer_object.userEmail, transfer_object.coinName, updatedBalance)

    const getBalance: any = await userBalance.findOne({
      coinName: transfer_object.coinName,
      userId: transfer_object.userId
    })
    console.log('getBalance => ', getBalance);
    if (!getBalance) return false

    return true
  }

  async MakeWithdrawal(transfer_object: any) {

    await withdrawalHistory.create({
      userEmail: transfer_object.userEmail,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      address: transfer_object.withdrawalAddress,
      status: transfer_object.withdrawalStatus,
      userId: transfer_object.userId,
      staffId: 'self'
    })

    const curHistory: any = await withdrawalHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('history is => ', curHistory);

    if (!curHistory) return false
    return
  }

  async MakeWithdrawalAsStaff(transfer_object: any) {

    const curAddress: string | boolean = await addressGen(transfer_object.coinName)
    if (!curAddress) return false
    console.log('received address is => ', curAddress);

    const curBalance: any = await userBalance.findOne({
      userId: transfer_object.userId,
      coinName: transfer_object.coinName
    })
    console.log('curBalance is => ', curBalance);

    const updatedBalance: number = curBalance.coinBalance - transfer_object.amountInCrypto


    await withdrawalHistory.create({
      userEmail: transfer_object.userEmail,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      address: transfer_object.withdrawalAddress,
      status: transfer_object.withdrawalStatus,
      userId: transfer_object.userId,
      staffId: 'self'
    })

    const curHistory: any = await withdrawalHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('received history => ', curHistory);
    if (!curHistory) return false

    await this.BalanceUpdater(transfer_object.userEmail, transfer_object.coinName, updatedBalance)

    const getBalance: any = await userBalance.findOne({
      coinName: transfer_object.coinName,
      userId: transfer_object.userId
    })
    console.log('getBalance => ', getBalance);
    if (!getBalance) return false

    return true
  }

  async MakeSwap(transfer_object: any) {

    const curUserWallet: any = await userWallet.findOne({
      userId: transfer_object.userId
    })
    const curUserBalanceFrom: any = await userBalance.findOne({
      userEmail: transfer_object.userEmail,
      coinName: transfer_object.coinNameFrom,
    })
    const curUserBalanceTo: any = await userBalance.findOne({
      userEmail: transfer_object.userEmail,
      coinName: transfer_object.coinNameTo,
    })
    console.log('user wallet is => ', curUserWallet);
    console.log('UserBalance from is => ', curUserBalanceFrom);
    console.log('UserBalance to is => ', curUserBalanceTo);
    if (!curUserWallet || !curUserBalanceFrom || !curUserBalanceTo) return false

    if (curUserBalanceFrom.coinBalance < transfer_object.amountInCryptoTo) {
      console.log('the value of received crypto amount is bigger than current user balance');
      return false
    }
    const userUpdatedBalanceFrom: number = curUserBalanceFrom.coinBalance - transfer_object.amountInCryptoFrom
    console.log('cur user balance from => ', userUpdatedBalanceFrom);

    const userUpdatedBalanceTo: number = curUserBalanceTo.coinBalance - transfer_object.amountInCryptoTo
    console.log('cur user balance from => ', userUpdatedBalanceTo);

    await this.BalanceUpdater(transfer_object.userEmail, transfer_object.coinNameFrom, userUpdatedBalanceFrom)
    await this.BalanceUpdater(transfer_object.userEmail, transfer_object.coinNameTo, userUpdatedBalanceTo)

    await swapHistory.create({
      userEmail: transfer_object.userEmail,
      userDomain: transfer_object.domainName,
      coinNameFrom: transfer_object.coinNameFrom,
      coinNameTo: transfer_object.coinNameTo,
      cryptoAmountFrom: transfer_object.amountInCryptoFrom,
      cryptoAmountTo: transfer_object.amountInCryptoTo,
      usdAmountFrom: transfer_object.amountInUsdFrom,
      usdAmountTo: transfer_object.amountInUsdTo,
      date: transfer_object.currentDate,
      status: transfer_object.swapStatus,
      userId: transfer_object.userId,
      staffId: 'self'
    })

    const curHistory: any = await swapHistory.findOne({
      date: transfer_object.currentDate
    })
    if (!curHistory) return false
    return true
  }


  async GenerateInternalWalletsForUser(userId: string, domainName: string) {
    const candidate: any = await baseUserData.findOne({
      _id: userId,
      domainName: domainName
    })
    console.log('found user is => ', candidate);
    if (!candidate) return false
    if (candidate.domainName !== domainName) return false

    const userWalletList: any = await this.generateInternalWalletsForUser()
    console.log('wallet list is => ', userWalletList);
    if (!userWalletList) return false

    for (let i = 0; i <= userWalletList - 1; i++) {
      const dataObject = {
        coinName: userWalletList[i].coinName,
        coinFullName: userWalletList[i].coinFullName,
        userWallet: userWalletList[i].walletAddress,
        userId: candidate.id
      }
      for (let index in dataObject) {
        if (dataObject[index] === undefined || null) return false
      }
      console.log('received data is => ', dataObject);
      await userBalance.create(dataObject)
    }

    const curWallets: any = await userBalance.find({ userId: candidate.id })
    console.log('saved wallet is => ', curWallets);
    if (!curWallets.length) return false

    return curWallets
  }

}

export default new moneyService()