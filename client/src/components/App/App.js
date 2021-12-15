import React, {useContext, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '../AppRouter/AppRouter'
import {Context} from "../../index";



const App = () => {


    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App