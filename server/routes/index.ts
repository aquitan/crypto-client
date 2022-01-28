import * as express from 'express'
import { body } from 'express-validator'
const router = express.Router()
import authController from '../controller/auth_controller'
import userController from '../controller/user_controller'
import staffController from '../controller/staff_controller'
import authChecker from '../middlewares/auth_middleware'

// auth routes
router.post('/get_promocodes_before_signup/', authController.getPromocodeList)
router.post('/registration/',
  body('email').isEmail(),
  body('password').isLength({
    min: 8,
    max: 32
  }),
  authController.registration)
router.post('/login/', authController.login)
router.post('/logout/', authController.logout)
router.post('/activate/', authController.activate)
router.get('/refresh/', authController.refresh)
router.patch('/forgot_password/', authController.forgotPassword)

// user area routes
router.post('/dashboard/', authChecker, userController.dashboard)
router.post('/personal_area/profile/', userController.personalAreaProfile)
router.patch('/personal_area/profile/edit/', authChecker, userController.personalAreaProfileEdit)
router.post('/personal_area/security/', authChecker, userController.personalAreaSecurity)
router.patch('/personal_area/security/change_password/', authChecker, userController.personalAreaSecurityChangePassword)
router.post('/personal_area/verification/', authChecker, userController.personalAreaKyc)
router.patch('/personal_area/security/disable_two_step_status/', authChecker, userController.disableTwoStepVerificationStatus)


// router.post('/deposit/make_deposit', authChecker, userController.makeDeposit)
// router.post('/deposit/get_withdraw', authChecker, userController.getWithdraw)

// admin - staff routes
router.get('/staff/:id/', staffController.staffDashboard)
router.post('/staff/users/', staffController.usersList)
router.get('/staff/users/user_detail/:id/', staffController.userDetail)
router.post('/staff/users/kyc/', staffController.kycList)
router.patch('/staff/kyc/update_kyc_status/', staffController.changeKycStatus)
router.delete('/staff/kyc/delete_kyc/', staffController.deleteKyc)
router.post('/staff/create_user/', staffController.createNewUser)
router.post('/staff/create_promocode/', staffController.promocodeCreate)
router.post('/staff/get_promocode_list/', staffController.getPromocodeListForStaff)
router.post('/staff/get_used_promocode_list/', staffController.getUsedPromocodeListForStaff)
router.post('/staff/ip_match_checker/', staffController.getIpForMatch)
router.patch('/personal_area/profile/update_premium_status/', staffController.updatePremiumStatus)



export default router;
