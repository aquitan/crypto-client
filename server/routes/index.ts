import * as express from 'express'
import { body } from 'express-validator'
const router = express.Router()
import authController from '../controller/auth_controller'
import userController from '../controller/user_controller'
import staffController from '../controller/staff_controller'


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
router.get('/activate/:link', authController.activate)
router.get('/refresh/', authController.refresh)


// user area routes
router.get('/dashboard/', userController.dashboard)
router.get('/personal_area/', userController.personalArea)
router.get('/personal_area/security/', userController.personalAreaSecurity)
router.get('/personal_area/verification/', userController.verification)


// admin - staff routes
router.get('/staff/', staffController.staffDashboard)
router.get('/staff/users/', staffController.users)
router.get('/staff/users/user_detail', staffController.userDetail)
router.get('/staff/create_user', staffController.createNewUser)
router.get('/staff/kyc/', staffController.kyc)


export default router;
