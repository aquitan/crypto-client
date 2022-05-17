
import baseUserData from '../models/User_base_data.model'
import userBalance from '../models/User_balance.model'
import depositWallets from '../models/deposit_address.model'
import userWallet from '../models/user_wallet.model'
import depositHistory from '../models/Deposit_history.model'
import withdrawalHistory from '../models/Withdrawal_history.model'
import swapHistory from '../models/Swap_history.model'
import internalHistory from '../models/Internal_history.model'
import userBaseData from '../models/User_base_data.model'
import generatePassword from '../api/password_generator'
import userActionInfo from '../models/User_info_for_action.model'
import withdrawalError from '../models/Domain_errors.model'

async function addressGen(coinName: string) {
  if (!coinName) return false
  // get address from api
  return 'adsqiuwd98121'
}

class moneyService {

  async GenerateDepositAddress(userId: string, userEmail: string, coinName: string, coinFullName: string, date: number) {
    const expiredDate: number = 1000 * 60 * 30
    console.log('expiredDate', expiredDate);

    // generate address
    // const generatedAddress: string = await this.addressGen(coinName)
    const generatedAddress: string = await generatePassword(44)
    console.log('ur new address is => ', generatedAddress);

    await depositWallets.create({
      coinName: coinName,
      coinFullName: coinFullName,
      address: generatedAddress,
      status: 'pending',
      expiredDate: expiredDate,
      userEmail: userEmail,
      userId: userId
    })

    const curAddress: any = await depositWallets.findOne({
      address: generatedAddress
    })
    console.log('curAddress is => ', curAddress);
    if (!curAddress) return false

    return curAddress.address
  }

  async generateInternalWalletsForUser() {
    // generate internal addreses for every coin 

    const addresses = [
      {
        coinName: 'BTC',
        coinFullName: 'bitcoin',
        walletAddress: await generatePassword(44),
      },
      {
        coinName: 'ETH',
        coinFullName: 'ethereum',
        walletAddress: await generatePassword(44)
      },
      {
        coinName: 'BCH',
        coinFullName: 'bitcoin cash',
        walletAddress: await generatePassword(43)
      },
      {
        coinName: 'SOL',
        coinFullName: 'solana',
        walletAddress: await generatePassword(44)
      },
      {
        coinName: 'USDT',
        coinFullName: 'tether',
        walletAddress: await generatePassword(42)
      },
      {
        coinName: 'TRX',
        coinFullName: 'tron',
        walletAddress: await generatePassword(42)
      },
      {
        coinName: 'TRX/USDT',
        coinFullName: 'usdt trc20',
        walletAddress: await generatePassword(42)
      }
    ]
    return addresses
  }

  async BalanceUpdater(userId: string, coinName: string, value: number,) {
    const dataUpdate: any = await userBalance.findOneAndUpdate(
      {
        userId: userId,
        coinName: coinName
      },
      {
        coinBalance: value
      }
    )
    console.log('from balanceupdater: => ', dataUpdate);

    return true

  }

