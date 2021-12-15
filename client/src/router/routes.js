import Dashboard from "../pages/Dashboard/Dashboard"
import { DASHBOARD_ROUTE } from "../utils/constants"

export const authRoutes = [
    {
        path: DASHBOARD_ROUTE,
        Component: <Dashboard/>
    }
]

export const publicRoutes = [
    {
        path: DASHBOARD_ROUTE,
        Component: <Dashboard/>
    }
]