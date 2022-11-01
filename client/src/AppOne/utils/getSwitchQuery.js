

const getDashboard = () => {
    return '/RWlDovL1hcGI4i1PEF2/'
}
const getUserBalance = () => {
    return '/eDjc1XmUcPPzGxQ4aVN/'
}
const makeSwap = () => {
    return '/zzSg8f2wvEmYUq52J2n/'
}
const getSwapHistory = () => {
    return '/UoEZl0lpFZF1uMWsrkt/'
}
const disableTwoStepStatus = () => {
    return '/jyYd506pKaAUgpvwH79/'
}
const changePassword = () => {
    return '/sfmIg2He1At2Q0MdCAf/'
}
const getPersonaAreaSecurity = () => {
    return '/o51ca4lKg80A8XDWwlB'
}
const twoStepEnable = () => {
    return '/jCo6VqQupxfLi6If0nR/'
}
const getDepositHistory = () => {
    return '/FZ9T7Lj0VyTLCK3wE1L/'
}
const getAddressForDeposit = () => {
    return '/Jbz1llKJO1GlWf2oH3a/'
}
const makeDeposit = () => {
    return '/ntM9bBJEtMnPBXtOaGo/'
}
const getDomainParams = () => {
    return '/ULc9xm2ggmsIX3YCXX1/'
}
const checkTwoStep = () => {
    return '/6VlETRYvGIqGNI4YkTY/'
}
const getVerifiedTwoStepCode = () => {
    return '/IGfAC0SLx3eb7cfP0me/'
}
const getPromocodesBeforeSignup = () => {
    return '/r88CQkyPjsH1rn8a67g/'
}
const forgotPassword = () => {
    return '/forgot_password/'
}
const makeWithdraw = () => {
    return '/R7nFReOXE7Y0nYT8Jfm/'
}
const getWithdrawHistory = () => {
    return '/zOaCzPKpig0FL8p0a5U/'
}
const getPersonalAreaProfile = () => {
    return '/jnY7CG07DFYdv28VwBF/'
}
const personalAreaEditUserName = () => {
    return '/bHSEBUw7JnT2cWbnWAs/'
}
const usePromocodeInProfile = () => {
    return '/ALtrh2HpN6VXlL9NLmG/'
}
const personalAreaVerification = () => {
    return '/TV7Mcd3mV2CAyJtRyfn/'
}
const personalAreaVerificationSaveImages = () => {
    return '/hGldDeNBr9Pm5gZhwRK/'
}
const personalAreaCryptoWalletConnectWallet = () => {
    return '/oeIwjfh1AR3svYS2yIA/'
}
const personalAreaCreateSecureDeal = () => {
    return '/lv915XzWJFDALfn7rEb/'
}
const secureDealSecondPartyUserCHecker = () => {
    return '/MXlOiD297mFcqOOFnLQ/'
}
const personalAreaSecureDealDetail = () => {
    return '/VvlrrGFbSVH422TNrMW/'
}
const personalAreaSecureDealHistory = () => {
    return '/outNyDwEI0A0H6Wye9P/'
}
const personalAreaSecureDealAcceptDeal = () => {
    return '/Duv3Lo6jwUJeOOU6gBs/'
}
const secureDealMissDeadline = () => {
    return '/V422wx6H43BlInKQbNg/'
}
const secureDealDeleteDeal = () => {
    return '/U5bdjkr6DJkIRmM5cmW/'
}
const getInternalData = () => {
    return '/d2wVNTxyjPfAYl2MiPb/'
}
const getUserBalanceChecker = () => {
    return '/xYYigtqJqPtUwQ9YdSJ/'
}
const getInternalWalletChecker = () => {
    return '/tZZktolYIyCQ4kQOTrC/'
}
const internalTransferMakeInternalTransfer = () => {
    return '/8OnHgT8ciJO4t7dfwYQ/'
}
const getInternalTransferHistory = () => {
    return '/8fHVbSaOySXjIClr7qK/'
}
const getChatForUser = () => {
    return '/r8RfHPhBA4TrwylGdKb/'
}
const sendSupportMessage = () => {
    return '/w6dtthkM76tlmE9YJjT/'
}
const secureDealDealDetailGetChatForUser = () => {
    return '/QFWsHlt5nJBaqED3PXM/'
}
const secureDealDealDetailSendMessageToSecureDealChat = () => {
    return '/Byw5Ev9HOxB2YiV60OW/'
}
const getNewsForUser = () => {
    return '/440ZBFzLMznaKE8bWnV/'
}
const tradingAddUserData = () => {
    return '/JJfEdBMohM6EwT8osoq/'
}
const getValidTradingData = () => {
    return 'VZoFsTFc63TvzfrOzEO/'
}
const getSendBaseParams = () => {
    return '/c6LiTNEF8njxa7gvIfL/'
}
const getOrderHistory = () => {
    return '/USsZEJtC5xUf5N2l1po/'
}
const tradingMakeOrder = () => {
    return '/mOqX4ZMv2kEUOecSP4u/'
}
const tradingCancelOrder = () => {
    return '/EZerfMwrtQTP19NBaH3/'
}
const cryptoWalletDisconectWallet = () => {
    return '/Z6gLcC29qBrRrU3Xjcs/'
}
const validateTgCode = () => {
    return '/KwTDX3Q89aCN6plyQcZ/'
}
const validateGoogleCode = () => {
    return '/voE5FuNlERxh7LTlt91/'
}
const addBankAccount = () => {
    return '/stYue9qS573bByZVeex/'
}
const deleteBankAccount = () => {
    return '/gICXLBKHuFy43cOW0vm/'
}


