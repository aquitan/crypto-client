import React, {useContext, useEffect} from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../router/routes'
import {v4 as uuid} from 'uuid'
import {AuthContext} from "../../index";
import {observer} from "mobx-react-lite";
import RegisterConfirm from "../../pages/NonAuthPages/RegisterConfirm/RegisterConfirm";
import Landing from "../../pages/NonAuthPages/Landing/Landing";
import NavBar from "../NavBar/NavBar";

const AppRouter = () => {
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        console.log('store', store)
    }, [])

    if (store.isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <div className='wrapper' >
            {
               store.isActivated
                    ?
                    <div>
                        <NavBar/>
                        <Routes>
                            {
                                authRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                            }
                            {
                                store.isAdmin ? <Route path='*' element={<Navigate exact to='/admin'/>}/> : <Route path='*' element={<Navigate exact to='/dashboard'/>} />
                            }
                        </Routes>
                    </div>
                    :
                    <Routes>
                        {
                            publicRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                        }
                        {
                            store.showConfirmation ? navigate('/register-confirm') : console.log('not-confirm')
                        }
                        <Route path='*' element={<Navigate exact to='/'/>} />
                    </Routes>
            }
        </div>
    )
}

export default observer(AppRouter)