  async MakeInternalTransfer(transfer_object: any, staffId?: string) {
    if (staffId) {

      const curUserBalance: any = await userBalance.findOne({
        userEmail: transfer_object.userEmail,
        coinName: transfer_object.coinName,
      })

      console.log('curUserBalance is => ', curUserBalance);
      if (!curUserBalance) return false
      if (curUserBalance.coinBalance < transfer_object.amountInCrypto) {
        console.log('the value of received crypto amount is bigger than current user balance');
        return false
      }
      let userUpdatedBalance: number
      if (!transfer_object.transferType) {
        userUpdatedBalance = curUserBalance.coinBalance - transfer_object.amountInCrypto
        console.log('cur user balance => ', userUpdatedBalance);
      } else {
        userUpdatedBalance = curUserBalance.coinBalance + transfer_object.amountInCrypto
        console.log('cur user balance => ', userUpdatedBalance);
      }

      const secondPartyEmail: any = await userBaseData.findOne({
        email: transfer_object.userEmail
      })

      await this.BalanceUpdater(transfer_object.userId, transfer_object.coinName, userUpdatedBalance)

      await internalHistory.create({
        userEmail: transfer_object.userEmail,
        secondUserEmail: secondPartyEmail.email,
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

      const curTransactionHistory: any = await internalHistory.findOne({
        date: transfer_object.currentDate
      })
      console.log('history of cur transaction => ', curTransactionHistory);
      if (!curTransactionHistory) return false

      return secondPartyEmail.email
    }

    const secondPartyEmail: any = await userBaseData.findOne({
      email: transfer_object.userEmail
    })

    const firstUserWallet: any = await userWallet.findOne({
      userWallet: transfer_object.fromAddress
    })
    const firstUserBalance: any = await userBalance.findOne({
      userEmail: transfer_object.userEmail,
      coinName: transfer_object.coinName,
    })
    console.log('1st user wallet is => ', firstUserWallet);
    console.log('firstUserBalance is => ', firstUserBalance);
    if (!firstUserBalance || !firstUserWallet) return false
    if (firstUserBalance.coinBalance < transfer_object.amountInCrypto) {
      console.log('the value of received crypto amount is bigger than current user balance');
      return false
    }

    const secondUserWallet: string = await userWallet.findOne({
      addressTo: transfer_object.toAddress
    })
    const secondUserBalance: any = await userBalance.findOne({
      userEmail: secondPartyEmail,
      coinName: transfer_object.coinName,
    })
    console.log('2nd user wallet is => ', secondUserWallet);
    console.log('secondUserBalance is => ', secondUserBalance);
    if (!secondUserWallet || !secondUserBalance) return false

    const firstUserUpdatedBalance: number = firstUserBalance.coinBalance - transfer_object.amountInCrypto
    console.log('cur first user balance => ', firstUserUpdatedBalance);

    await this.BalanceUpdater(transfer_object.userId, transfer_object.coinName, firstUserUpdatedBalance)

    await internalHistory.create({
      userEmail: transfer_object.userEmail,
      secondUserEmail: secondPartyEmail.email,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      addressFrom: transfer_object.fromAddress,
      addressTo: transfer_object.toAddress,
      transferType: transfer_object.transferType,
      status: transfer_object.transferStatus,
      staffId: 'self'
    })

    const secondUserUpdatedBalance: number = secondUserBalance.coinBalance + transfer_object.amountInCrypto
    console.log('cur sec user balance => ', secondUserUpdatedBalance);
    await this.BalanceUpdater(secondPartyEmail.id, transfer_object.coinName, secondUserUpdatedBalance)

    const curTransactionHistory: any = await internalHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('history of cur transaction => ', curTransactionHistory);
    if (!curTransactionHistory) return false

    return secondPartyEmail.email
  }

  async MakeDeposit(transfer_object: any, logTime: string) {

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
      address: curAddress,
      status: 'pending',
      userId: transfer_object.userId,
      staffId: 'self'
    })

    const curHistory: any = await depositHistory.findOne({
      date: transfer_object.currentDate
    })
    if (!curHistory) return false

    await userActionInfo.findOneAndUpdate(
      { userId: transfer_object.userId },
      { lastDeposit: transfer_object.currentDate, }
    )

    const getActionData: any = await userActionInfo.findOne({ userId: transfer_object.userId })
    console.log('received new getActionData => ', getActionData);
    if (getActionData.lastDeposit !== transfer_object.currentDate) {
      console.log('wrond date was writed in DB');
      return false
    }

    return curAddress
  }

