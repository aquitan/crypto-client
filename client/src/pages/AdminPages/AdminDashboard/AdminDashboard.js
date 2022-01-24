import React from 'react'
import {Container} from "react-bootstrap";
import cls from "../../../components/AppRouter/AppRouter.module.scss";

const AdminDashboard = () => {
    return (
        <Container className={cls.app_continer}>
            <h1>Главная</h1>
        </Container>
    )
}

export default AdminDashboard