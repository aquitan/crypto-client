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
router.get('/activate/:link', authController.activate)
router.get('/refresh/', authController.refresh)


// user area routes
router.get('/dashboard/', authChecker, userController.dashboard)


// admin - staff routes
router.get('/staff/', staffController.staffDashboard)




export default router
