import Dashboard from "../pages/Dashboard/Dashboard"
import { DASHBOARD_ROUTE, MAIN_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants"
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import Landing from '../pages/Landing/Landing'

export const authRoutes = [
    {
        path: DASHBOARD_ROUTE,
        component: <Dashboard/>
    }
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
    }
]