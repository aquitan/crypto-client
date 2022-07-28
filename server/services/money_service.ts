
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
import Notification from './notificationServices'
import CryptoService from './crypto_services'
import depositRequest from '../models/Deposit_requests.model'
import { Schema } from 'mongoose'


class moneyService {


  async GenerateDepositAddress(userId: string, userEmail: string, coinName: string, coinFullName: string, date: number) {
    let dataObject = {
      address: '',
      expiredDate: 0
    }


    const checkAddress: any = await depositWallets.findOne({
      coinName: coinName,
      userId: userId
    })
    console.log('checkAddress => ', checkAddress);

    if (checkAddress !== null) {
      console.log('received address is => ', checkAddress.address);
      const tenMin: number = 1000 * 60 * 10
      const curTimestapm = date - checkAddress.expiredDate

      if (curTimestapm <= tenMin) {
        dataObject.address = checkAddress.address
        dataObject.expiredDate = curTimestapm
        return dataObject
      }
    }

    const expiredDate: number = date + (1000 * 60 * 30)
    console.log('expiredDate', expiredDate);

    // generate address
    const generatedAddress: any = await CryptoService.addressGen(coinName)
    // const generatedAddress: string = await generatePassword(44)
    console.log('genAddress data is => ', '\n', generatedAddress);

    await depositWallets.create({
      coinName: coinName,
      coinFullName: coinFullName,
      address: generatedAddress.address,
      seedPhrase: generatedAddress.seedPhrase,
      key: generatedAddress.key,
      expiredDate: expiredDate,
      userEmail: userEmail,
      userId: userId
    })

    const curAddress: any = await depositWallets.findOne({
      address: generatedAddress.address
    })
    console.log('curAddress is => ', curAddress);
    if (!curAddress) return false

    dataObject.address = curAddress.address
    dataObject.expiredDate = expiredDate

    // fork thread



    return dataObject
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

    if (transfer_object.coinNameFrom !== transfer_object.coinNameTo ||
      transfer_object.amountInCrypto <= 0 ||
      transfer_object.amountInUsd <= 0) return 'wrong exchange data.'


    if (staffId) {
      console.log('staff id =>  ', staffId);

      const userData: any = await baseUserData.findOne({ email: transfer_object.userEmail })
      console.log('userData is => ', userData);
      if (!userData) return false

      const validStaffWallet: any = await userWallet.findOne({ userId: staffId, coinName: transfer_object.coinName })
      console.log('validStaffWallet is => ', validStaffWallet);
      if (!validStaffWallet) return false

      const validUserWallet: any = await userWallet.findOne({ userId: userData.id, coinName: transfer_object.coinName })
      console.log('validUserWallet is => ', validUserWallet);
      if (!validUserWallet) return false

      const curUserBalance: any = await userBalance.findOne({
        userEmail: transfer_object.userEmail,
        coinName: transfer_object.coinName,
      })
      console.log('curUserBalance is => ', curUserBalance);
      if (!curUserBalance) return false

      let userUpdatedBalance: number
      if (!transfer_object.transferType) {

        if (curUserBalance.coinBalance < transfer_object.amountInCrypto) {
          console.log('wrong user balance ');
          return false
        }

        userUpdatedBalance = curUserBalance.coinBalance - transfer_object.amountInCrypto
        console.log('cur user balance => ', userUpdatedBalance);
      } else {

        const staffUserBalance: any = await userBalance.findOne({
          userEmail: transfer_object.userEmail,
          coinName: transfer_object.coinName,
        })
        console.log('staffUserBalance is => ', staffUserBalance);
        if (!staffUserBalance) return false

        if (staffUserBalance.coinBalance < transfer_object.amountInCrypto) {
          console.log('wrong staff balance ');
          return false
        }

        userUpdatedBalance = curUserBalance.coinBalance + transfer_object.amountInCrypto
        console.log('cur user balance => ', userUpdatedBalance);
      }

      const secondPartyEmail: any = await userBaseData.findOne({
        email: transfer_object.userEmail
      })

      await this.BalanceUpdater(userData.id, transfer_object.coinName, userUpdatedBalance)

      await internalHistory.create({
        userEmail: transfer_object.userEmail,
        secondUserEmail: secondPartyEmail.email,
        userDomain: transfer_object.domainName,
        coinName: transfer_object.coinName,
        cryptoAmount: transfer_object.amountInCrypto,
        usdAmount: transfer_object.amountInUsd,
        date: transfer_object.currentDate,
        addressFrom: validStaffWallet.address,
        addressTo: validUserWallet.address,
        transferType: transfer_object.transferType,
        status: 'complete',
        staffId: staffId
      })

      const curTransactionHistory: any = await internalHistory.findOne({
        date: transfer_object.currentDate
      })
      console.log('history of cur transaction => ', curTransactionHistory);
      if (!curTransactionHistory) return false

      const notifData = {
        userEmail: transfer_object.userEmail,
        notificationText: `You received  ${transfer_object.amountInCrypto} ${transfer_object.coinName} ( ~ $${transfer_object.amountInUsd} ) at internal transfer!`,
        domainName: transfer_object.domainName,
        userId: userData.id
      }

      await Notification.CreateNotification(notifData)

      return true
    }

    const firstUserWallet: any = await userWallet.findOne({
      address: transfer_object.fromAddress
    })
    const firstUserBalance: any = await userBalance.findOne({
      userId: firstUserWallet.userId,
      coinName: transfer_object.coinName,
    })
    console.log('1st user wallet is => ', firstUserWallet);
    console.log('firstUserBalance is => ', firstUserBalance);
    if (!firstUserBalance || !firstUserWallet) return false

    const secondUserWallet: any = await userWallet.findOne({
      address: transfer_object.toAddress
    })

    const secondPartyUser: any = await userBaseData.findById({
      _id: secondUserWallet.userId
    })

    const secondUserBalance: any = await userBalance.findOne({
      userId: secondUserWallet.userId,
      coinName: transfer_object.coinName,
    })

    console.log('2nd user wallet is => ', secondUserWallet);
    console.log('secondUserBalance is => ', secondUserBalance);

    if (!secondUserWallet || !secondUserBalance) return false

    if (firstUserBalance.coinBalance < transfer_object.amountInCrypto) {
      console.log('the value of received crypto amount is bigger than current user balance');
      return false
    }

    console.log('2nd user wallet is => ', secondUserWallet);
    console.log('secondUserBalance is => ', secondUserBalance);

    const firstUserUpdatedBalance: number = firstUserBalance.coinBalance - transfer_object.amountInCrypto
    console.log('cur first user balance => ', firstUserUpdatedBalance);

    await this.BalanceUpdater(transfer_object.userId, transfer_object.coinName, firstUserUpdatedBalance)

    let historyObject = {
      userEmail: transfer_object.userEmail,
      receiver: secondPartyUser.id,
      sender: firstUserWallet.userId,
      secondUserEmail: secondPartyUser.email,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      addressFrom: transfer_object.fromAddress,
      addressTo: transfer_object.toAddress,
      transferType: false,
      status: transfer_object.transferStatus,
      staffId: 'self'
    }

    await internalHistory.create(historyObject)

    const secondUserUpdatedBalance: number = secondUserBalance.coinBalance + transfer_object.amountInCrypto
    console.log('cur sec user balance => ', secondUserUpdatedBalance);
    await this.BalanceUpdater(secondPartyUser.id, transfer_object.coinName, secondUserUpdatedBalance)

    const curTransactionHistory: any = await internalHistory.findOne({
      date: transfer_object.currentDate
    })
    console.log('history of cur transaction => ', curTransactionHistory);
    if (!curTransactionHistory) return false

    const notifData = {
      userEmail: secondPartyUser.email,
      notificationText: `You received  ${transfer_object.amountInCrypto} ${transfer_object.coinName} ( ~ $${transfer_object.amountInUsd} ) at internal transfer!`,
      domainName: transfer_object.domainName,
      userId: secondUserWallet.userId
    }

    await Notification.CreateNotification(notifData)

    return secondPartyUser.email
  }

