import * as express from 'express'
import { body } from 'express-validator'
const router = express.Router()
import authController from '../controller/auth_controller'
import userController from '../controller/user_controller'
import staffController from '../controller/staff_controller'
import authChecker from '../middlewares/auth_middleware'

// auth routes
router.post('/get_domain_params/', authController.getDomainParams)
router.post('/get_promocodes_before_signup/', authController.getPromocodeList)

router.put('/registration/',
  body('email').isEmail(),
  body('password').isLength({
    min: 8,
    max: 32
  }),
  authController.registration)
router.post('/check_two_step/', authController.checkTwoStep)
router.post('/login/', authController.login)
router.post('/logout/', authController.logout)
router.post('/activate/', authController.activate)
router.get('/refresh/', authController.refresh)
router.patch('/forgot_password/', authController.forgotPassword)

// user area routes
router.post('/dashboard/', authChecker, userController.dashboard)
router.post('/personal_area/profile/', userController.personalAreaProfile)
router.patch('/personal_area/profile/edit/', authChecker, userController.personalAreaProfileEdit)

router.patch('/personal_area/security/', authChecker, userController.twoStepVerificationEnable)
router.post('/personal_area/security/two_step_enable/', authChecker, userController.enableTwoStepVerificationStatus)

router.patch('/personal_area/security/change_password/', authChecker, userController.personalAreaSecurityChangePassword)
router.post('/personal_area/verification/', authChecker, userController.personalAreaKyc)
router.patch('/personal_area/security/disable_two_step_status/', authChecker, userController.disableTwoStepVerificationStatus)

// router.put('/wallets/create_user_wallet/', authChecker, userController.createUserWallet)
// router.get('/internal_wallets/get_user_internal_wallet/', authChecker, userController.getInternalWallet)

// router.post('/deposit/make_deposit', authChecker, userController.makeDeposit)
// router.post('/withdraw/get_withdraw', authChecker, userController.getWithdraw)

// admin - staff routes
router.get('/staff/:id/', staffController.staffDashboard)
router.post('/staff/users/', staffController.usersList)
router.get('/staff/users/user_detail/:id/', staffController.userDetail)
router.post('/staff/users/kyc/', staffController.kycList)
router.patch('/staff/users/user_detail/update_premium_status/', staffController.updatePremiumStatus)
router.patch('/staff/users/user_detail/update_swap_ban_status/', staffController.updateSwapBan)
router.patch('/staff/users/user_detail/update_internal_ban_status/', staffController.updateInternalBan)
router.patch('/staff/users/user_detail/update_full_ban_status/', staffController.updateFullBan)
router.patch('/staff/users/user_detail/update_double_deposit/', staffController.updateDoubleDeposit)
router.patch('/staff/users/user_detail/clear_match_ip_list/', staffController.clearMatchIpList)
router.patch('/staff/users/user_detail/update_staff_status/', staffController.updateStaffStatus)
router.patch('/staff/users/user_detail/update_staff_support_name/', staffController.updateStaffSupportName)

router.patch('/staff/kyc/update_kyc_status/', staffController.changeKycStatus)
router.delete('/staff/kyc/delete_kyc/', staffController.deleteKyc)
router.post('/staff/create_user/', staffController.createNewUser)
router.put('/staff/create_promocode/', staffController.promocodeCreate)
router.post('/staff/get_promocode_list/', staffController.getPromocodeListForStaff)
router.post('/staff/get_used_promocode_list/', staffController.getUsedPromocodeListForStaff)
router.delete('/staff/delete_promocode/', staffController.removePromocode)

router.post('/staff/ip_match_checker/', staffController.getIpForMatch)

router.put('/staff/domains/create_domain/', staffController.createDomain)
router.get('/staff/domains/domain_detail/:id/', staffController.getDomainDetail)
router.post('/staff/domains/get_active_domains/', staffController.getDomainsList)
router.put('/staff/errors/create_new_error/', staffController.createCustomError)
router.get('/staff/errors/get_all_errors/:id/', staffController.getAllErrors) // domain ID

router.put('/staff/notifications/create_new_notification/', staffController.createNewNotification)
router.post('/staff/notifications/get_all_notifications/', staffController.getNotificationList)

router.put('/staff/news/news_create/', staffController.newsCreate)
router.patch('/staff/news/news_edit/', staffController.editNews)
router.post('/staff/news/get_news_list/', staffController.getNewsList)

// router.put('/staff/wallets/create_staff_wallet/', staffController.createStaffWallet)
router.patch('/update_terms/', staffController.updateTerms) // +
router.get('/staff/project_support/', staffController.projectSupport) // +
router.post('/staff/project_support_form/', staffController.projectSupportRequest) // +



export default router;
