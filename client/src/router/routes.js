import Dashboard from "../pages/AuthPages/Dashboard/Dashboard"
import {
    ACCOUNT_ROUTE,
    ERROR,
    MAIN_ROUTE,
    PROFILE_ROUTE,
    REGISTER_CONFIRM,
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    USERS_ROUTE,
    ADMINKYC_ROUTE,
    ADMINMAIN_ROUTE,
    USERSDETAIL_ROUTE,
    CONTACTUS_ROUTE,
    FORGOT_PASSWORD_ROUTE, PROMOCODES_ROUTE, CREATEUSER_ROUTE, STAFFWALLETS_ROUTE, TEST
} from "../utils/constants"
import SignUp from '../pages/NonAuthPages/SignUp/SignUp'
import SignIn from '../pages/NonAuthPages/SignIn/SignIn'
import Landing from '../pages/NonAuthPages/Landing/Landing'
import RegisterConfirm from "../pages/NonAuthPages/RegisterConfirm/RegisterConfirm";
import Profile from "../pages/AuthPages/Profile/Profile";
import MyAccount from "../pages/AuthPages/MyAccount/MyAccount";
import Error from "../pages/Error/Error";
import AdminDashboard from "../pages/AdminPages/AdminDashboard/AdminDashboard";
import Users from "../pages/AdminPages/Users/Users";
import AdminKYC from "../pages/AdminPages/AdminKYC/AdminKYC";
import UserDetail from "../pages/AdminPages/UserDetail/UserDetail";
import ContactUs from "../pages/AuthPages/ContactUs/ContactUs";
import ForgotPassword from "../pages/NonAuthPages/ForgotPassword/ForgotPassword";
import Promocodes from "../pages/AdminPages/Promocodes/Promocodes";
import CreateUser from "../pages/AdminPages/CreateUser/CreateUser";
import StaffWallets from "../pages/AdminPages/StaffWallets/StaffWallets";
import TestPage from "../pages/AuthPages/TestPage/TestPage";

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        component: <Profile/>
    },
    {
        path: ACCOUNT_ROUTE,
        component: <MyAccount/>
    },
    {
        path: CONTACTUS_ROUTE,
        component: <ContactUs/>
    },
    {
        path: ERROR,
        component: <Error/>
    },
    {
        path: TEST,
        component: <TestPage/>
    },


]

export const adminRoutes = [

    {
        path: USERS_ROUTE,
        component: <Users/>
    },
    {
        path: ADMINKYC_ROUTE,
        component: <AdminKYC/>
    },
    {
        path: ADMINMAIN_ROUTE,
        component: <AdminDashboard/>
    },
    {
        path: USERSDETAIL_ROUTE,
        component: <UserDetail/>
    },
    {
        path: PROMOCODES_ROUTE,
        component: <Promocodes/>
    },
    {
        path: CREATEUSER_ROUTE,
        component: <CreateUser/>
    },
    {
        path: STAFFWALLETS_ROUTE,
        component: <StaffWallets/>
    },
]

export const publicRoutes = [
    {
        path: SIGNUP_ROUTE,
        component: <SignUp/>
    },
    {
        path: SIGNIN_ROUTE,
        component: <SignIn/>
    },
    {
        path: MAIN_ROUTE,
        component: <Landing/>
    },
    {
        path: REGISTER_CONFIRM,
        component: <RegisterConfirm/>
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        component: <ForgotPassword/>
    },
    {
        path: ERROR,
        component: <Error/>
    }
]