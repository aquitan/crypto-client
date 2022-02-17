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
    FORGOT_PASSWORD_ROUTE,
    PROMOCODES_ROUTE,
    CREATEUSER_ROUTE,
    STAFFWALLETS_ROUTE,
    TEST,
    ERRORS_ROUTE,
    DOMAINS_ROUTE,
    WITHDRAW_ROUTE,
    DEPOSIT_ROUTE,
    PROJECTSUPPORT_ROUTE,
    TERMS_ROUTE,
    MAKETRANSACTION_ROUTE,
    CREATENEWS_ROUTE,
    GROUPLIST_ROUTE,
    DOMAINSDETAIL_ROUTE,
    COOKIE_POLICY,
    PRIVACY_POLICY,
    SECURITY_POLICY,
    TERMS_CONDITIONS,
    ABOUT_US,
    CONTACT_US,
    PRIVACY_AUTH,
    COOKIE_POLICY_AUTH,
    BEFORE_START_AUTH,
    SECURITY_POLICY_AUTH,
    TERMS_CONDITIONS_AUTH,
    GENERAL_BASICS_AUTH, ABOUTUS_AUTH, CONTACTUS_AUTH, CRYPTOCURRENCIES_AUTH, ERROR_DETAIL, SECUREDEAL_ROUTE
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
import StaffErrors from "../pages/AdminPages/StaffErrors/StaffErrors";
import Domains from "../pages/AdminPages/Domains/Domains";
import Withdraw from "../pages/AuthPages/Withdraw/Withdraw";
import Deposit from "../pages/AuthPages/Deposit/Deposit";
import ProjectSupport from "../pages/AdminPages/ProjectSupport/ProjectSupport";
import Terms from "../pages/AdminPages/Terms/Terms";
import MakeTransaction from "../pages/AdminPages/MakeTransaction/MakeTransaction";
import CreateNews from "../pages/AdminPages/CreateNews/CreateNews";
import GroupList from "../pages/AdminPages/GroupList/GroupList";
import CookiePolicy from "../pages/NonAuthPages/NonAuthArticle/CookiePolicy";
import PrivacyPolicy from "../pages/NonAuthPages/NonAuthArticle/PrivacyPolicy";
import SecurityPolicy from "../pages/NonAuthPages/NonAuthArticle/SecurityPolicy";
import TermsConditions from "../pages/NonAuthPages/NonAuthArticle/TermsConditions";
import AboutUS from "../pages/NonAuthPages/NonAuthArticle/AboutUs";
import ContactUS from "../pages/NonAuthPages/NonAuthArticle/ContactUS";
import PrivacyPolicyAuth from "../pages/AuthPages/AuthArticles/PrivacyPolicyAuth";
import CookiePolicyAuth from "../pages/AuthPages/AuthArticles/CookiePolicyAuth";
import BeforeYouStart from "../pages/AuthPages/AuthArticles/BeforeYouStart";
import SecurityPolicyAuth from "../pages/AuthPages/AuthArticles/SecurityPolicyAuth";
import TermsConditionsAuth from "../pages/AuthPages/AuthArticles/TermsConditionsAuth";
import GeneralBasics from "../pages/AuthPages/AuthArticles/GeneralBasics";
import AboutUs from "../pages/AuthPages/AuthArticles/AboutUs";
import ContactUsAuth from "../pages/AuthPages/AuthArticles/ContactUsAuth";
import Cryptocurrencies from "../pages/AuthPages/AuthArticles/Cryptocurrencies";
import DomainsDetail from "../pages/AdminPages/Domains/components/DomainsDetail/DomainsDetail";
import StaffErrorDetail from "../pages/AdminPages/StaffErrors/components/StaffErrorDetail/StaffErrorDetail";
import SecureDeal from "../pages/AuthPages/SecureDeal/SecureDeal";

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
        path: WITHDRAW_ROUTE,
        component: <Withdraw/>
    },
    {
        path: DEPOSIT_ROUTE,
        component: <Deposit/>
    },
    {
        path: PRIVACY_AUTH,
        component: <PrivacyPolicyAuth/>
    },
    {
        path: COOKIE_POLICY_AUTH,
        component: <CookiePolicyAuth/>
    },
    {
        path: BEFORE_START_AUTH,
        component: <BeforeYouStart/>
    },
    {
        path: SECURITY_POLICY_AUTH,
        component: <SecurityPolicyAuth/>
    },
    {
        path: TERMS_CONDITIONS_AUTH,
        component: <TermsConditionsAuth/>
    },
    {
        path: GENERAL_BASICS_AUTH,
        component: <GeneralBasics/>
    },
    {
        path: ABOUTUS_AUTH,
        component: <AboutUs/>
    },
    {
        path: CONTACTUS_AUTH,
        component: <ContactUsAuth/>
    },
    {
        path: CRYPTOCURRENCIES_AUTH,
        component: <Cryptocurrencies/>
    },
    {
        path: SECUREDEAL_ROUTE,
        component: <SecureDeal/>
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
    {
        path: ERRORS_ROUTE,
        component: <StaffErrors/>
    },
    {
        path: DOMAINS_ROUTE,
        component: <Domains/>,
    },
    {
        path: DOMAINSDETAIL_ROUTE,
        component: <DomainsDetail/>
    },
    {
        path: PROJECTSUPPORT_ROUTE,
        component: <ProjectSupport/>
    },
    {
        path: TERMS_ROUTE,
        component: <Terms/>
    },
    {
        path: MAKETRANSACTION_ROUTE,
        component: <MakeTransaction/>
    },
    {
        path: CREATENEWS_ROUTE,
        component: <CreateNews/>
    },
    {
        path: GROUPLIST_ROUTE,
        component: <GroupList/>
    },
    {
        path: ERROR_DETAIL,
        component: <StaffErrorDetail/>
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
        path: PRIVACY_POLICY,
        component: <PrivacyPolicy/>
    },
    {
        path: COOKIE_POLICY,
        component: <CookiePolicy/>
    },
    {
        path: SECURITY_POLICY,
        component: <SecurityPolicy/>
    },
    {
        path: TERMS_CONDITIONS,
        component: <TermsConditions/>
    },
    {
        path: ABOUT_US,
        component: <AboutUS/>
    },
    {
        path: CONTACT_US,
        component: <ContactUS/>
    },
    {
        path: ERROR,
        component: <Error/>
    }
]

export const Errors = [
    {
        path: ERROR,
        component: <Error/>
    }
]