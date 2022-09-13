import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '../AppRouter/AppRouter'
import {QueryClient, QueryClientProvider} from "react-query";
import {NotifProvider} from "../../context/notifContext";
import {ThemeContextProvider} from "../../context/ThemeContext";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchIntervalInBackground: true,
            refetchInterval: 15000
        }
    }
})

const AppOne = () => {
    return (
        <QueryClientProvider client={queryClient}>

            <BrowserRouter>
                <ThemeContextProvider>
                    <NotifProvider>
                        <AppRouter/>
                    </NotifProvider>
                </ThemeContextProvider>
            </BrowserRouter>

        </QueryClientProvider>
    )
}

export default AppOne