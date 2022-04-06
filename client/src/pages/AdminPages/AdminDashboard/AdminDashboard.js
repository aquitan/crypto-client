import React, {useEffect, useState} from 'react'
import {Container} from "react-bootstrap";
import cls from "../../../components/AppRouter/AppRouter.module.scss";
import {store} from "../../../index";
import {getData} from "../../../services/StaffServices";

const AdminDashboard = () => {
    const [state, setState] = useState()

    useEffect(() => {
        getDataDashboard()
    }, [])

    const getDataDashboard = async () => {
        const res = await getData(`/staff/${store.userId}`)
        setState(res.data.message)
    }

    return (
        <Container className={cls.app_continer}>
            <h1>Главная</h1>
            {
                state ? <h2>{state}</h2> : <h2>No Data</h2>
            }
        </Container>
    )
}

export default AdminDashboard