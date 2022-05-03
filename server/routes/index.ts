import * as express from 'express'
import { body } from 'express-validator'
const router = express.Router()
import authController from '../controller/auth_controller'
import userController from '../controller/user_controller'
import staffController from '../controller/staff_controller'
import authChecker from '../middlewares/auth_middleware'

// auth routes
router.post('/get_domain_params/', authController.getDomainParams) // base domain params 
router.post('/get_promocodes_before_signup/', authController.getPromocodeList)  // get promo list

router.post('/registration/',
  body('email').isEmail(),
  body('password').isLength({
    min: 8,
    max: 32
  }),
  authController.registration)
router.post('/promocode_validate/', authController.getVerifiedPromocode) // verify code before signup
router.post('/check_two_step/', authController.checkTwoStep) // check user 2factor status => if true => send code & wait request to next endpoint 
router.post('/get_verified_two_step_code/', authController.getVerifiedTwoStepCode) // validate promo code at sign up
router.post('/login/', authController.login)
router.post('/logout/', authController.logout)
router.post('/activate/', authController.activate) // activate user by link in email
router.get('/refresh/', authController.refresh)
router.patch('/forgot_password/', authController.forgotPassword)

// user area routes
router.post('/dashboard/', authChecker, userController.dashboard) // get base user data for dashboard (total balance, currencies, etc)
router.post('/personal_area/profile/', userController.personalAreaProfile) // get base user profile data
// router.patch('/personal_area/profile/edit/', authChecker, userController.personalAreaProfileEdit) // edit display name in user profile
router.post('/use_promocode_in_profile/', authChecker, userController.usePromocodeInProfile) // use promo code in user area, if promo don't use at signup
router.patch('/personal_area/security/', authChecker, userController.twoStepVerificationEnable) // change 2fa type & send code 
router.patch('/personal_area/security/change_password/', authChecker, userController.personalAreaSecurityChangePassword)
router.post('/personal_area/security/two_step_enable/', authChecker, userController.enableTwoStepVerificationStatus) // update and enable 2fa status 
router.patch('/personal_area/security/disable_two_step_status/', authChecker, userController.disableTwoStepVerificationStatus) // disable 2fa status

// router.delete('/user_two_step_code_list/delete_code/', userController.deleteExpiredCode) // request to delete 2fa code if it's not used

router.put('/personal_area/verification/', authChecker, userController.personalAreaKyc) // send kyc data

// router.put('/personal_area/create_secure_deal/', authChecker, userController.secureDealCreate) // create secure deal
// router.get('/personal_area/secure_deal_detail/:id'/, authChecker, userController.getSecureDealDetail) // get detail deal ingo by id
// router.patch('/personal_area/secure_deal/accept_deal/', authChecker, userController.acceptDeal) // accept deal

// router.put('/wallets/create_user_wallet/', authChecker, userController.createUserWallet)
// router.get('/internal_wallets/get_user_internal_wallet/', authChecker, userController.getInternalWallet)

// user money transfer logic
router.put('/deposit/make_deposit/', authChecker, userController.makeDeposit) // create deposit as user
router.get('/deposit/get_deposit_history/:id/', authChecker, userController.getDepositHistory) // get deposit history
router.put('/withdraw/make_withdraw/', authChecker, userController.makeWithdrawal) // make withdrawal request as user
router.get('/withdraw/get_withdrawal_history/:id/', authChecker, userController.getWithdrawalHistory) // get withdrawal history
router.put('/swap/make_swap/', authChecker, userController.makeSwap) // swap currency to another currency with user fee*
router.get('/swap/get_swap_history/:id/', authChecker, userController.getSwapHistory) // get swap history by user id
router.put('/internal_transfer/make_internal_transfer/', authChecker, userController.makeInternalTransfer) // make internal domain transaction*
router.get('/internal_transfer/get_internal_transfer_history/:id/', authChecker, userController.getInternalTransferHistory) // get internal transfer history bu user id

// admin + staff routes
router.post('/staff/dashboard', staffController.staffDashboard)
router.post('/staff/users/', staffController.usersList) // get all users (if staff => when staff is domain owner) (if admin & other => all users )
router.get('/staff/users/user_detail/:id/', staffController.userDetail) // selected user detail info
router.patch('/staff/users/user_detail/update_user_deposit_fee/', staffController.updateDepositFee) // update deposit fee for user by staff
router.patch('/staff/users/user_detail/update_premium_status/', staffController.updatePremiumStatus) // update premium status for user
router.patch('/staff/users/user_detail/update_swap_ban_status/', staffController.updateSwapBan) // update swap ban for user
router.patch('/staff/users/user_detail/update_internal_ban_status/', staffController.updateInternalBan) // update internal swap ban for user
router.patch('/staff/users/user_detail/update_full_ban_status/', staffController.updateFullBan) // update full ban for user
router.patch('/staff/users/user_detail/update_double_deposit/', staffController.updateDoubleDeposit) // update double deposit status for user
router.patch('/staff/users/user_detail/clear_match_ip_list/', staffController.clearMatchIpList) // ip match list checker (if someone has the same ip => send user ip & user email)
router.patch('/staff/users/user_detail/update_staff_status/', staffController.updateStaffStatus) // get staff permission to regular user 
router.patch('/staff/users/user_detail/update_staff_support_name/', staffController.updateStaffSupportName) // change name for staff in support chat

