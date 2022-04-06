import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '../AppRouter/AppRouter'
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchIntervalInBackground: true,
            refetchInterval: 15000
        }
    }
})

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App