import axios from 'axios'
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import * as bitcoin from 'bitcoinjs-lib'
import { Buffer } from 'buffer'
import * as ethers from 'ethers'
// import crypto from 'crypto'
import * as Wallet from 'ethereumjs-wallet'
import * as web3 from '@solana/web3.js'
import generatePassword from '../api/password_generator'


class CryptoService {

  async CheckBalance(coinName: string, address: string): Promise<number | boolean> {

    if (!coinName && !address) return false
    // const coin: string = coinName.toLowerCase()

    if (coinName === 'btc') {

      const coinData: any = await axios(`https://chain.so/api/v2/address/BTC/${address}`)
      console.log('received data  => ', coinData.data.data);
      return coinData.data.data.balance
    }
    if (coinName === 'eth') {

    }

    return false
  }

  async addressGen(coinName: string) {
    if (!coinName) return false
    // get address from api

    if (coinName === 'btc') {
      // https://javascript.plainenglish.io/generate-your-own-bitcoin-wallet-within-5-minutes-3c36176b47ee?gi=c00ebff5e60f



      // https://github.com/bitpay/bitcore/tree/master/packages/bitcore-lib
      const network = bitcoin.networks.bitcoin
      const path = `m/44'/0'/0'/0` // use 'm/44'/1'/0'/0 for testnet

      const mnemonic = bip39.generateMnemonic()
      const seed = bip39.mnemonicToSeedSync(mnemonic)
      const root = bip32.fromSeed(seed, network)

      const account = root.derivePath(path)
      const node = account.derive(0).derive(0)

      const btcAddress = bitcoin.payments.p2pkh({
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
    if (coinName === 'eth') {
      // https://levelup.gitconnected.com/generate-ethereum-address-using-node-js-a6a73f42a4cf

      const EthWallet = Wallet.default.generate();

      console.log(`
      Generated wallet: 
      - address : ${EthWallet.getAddressString()},
      - key : ${EthWallet.getPrivateKeyString()},
      - pubKey : ${EthWallet.getPublicKeyString()}
  `);

      const dataObject = {
        coinName: 'ETH',
        address: EthWallet.getAddressString(),
        key: EthWallet.getPrivateKeyString(),
        seedPhrase: EthWallet.getPublicKeyString()
      }
      return dataObject

    }

    if (coinName === 'trx') {

    }

    if (coinName === 'usdt') {

    }

    if (coinName === 'trxusdt') {

    }
    // if (coinName === 'sol') {
    //   // https://docs.solana.com/developing/clients/javascript-reference

    //   // const keypair = Keypair.generate()
    //   // console.log('keypair => ', keypair.publicKey.toBase58());
    //   // console.log('keypair => ', keypair.secretKey)

    //   // Create a PublicKey with a base58 encoded string
    //   const str: string = await generatePassword(44)
    //   console.log('pubKey 4 sol => ', str);

    //   const base58publicKey: any = new web3.PublicKey(str);
    //   console.log('base58publicKey => ', base58publicKey.toBase58());


    //   // Create an Address
    //   const highEntropyBuffer = crypto.randomBytes(31);
    //   const addressFromKey = await web3.PublicKey.createProgramAddress([highEntropyBuffer.slice(0, 31)], base58publicKey);
    //   console.log(`Generated Program Address: ${addressFromKey.toBase58()}`);

    //   // // Find address given a PublicKey
    //   // let solAddress = await web3.PublicKey.findProgramAddress([Buffer.from('', 'utf8')], addressFromKey);
    //   // console.log(`Valid Program Address: ${solAddress}`);

    //   const dataObject = {
    //     coinName: 'SOL',
    //     address: addressFromKey.toBase58(),
    //     key: base58publicKey,
    //     seedPhrase: ''
    //   }
    //   return dataObject
    // };


    return false
  }

}

export default new CryptoService()