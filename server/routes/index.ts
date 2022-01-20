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
router.get('/activate/', authController.activate)
router.get('/refresh/', authController.refresh)

// save user actions 
router.get('/user_logs/', userController.saveUserLogs)

// user area routes
router.get('/dashboard/', authChecker, userController.dashboard)
router.get('/personal_area/profile/', authChecker, userController.personalAreaProfile)
router.get('/personal_area/security/', authChecker, userController.personalAreaSecurity)
router.get('/personal_area/verification/', authChecker, userController.verification)


// admin - staff routes
router.get('/staff/', staffController.staffDashboard)
router.get('/staff/users/', staffController.usersList)
router.get('/staff/users/user_detail', staffController.userDetail)
router.get('/staff/users/user_logs', staffController.getUserLogs)
router.get('/staff/users/kyc/', staffController.kycList)
router.get('/staff/create_user', staffController.createNewUser)


export default router;
