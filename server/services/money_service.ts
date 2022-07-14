
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
import axios from 'axios'
import bip32 from 'bip32'
import bip39 from 'bip39'
import bitcoin from 'bitcoinjs-lib'
import { Buffer } from 'buffer'
import ethers from 'ethers'
import crypto from 'crypto'
import web3 from '@solana/web3.js'

async function addressGen(coinName: string) {
  if (!coinName) return false
  // get address from api

  if (coinName === 'btc') {

    const network = bitcoin.networks.bitcoin
    const path = `m/44'/0'/0'/0` // change path

    let mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    let root = bip32.fromSeed(seed, network)

    let account = root.derivePath(path)
    let node = account.derive(0).derive(0)

    let btcAddress = bitcoin.payments.p2pkh({
      pubkey: node.publicKey,
      network: network
    }).address

    console.log(`
      Generated wallet: 

      - address : ${btcAddress},
      - key : ${node.toWIF()},
      - mnemonic : ${mnemonic}
  `);

    const dataObject = {
      coinName: 'BTC',
      address: btcAddress,
      key: node.toWIF(),
      seedPhrase: mnemonic
    }

    return dataObject
  }
  if (coinName === 'etc') {
    // https://www.quicknode.com/guides/web3-sdks/how-to-generate-a-new-ethereum-address-in-javascript
    var id = crypto.randomBytes(32).toString('hex');
    var privateKey = "0x" + id;

    var wallet = new ethers.Wallet(privateKey);
    // console.log("wallet : " + wallet.)

    console.log(`
      Generated wallet: 
      - address : ${wallet.address},
      - key : ${privateKey},
  `);

    const dataObject = {
      coinName: 'ETH',
      address: wallet.address,
      key: privateKey,
      seedPhrase: ''
    }
    return dataObject

  }

  if (coinName === 'trx') {

  }

  if (coinName === 'usdt') {

  }

  if (coinName === 'trxusdt') {

  }
  if (coinName === 'sol') {
    // https://docs.solana.com/developing/clients/javascript-reference

    // let keypair = web3.Keypair.generate()
    // console.log('keypair => ', keypair.publicKey.toBase58());
    // console.log('keypair => ', keypair.secretKey)

    // Create a PublicKey with a base58 encoded string
    const str: string = await generatePassword(44)
    let base58publicKey = new web3.PublicKey(str);
    console.log(base58publicKey.toBase58());


    // Create an Address
    let highEntropyBuffer = crypto.randomBytes(31);
    let addressFromKey = await web3.PublicKey.createProgramAddress([highEntropyBuffer.slice(0, 31)], base58publicKey);
    console.log(`Generated Program Address: ${addressFromKey.toBase58()}`);

    // // Find address given a PublicKey
    // let solAddress = await web3.PublicKey.findProgramAddress([Buffer.from('', 'utf8')], addressFromKey);
    // console.log(`Valid Program Address: ${solAddress}`);

    const dataObject = {
      coinName: 'SOL',
      address: addressFromKey.toBase58(),
      key: base58publicKey,
      seedPhrase: ''
    }
    return dataObject
  };


  return false
}




class moneyService {

  async CheckBalance(coinName: string, address: string): Promise<number | boolean> {
    if (!coinName && !address) return false
    const coin: string = coinName.toLowerCase()

    if (coin === 'btc') {
      const coinData: any = await axios(`https://chain.so/api/v2/address/BTC/${address}`)
      console.log('received data  => ', coinData.data.data);
      return coinData.data.data.balance
    }

    return false
  }

  async AprooveTransaction(coinName) {

  }

  async GenerateDepositAddress(userId: string, userEmail: string, coinName: string, coinFullName: string, date: number) {

    const checkAddress: any = await depositWallets.findOne({
      coinName: coinName,
      coinFullName: coinFullName,
      userId: userId
    })
    console.log('received address is => ', checkAddress.address);

    let dataObject = {
      address: '',
      expiredDate: 0
    }

    const tenMin: number = 1000 * 60 * 10
    const curTimestapm = date - checkAddress.expiredDate

    if (curTimestapm <= tenMin) {
      dataObject.address = checkAddress.address
      dataObject.expiredDate = curTimestapm
      return dataObject
    }

    const expiredDate: number = date + (1000 * 60 * 30)
    console.log('expiredDate', expiredDate);

    // generate address
    const generatedAddress: any = await addressGen(coinName)
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

    const validAddress: any = await depositWallets.findOne({ address: transfer_object.address })
    console.log('address data => ', validAddress);
    if (!validAddress) return false

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
      notificationText: `Deposit request ( ${transfer_object.amountInCryptoFrom} ${transfer_object.coinNameFrom} ) was create!`,
      domainName: transfer_object.domainName,
      userId: transfer_object.userId
    }

    await Notification.CreateNotification(notifData)

    return true
  }

  async MakeDepositAsStaff(transfer_object: any, staffId: string) {

    const curAddress: any = await addressGen(transfer_object.coinName)
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


    // create and save wallets & keys
    const btcWalletData: any = await addressGen('btc')
    const ethWalletData: any = await addressGen('eth')
    const solWalletData: any = await addressGen('sol')

    const walletList = [
      btcWalletData,
      ethWalletData,
      solWalletData
    ]

    for (let i = 0; i <= walletList.length - 1; i++) {
      await userWallet.create({
        coinName: walletList[i].coinName,
        address: btcWalletData.address,
        seedPhrase: btcWalletData.seed,
        key: btcWalletData.key,
        userId: userId
      })
    }

    const checkWallets: any = await userWallet.find({ userId: candidate.id })
    console.log('saved wallet is => ', checkWallets);
    if (!checkWallets.length) return false

    const addressList = [
      {
        coinName: 'BTC',
        coinFullName: 'Bitcoin',
        walletAddress: btcWalletData.address
      },
      {
        coinName: 'ETH',
        coinFullName: 'Ethereum',
        walletAddress: ethWalletData.address
      },
      {
        coinName: 'SOL',
        coinFullName: 'Solana',
        walletAddress: solWalletData.address
      },
      {
        coinName: 'BCH',
        coinFullName: 'BitcoinCash',
        walletAddress: await generatePassword(43)
      },
      {
        coinName: 'USDT',
        coinFullName: 'Teaser',
        walletAddress: await generatePassword(42)
      },
      {
        coinName: 'TRX',
        coinFullName: 'Tron',
        walletAddress: await generatePassword(42)
      },
      {
        coinName: 'TRX/USDT',
        coinFullName: 'TronUsdt',
        walletAddress: await generatePassword(42)
      }
    ]

    return addressList
  }



}

export default new moneyService()