export const getSwitchQuery = (path) => {
    switch (path) {
        case '/dashboard/':
            return getDashboard();
        case '/get_user_balance/':
            return getUserBalance();
        case '/swap/make_swap/':
            return makeSwap();
        case '/swap/get_swap_history/':
            return getSwapHistory();
        case '/personal_area/security/disable_two_step_status/':
            return disableTwoStepStatus()
        case '/personal_area/security/change_password':
            return changePassword();
        case '/personal_area/security/':
            return getPersonaAreaSecurity();
        case '/personal_area/security/two_step_enable/':
            return twoStepEnable();
        case '/deposit/get_deposit_history/':
            return getDepositHistory();
        case '/get_address_for_deposit/':
            return getAddressForDeposit();
        case '/deposit/make_deposit/':
            return makeDeposit();
        case '/get_domain_params/':
            return getDomainParams()
        case '/check_two_step/':
            return checkTwoStep()
        case '/get_verified_two_step_code/':
            return getVerifiedTwoStepCode();
        case '/get_promocodes_before_signup/':
            return getPromocodesBeforeSignup();
        case '/forgot_password/':
            return forgotPassword();
        case '/withdraw/make_withdraw/':
            return makeWithdraw();
        case '/withdraw/get_withdrawal_history/':
            return getWithdrawHistory();
        case '/personal_area/profile/':
            return getPersonalAreaProfile();
        case '/personal_area/profile/edit_user_name/':
            return personalAreaEditUserName();
        case '/use_promocode_in_profile/':
            return usePromocodeInProfile();
        case '/personal_area/verification':
            return personalAreaVerification();
        case '/personal_area/verification/save_images/':
            return personalAreaVerificationSaveImages();
        case '/personal_area/crypto_wallet/connect_wallet/':
            return personalAreaCryptoWalletConnectWallet();
        case '/personal_area/secure_deal/create_secure_deal/':
            return personalAreaCreateSecureDeal();
        case '/second_party_user_checker/':
            return secureDealSecondPartyUserCHecker();
        case '/personal_area/secure_deal/secure_deal_detail/':
            return personalAreaSecureDealDetail();
        case '/personal_area/secure_deal/secure_deal_history/':
            return personalAreaSecureDealHistory();
        case '/personal_area/secure_deal/secure_deal_detail/accept_deal/':
            return personalAreaSecureDealAcceptDeal();
        case '/personal_area/secure_deal/secure_deal_detail/miss_dedline/':
            return secureDealMissDeadline();
        case '/personal_area/secure_deal/secure_deal_detail/delete_deal/':
            return secureDealDeleteDeal();
        case '/get_internal_data/':
            return getInternalData();
        case '/user_balance_checker/':
            return getUserBalanceChecker();
        case '/internal_wallet_checker/':
            return getInternalWalletChecker();
        case '/internal_transfer/make_internal_transfer/':
            return internalTransferMakeInternalTransfer();
        case '/internal_transfer/get_internal_transfer_history/':
            return getInternalTransferHistory();
        case '/support/get_chat_for_user/':
            return getChatForUser();
        case '/support/send_support_message/':
            return sendSupportMessage();
        case '/secure_deal/deal_detail/get_chat_for_user':
            return secureDealDealDetailGetChatForUser();
        case '/secure_deal/deal_detail/send_message_to_secure_deal_chat':
            return secureDealDealDetailSendMessageToSecureDealChat();
        case '/news/get_news_for_user/':
            return getNewsForUser();
        case '/trading/add_user_data/':
            return tradingAddUserData();
        case '/trading/get_valid_trading_data/':
            return getValidTradingData();
        case '/trading/send_base_params/':
            return getSendBaseParams();
        case '/trading/order_history/':
            return getOrderHistory();
        case '/trading/make_order/':
            return tradingMakeOrder();
        case '/trading/cancel_order/':
            return tradingCancelOrder();
        case '/personal_area/crypto_wallet/disconnect_wallet/':
            return cryptoWalletDisconectWallet();
        case '/personal_area/security/validate_telegram_code':
            return validateTgCode();
        case '/personal_area/security/validate_google_code/':
            return validateGoogleCode();
        case '/personal_area/bank_account/add_account/':
            return addBankAccount();
        case '/personal_area/bank_account/delete_account/':
            return deleteBankAccount()

        default: 
        return console.log('error');
    } 
}