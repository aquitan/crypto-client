import React, {useContext, useEffect} from 'react'
import {Routes, Route, Navigate, useNavigate, Link} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from '../../router/routes'
import {v4 as uuid} from 'uuid'
import {AuthContext} from "../../index";
import {observer} from "mobx-react-lite";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import UserLayout from "../../layouts/UserLayout/UserLayout";
import cls from './AppRouter.module.scss'

const AppRouter = () => {
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)
    // const location = useLocation()
    // const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    // const chekAdminBg = () => {
    //     let myLoc = location.pathname
    //     let locSplit = myLoc.split(/[\\\/]/)
    //     if (locSplit[1] === 'admin') {
    //         setIsDark(true)
    //     }
    //     else {
    //         setIsDark(false)
    //     }
    // }


    if (store.isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <div className={`wrapper` } >
            {
               store.isActivated
                    ?
                    <>
                        <div className={cls.content}>
                            <NavBar/>
                            <Routes>
                                <Route path='/dashboard' element={<UserLayout/>}>
                                    {
                                        authRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                                    }
                                </Route>
                                <Route exact path='/admin' element={<AdminLayout/>}>
                                    {
                                        adminRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                                    }
                                </Route>
                                {
                                    store.isAdmin ?  <Route path='*' element={<Navigate to={'/admin'}/>} /> : <Route path='*' element={<Navigate to={'/dashboard'}/>} />
                                }
                            </Routes>
                        </div>
                        <Footer>
                            <Link exact to='/'>Nowhere</Link>
                            <Link exact to='/'>Nowhere</Link>
                            <Link exact to='/'>Nowhere</Link>
                            <Link exact to='/'>Nowhere</Link>
                            <Link exact to='/'>Nowhere</Link>
                            <Link exact to='/'>Nowhere</Link>
                        </Footer>
                    </>
                    :
                    <>
                        <Routes>
                            {
                                publicRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                            }
                            {
                                store.showConfirmation ? navigate('/register-confirm') : console.log('not-confirm')
                            }
                            <Route path='*' element={<Navigate exact to='/'/>} />
                        </Routes>
                        <Footer>
                            <Link to='/'>Somwhere</Link>
                            <Link to='/'>Somwhere</Link>
                            <Link to='/'>Somwhere</Link>
                            <Link to='/'>Somwhere</Link>
                            <Link to='/'>Somwhere</Link>
                            <Link to='/'>Somwhere</Link>
                        </Footer>
                    </>
            }
        </div>
    )
}

export default observer(AppRouter)