router.post('/staff/users/kyc/', staffController.kycList) // get kyc list (if staff => when staff is domain owner) (if admin & other => all kyc )
router.patch('/staff/kyc/update_kyc_status/', staffController.changeKycStatus) // change kyc status for user (in user verification page)
router.delete('/staff/kyc/delete_kyc/', staffController.deleteKyc) // delete full kyc data for current user

router.post('/staff/create_user/', staffController.createNewUser) // create user as staff in staff panel
router.put('/staff/create_promocode/', staffController.promocodeCreate) // create promocode (one or several codes)
router.post('/staff/get_promocode_list/', staffController.getPromocodeListForStaff) // get active (not used) promocodes by staff domain (if admin => get all promocode list from all domains)
router.post('/staff/get_used_promocode_list/', staffController.getUsedPromocodeListForStaff) // get used promocodes by staff domain (if admin => get all promocode list from all domains)
router.delete('/staff/delete_promocode/', staffController.removePromocode) // delete one promocode 
router.delete('/staff/delete_all_used_promocode/', staffController.deleteUsedPromocodes) // delete all promocodes

router.post('/staff/ip_match_checker/', staffController.getIpForMatch) // check user ip for match

router.post('/staff/domains/create_domain/', staffController.createDomain) // create base domain settings & detail settings & base withdrawal errors
router.get('/staff/domains/domain_detail/:id/', staffController.getDomainDetail) // get detail domain page by domain id
// router.delete('/staff/domains/base_domain_delete/', staffController.baseDomainDelete) // only info about domain, errors, domain settings, terms for current domain
// router.delete('/staff/domains/full_domain_delete/', staffController.fullDomainDelete) // all users & all relationship by domain ID in project

router.patch('/staff/domains/domain_detail/domain_edit/', staffController.editDomainInfo) // edit base domain settings & detail settings & base withdrawal errors

router.post('/staff/domains/get_active_domains/', staffController.getDomainsList) // get domain list (if staff => when domain owner is staff ) ( if admin and other => all domains )
router.put('/staff/errors/create_new_error/', staffController.createCustomError) // create new error for selected domain
router.get('/staff/errors/get_all_errors/:id/', staffController.getAllErrors) // get domain errors by domain ID
router.post('/staff/errors/get_errors_by_domain_name/', staffController.getErrorsByDomainName) // domain name where staff email is domain owner

router.put('/staff/notifications/create_new_notification/', staffController.createNewNotification) // create new notification for user
router.post('/staff/notifications/get_all_notifications/', staffController.getNotificationList) // get notification request by user_id

router.put('/staff/news/news_create/', staffController.newsCreate) // create news for user 
router.patch('/staff/news/news_edit/', staffController.editNews) // edit news 
router.post('/staff/news/get_news_list/', staffController.getNewsList) // get news list (if staff => only on onw domain) (if admin or other => find news by any domain)

// transaction logic
router.put('/staff/create_transaction/create_regular_deposit_transaction/', staffController.createDepositForUserAsStaff) // create deposit for user in your own domain as staff or for any user in project as admin
router.put('/staff/create_transaction/create_regular_withdrawal_transaction/', staffController.createWithdrawalForStaff) // create approved withdrawal for user in your own domain as staff or for any user in project as admin
router.put('/staff/create_transaction/create_internal_transfer_as_deposit/', staffController.createInternalTransaction) // reate approved internal withdrawal OR create internal deposit for your account
router.post('/staff/create_transaction/get_transaction_history/', staffController.getTransactionsHistory) // get history about all transaction in your account


// router.put('/staff/wallets/create_staff_wallet/', staffController.createStaffWallet) // create staff wallet & staff 2fa checker
// router.post('/staff/staff_wallets/get_wallets/', staffController.getStaffWallet) // if staff => get support wallet for current staff, (if admin) => select with staff emails to choose wallet by current staff user
// router.patch('/staff/staff_wallets/edit_staff_wallets/', staffController.editStaffWallets) // edit wallets for current staff ONLY by root

router.post('/staff/terms/get_term_by_domain/', staffController.getTermsByDomainName) // get terms by selected domain
router.patch('/staff/terms/update_terms/', staffController.updateTerms) // update terms at selected domain
router.get('/staff/project_support/get_wallet/', staffController.projectSupport) // if staff => get support wallet for current staff, (if admin) => select with staff emails to choose wallet by current staff user 


router.post('/staff/project_support_form/', staffController.projectSupportRequest) // send question to platform developers



export default router;
