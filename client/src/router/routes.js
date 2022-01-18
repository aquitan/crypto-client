import Dashboard from "../pages/AuthPages/Dashboard/Dashboard"
import {
    ACCOUNT_ROUTE, ACCOUNT_SECURITY_ROUTE,
    DASHBOARD_ROUTE, ERROR, KYC_ROUTE,
    MAIN_ROUTE, PROFILE_ROUTE,
    REGISTER_CONFIRM, SIGNIN_ROUTE,
    SIGNUP_ROUTE, ADMIN_ROUTE, USERS_ROUTE, ADMINKYC_ROUTE, ADMINMAIN_ROUTE
} from "../utils/constants"
import SignUp from '../pages/NonAuthPages/SignUp/SignUp'
import SignIn from '../pages/NonAuthPages/SignIn/SignIn'
import Landing from '../pages/NonAuthPages/Landing/Landing'
import RegisterConfirm from "../pages/NonAuthPages/RegisterConfirm/RegisterConfirm";
import Profile from "../pages/AuthPages/Profile/Profile";
import MyAccount from "../pages/AuthPages/MyAccount/MyAccount";
import AccountSecurity from "../pages/AuthPages/AccountSecurity/AccountSecurity";
import KYC from "../pages/AuthPages/KYC/KYC";
import Error from "../pages/Error/Error";
import AdminDashboard from "../pages/AdminPages/AdminDashboard/AdminDashboard";
import Users from "../pages/AdminPages/Users/Users";
import AdminKYC from "../pages/AdminPages/AdminKYC/AdminKYC";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

export const authRoutes = [
    // {
    //     path: DASHBOARD_ROUTE,
    //     component: <Dashboard/>
    // },
    {
        path: PROFILE_ROUTE,
        component: <Profile/>
    },
    {
        path: ACCOUNT_ROUTE,
        component: <MyAccount/>
    },
    // {
    //     path: ACCOUNT_SECURITY_ROUTE,
    //     component: <AccountSecurity/>
    // },
    // {
    //     path: KYC_ROUTE,
    //     component: <KYC/>
    // },
    {
        path: ERROR,
        component: <Error/>
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
        path: ERROR,
        component: <Error/>
    }
]