  async MakeDepositAsStaff(transfer_object: any, staffId: string) {

    // const curAddress: string | boolean = await addressGen(transfer_object.coinName)
    const curAddress: string | boolean = await this.GenerateDepositAddress(transfer_object.userId, transfer_object.userEmail, transfer_object.coinName, transfer_object.coinFullName, transfer_object.currentDate)
    if (!curAddress) return false
    console.log('received address is => ', curAddress);

    const curUser: any = await userBaseData.findOne({
      email: transfer_object.userEmail
    })
    console.log('curUser => ', curUser);


    const curBalance: any = await userBalance.findOne({
      userId: curUser.id,
      coinName: transfer_object.coinName
    })
    console.log('curBalance is => ', curBalance);

    const updatedBalance: number = curBalance.coinBalance + transfer_object.amountInCrypto
    console.log('updated balance: ', updatedBalance);


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
      userId: curUser.id,
      staffId: staffId
    })

    const curHistory: any = await depositHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('history length => ', curHistory);
    if (!curHistory) return false

    await this.BalanceUpdater(curUser.id, transfer_object.coinName, updatedBalance)

    const getBalance: any = await userBalance.find({
      coinName: transfer_object.coinName,
      userId: curUser.id,
    })
    console.log('getBalance => ', getBalance[0]);
    if (!getBalance[0]) return false
    return true
  }

  async MakeWithdrawal(transfer_object: any, errorId: string) {

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

    // get user action info (err num), get error by number, send error to user
    const curError: any = await withdrawalError.findOne({
      _id: errorId
    })
    console.log('found curError => ', curError);
    if (!curError) return false
    const errorData: any = Object.assign({}, curError)
    delete errorData._doc._id
    delete errorData._doc.errorName
    delete errorData._doc.domainName
    delete errorData._doc.domainId

    return errorData._doc
  }

  async MakeWithdrawalAsStaff(transfer_object: any, staffId: string) {

    // const curAddress: string | boolean = await addressGen(transfer_object.coinName)
    const curAddress: string | boolean = await generatePassword(44)
    if (!curAddress) return false
    console.log('received address is => ', curAddress);

    const curBalance: any = await userBalance.findOne({
      userEmail: transfer_object.userEmail,
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
      address: curAddress,
      status: transfer_object.withdrawalStatus,
      userId: transfer_object.userId,
      staffId: staffId
    })

    const curHistory: any = await withdrawalHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('received history => ', curHistory);
    if (!curHistory) return false

    await this.BalanceUpdater(transfer_object.userId, transfer_object.coinName, updatedBalance)

    const getBalance: any = await userBalance.findOne({
      coinName: transfer_object.coinName,
      userId: transfer_object.userId
    })
    console.log('getBalance => ', getBalance);
    if (!getBalance) return false

    return true
  }

  async MakeSwap(transfer_object: any) {

    const curUserBalanceFrom: any = await userBalance.findOne({
      userId: transfer_object.userId,
      coinName: transfer_object.coinNameFrom,
    })
    const curUserBalanceTo: any = await userBalance.findOne({
      userId: transfer_object.userId,
      coinName: transfer_object.coinNameTo,
    })
    console.log('UserBalance from is => ', curUserBalanceFrom);
    console.log('UserBalance to is => ', curUserBalanceTo);
    if (!curUserBalanceFrom || !curUserBalanceTo) return false

    if (curUserBalanceFrom.coinBalance < transfer_object.amountInCryptoTo) {
      console.log('the value of received crypto amount is bigger than current user balance');
      return false
    }
    const userUpdatedBalanceFrom: number = curUserBalanceFrom.coinBalance - transfer_object.amountInCryptoFrom
    console.log('cur user balance from => ', userUpdatedBalanceFrom);

    const userUpdatedBalanceTo: number = curUserBalanceTo.coinBalance + transfer_object.amountInCryptoTo
    console.log('cur user balance from => ', userUpdatedBalanceTo);

    await this.BalanceUpdater(transfer_object.userId, transfer_object.coinNameFrom, userUpdatedBalanceFrom)
    await this.BalanceUpdater(transfer_object.userId, transfer_object.coinNameTo, userUpdatedBalanceTo)

    await swapHistory.create({
      userEmail: transfer_object.userEmail,
      userDomain: transfer_object.domainName,
      coinNameFrom: transfer_object.coinNameFrom,
      coinNameTo: transfer_object.coinNameTo,
      cryptoAmountFrom: transfer_object.amountInCryptoFrom,
      cryptoAmountTo: transfer_object.amountInCryptoTo,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      status: transfer_object.swapStatus,
      userId: transfer_object.userId
    })

    const curHistory: any = await swapHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('curHistory =>  ', curHistory);
    if (!curHistory) return false

    return true
  }

  async GetInternalData(userId: string, userEmail?: string) {
    const getUserWallets: any = await userWallet.find({
      userId: userId
    })
    console.log('getUserWallets', getUserWallets.length);
    if (!getUserWallets.length) return false

    let dataArray = []
    for (let i = 0; i <= getUserWallets.length - 1; i++) {
      const getUserBalance: any = await userBalance.findOne({
        coinName: getUserWallets[i].coinName,
        userId: getUserWallets[i].userId
      })
      console.log('getUserBalance', getUserBalance);
      if (!getUserBalance) return false

      let dataObject = {
        coinName: getUserWallets[i].coinName,
        balance: getUserBalance.coinBalance,
        walletAddress: getUserWallets[i].userWallet
      }
      console.log('prepared data => ', dataObject);
      for (let index in dataObject) {
        if (dataObject[index] === undefined || null) return false
      }
      dataArray.push(dataObject)
    }
    console.log('dataArray to send => ', dataArray);
    if (!dataArray.length) return false
    return dataArray

  }


  async getBalances(userId: string, coinName: string) {

    const getUserBalance: any = await userBalance.findOne({
      coinName: coinName,
      userId: userId
    })
    console.log('getUserBalance', getUserBalance);
    if (!getUserBalance) return false
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

    for (let i = 0; i <= userWalletList.length - 1; i++) {
      const dataObject = {
        coinName: userWalletList[i].coinName,
        coinFullName: userWalletList[i].coinFullName,
        userWallet: userWalletList[i].walletAddress,
        userId: candidate.id
      }
      console.log('received data is => ', dataObject);
      for (let index in dataObject) {
        if (dataObject[index] === undefined || null) return false
      }
      await userWallet.create(dataObject)
    }

    const curWallets: any = await userWallet.find({ userId: candidate.id })
    console.log('saved wallet is => ', curWallets);
    if (!curWallets.length) return false

    return curWallets
  }

}

export default new moneyService()