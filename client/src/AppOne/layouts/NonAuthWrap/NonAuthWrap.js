import React, {useContext} from 'react'
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../../router/routes";
import {AuthContext} from "../../../index";
import {v4 as uuid} from 'uuid'
import {observer} from "mobx-react-lite";
import Preloader from "../../components/UI/Preloader/Preloader";

const NonAuthWrap = () => {
    const {store} = useContext(AuthContext)
    if (store.isLoading) {
        return <Preloader />
    }
    return (
        <>
            <Routes>
                {publicRoutes.map(route => <Route key={uuid()} path={route.path} element={route.component}/>)}
            </Routes>
        </>
    )
}

export default observer(NonAuthWrap)