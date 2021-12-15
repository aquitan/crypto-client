import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Dashboard from '../../pages/Dashboard/Dashboard'
import Landing from '../../pages/Landing/Landing'
import SignIn from '../../pages/SignIn/SignIn'
import SignUp from '../../pages/SignUp/SignUp'

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <Routes>
                <Route path='/' element={<Landing/>} />
                <Route exact path='/signin' element={<SignIn/>} />
                <Route exact path='/signup' element={<SignUp/>} />
                <Route exact path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </AuthContext.Provider>
    )
}

export default AppRouter