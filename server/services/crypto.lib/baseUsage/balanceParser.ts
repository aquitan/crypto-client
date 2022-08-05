import depositRequest from '../../../models/Deposit_requests.model'
import domainList from '../../../models/Domain_list.model'
import userBaseData from '../../../models/User_base_data.model'
import staffWallet from '../../../models/staff_wallet.model'
import recruiterOwnUsers from '../../../models/recruiter_own_users.model'
import recruiterWallet from '../../../models/recruiter_wallet.model'
import { isGroupMemberCheck, isRecruiterCheck } from '../../validHelper'
import { transactionData } from '../lib.helper/transactionData.interface'
import CheckBalance from '../../crypto.lib/baseUsage/balance_checker'
import SendTransaction from './sendTransaction'


async function balanceParser() {

  const depositList: any = await depositRequest.find()
  console.log('deposit list is => ', depositList);

  let curDomain: string[] = []

  let dataForTransaction: transactionData = {
    coinName: '',
    recruiterFee: 0,
    staffFee: 0,
    staffWallet: '',
    recruiterWallet: null,
    balanceSum: 0
  }

  for (let i = 0; i <= depositList.length - 1; i++) {
    console.log('list iter is => ', depositList[i]);

    const balance: number | boolean = await CheckBalance(depositList[i].coinName, depositList[i].address);
    console.log('cur balance is => ', balance);

    if (typeof balance !== 'boolean') {
      const ownerData: any = await domainList.findOne({ domainName: depositList[i].userDomain })
      console.log('domain is => ', ownerData);

      const staffData: any = await userBaseData.findOne({ _id: ownerData.domainOwner })
      console.log('staff data => ', staffData);

      const staffWalletData: any = await staffWallet.findOne({ staffId: staffData.id, coinName: depositList[i].coinName })
      console.log('staffWalletData => ', staffWalletData);

      const hasOwnRecruiter: any = await recruiterOwnUsers.findOne({ staffEmail: staffData.email })
      console.log('hasOwnRecruiter data => ', hasOwnRecruiter);

      if (hasOwnRecruiter) {
        const recruiterWalletData: any = await recruiterWallet.findOne({ recruiterId: hasOwnRecruiter.recruiterId, coinName: depositList[i].coinName })
        console.log('recruiterWalletData => ', recruiterWalletData);

        dataForTransaction.coinName = depositList[i].coinName
        dataForTransaction.recruiterFee = hasOwnRecruiter.recruiterFee
        dataForTransaction.staffFee = hasOwnRecruiter.staffFee
        dataForTransaction.staffWallet = staffWalletData.walletAddress
        dataForTransaction.recruiterWallet = recruiterWalletData.walletAddress
        dataForTransaction.balanceSum = balance
        Object.freeze(dataForTransaction)

        console.log('prepeared data for transaction is => ', dataForTransaction);
        const sendCrypto: boolean = await SendTransaction(dataForTransaction)
        console.log('sendCrypto result is => ', sendCrypto);

      }
      dataForTransaction.coinName = depositList[i].coinName
      dataForTransaction.recruiterFee = hasOwnRecruiter.recruiterFee
      dataForTransaction.staffFee = hasOwnRecruiter.staffFee
      dataForTransaction.staffWallet = staffWalletData.walletAddress
      dataForTransaction.balanceSum = balance
      Object.freeze(dataForTransaction)

      console.log('prepeared data for transaction is => ', dataForTransaction);
      const sendCrypto: boolean = await SendTransaction(dataForTransaction)
      console.log('sendCrypto result is => ', sendCrypto);

    } else {
      continue;
    }

    curDomain.push(depositList[i].userDomain)
  }



} 