  async MakeDeposit(transfer_object: any, logTime: string) {
    if (transfer_object.amountInCrypto <= 0 || transfer_object.amountInUsd <= 0) return 'wrong value.'

    const validAddress: any = await depositWallets.findOne({ address: transfer_object.depositAddress })
    console.log('address data => ', validAddress);
    if (!validAddress) return false


    let depObject = {
      userEmail: transfer_object.userEmail,
      userDomain: transfer_object.domainName,
      coinName: transfer_object.coinName,
      cryptoAmount: transfer_object.amountInCrypto,
      usdAmount: transfer_object.amountInUsd,
      date: transfer_object.currentDate,
      address: transfer_object.depositAddress,
      status: 'pending',
      userId: transfer_object.userId
    }

    console.log('depObject for depositRequest => ', depObject);
    await depositRequest.create(depObject)
    // save deposit in history

    depObject['staffId'] = 'self'
    console.log('depObject for history => ', depObject);

    await depositHistory.create(depObject)

    // let checker = setInterval(async () => {
    //   const balanceCheck = await CheckBalance(transfer_object.coinName, transfer_object.depositAddress)
    //   console.log('balanceCheck => ', balanceCheck);
    //   if (balanceCheck) clearInterval(checker)
    // }, 2000);
    // setInterval(async () => {

    // }, 300_000)

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

    const notifData = {
      userEmail: transfer_object.userEmail,
      notificationText: `Deposit request ( ${transfer_object.amountInCrypto} ~ $${transfer_object.amountInUsd} ) was created!`,
      domainName: transfer_object.domainName,
      userId: transfer_object.userId
    }

    await Notification.CreateNotification(notifData)

    return true
  }

