import * as express from 'express'
import { body } from 'express-validator'
const router = express.Router()
import authController from '../controller/auth_controller'
import userController from '../controller/user_controller'
import staffController from '../controller/staff_controller'
import authChecker from '../middlewares/auth_middleware'

// auth routes
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

// // save user actions 
// router.post('/user_logs/', userController.saveUserLogs)

// user area routes
router.post('/dashboard/', authChecker, userController.dashboard)
router.post('/personal_area/profile/', authChecker, userController.personalAreaProfile)
router.post('/personal_area/security/', authChecker, userController.personalAreaSecurity)
router.post('/personal_area/security/change_password/', authChecker, userController.personalAreaSecurityChangePassword)
router.post('/personal_area/verification/', authChecker, userController.personalAreaKyc)


// admin - staff routes
router.get('/staff/', staffController.staffDashboard)
router.get('/staff/users/', staffController.usersList)
router.get('/staff/users/user_detail', staffController.userDetail)
router.get('/staff/users/user_logs', staffController.getUserLogs)
router.get('/staff/users/kyc/', staffController.kycList)
router.get('/staff/create_user', staffController.createNewUser)


export default router;