  async MakeDepositAsStaff(transfer_object: any, staffId: string) {
    if (transfer_object.amountInCrypto <= 0 || transfer_object.amountInUsd <= 0) return 'wrong value.'


    const curAddress: any = await CryptoService.addressGen(transfer_object.coinName)
    if (!curAddress) return false
    console.log('received address is => ', curAddress.address);

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
      address: curAddress.address,
      status: 'success',
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
    if (transfer_object.amountInCrypto <= 0 || transfer_object.amountInUsd <= 0) return 'wrong value.'


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

    if (transfer_object.amountInCrypto <= 0 || transfer_object.amountInUsd <= 0) return 'wrong value.'


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

    if (transfer_object.coinNameFrom === transfer_object.coinNameTo) return 'wrong exchange data (coin)'

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


    const user: any = await baseUserData.findOne({ _id: transfer_object.userId })

    const notifData = {
      userEmail: user.email,
      notificationText: `Swap ( ${transfer_object.amountInCryptoFrom} ${transfer_object.coinNameFrom} to ${transfer_object.amountInCryptoTo} ${transfer_object.coinNameTo} ) was success.`,
      domainName: user.domainName,
      userId: user.id
    }

    await Notification.CreateNotification(notifData)

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
        walletAddress: getUserWallets[i].address
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


    // create and save wallets & keys
    const btcWalletData: any = await CryptoService.addressGen('btc')
    const ethWalletData: any = await CryptoService.addressGen('eth')


    const trxAddress: string = await generatePassword(45)

    const solanaWalet: any = {
      coinName: 'SOL',
      address: await generatePassword(44),
      seedPhrase: 'some phrase here ',
    }
    const usdtWallet: any = {
      coinName: 'USDT',
      address: ethWalletData.address,
      seedPhrase: 'some phrase here ',
    }
    const trxWalet: any = {
      coinName: 'TRX',
      address: trxAddress,
      seedPhrase: 'some phrase here ',
    }
    const trxUsdtWalet: any = {
      coinName: 'TRX/USDT',
      address: trxAddress,
      seedPhrase: 'some phrase here ',
    }
    const bchWallet: any = {
      coinName: 'BCH',
      address: await generatePassword(44),
      seedPhrase: 'some phrase here ',
    }

    // const solWalletData: any = await addressGen('sol')

    const walletList = [
      btcWalletData,
      bchWallet,
      ethWalletData,
      usdtWallet,
      trxWalet,
      trxUsdtWalet,
      solanaWalet,
    ]

    for (let i = 0; i <= walletList.length - 1; i++) {
      await userWallet.create({
        coinName: walletList[i].coinName,
        address: walletList[i].address,
        seedPhrase: walletList[i].seedPhrase,
        key: walletList[i].key,
        userId: userId
      })
    }

    const checkWallets: any = await userWallet.find({ userId: candidate.id })
    console.log('saved wallet is => ', checkWallets);
    if (!checkWallets.length) return false

    const addressList = [
      {
        coinName: btcWalletData.coinName,
        coinFullName: 'Bitcoin',
        walletAddress: btcWalletData.address
      },
      {
        coinName: ethWalletData.coinName,
        coinFullName: 'Ethereum',
        walletAddress: ethWalletData.address
      },
      {
        coinName: solanaWalet.coinName,
        coinFullName: 'Solana',
        walletAddress: solanaWalet.address
      },
      {
        coinName: bchWallet.coinName,
        coinFullName: 'BitcoinCash',
        walletAddress: bchWallet.address
      },
      {
        coinName: usdtWallet.coinName,
        coinFullName: 'Teaser',
        walletAddress: ethWalletData.address
      },
      {
        coinName: trxWalet.coinName,
        coinFullName: 'Tron',
        walletAddress: trxUsdtWalet.address
      },
      {
        coinName: trxUsdtWalet.coinName,
        coinFullName: 'TRX/USDT',
        walletAddress: trxUsdtWalet.address
      }
    ]

    return addressList
  }



}

export default new moneyService()