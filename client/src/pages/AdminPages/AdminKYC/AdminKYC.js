import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import {store} from "../../../index";
import UsersInfoCard from "../Users/components/UsersInfoCard/UsersInfoCard";
import cls from './AdminKYC.module.scss'
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminKycTableItem from "./components/AdminKycTablItem/AdminKycTableItem";

const AdminKYC = () => {
    const [usersKyc, setUsersKyc] = useState()

    const getStaffKyc = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host
        }

        const res = await fetch(`/api/staff/users/kyc/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(userData)
        })
        const data = await res.json()
        setUsersKyc(data.usersKycList)
        console.log('dataProfile', data)
    }

    useEffect(() => {
        getStaffKyc()
    }, [])

    return (
        <Container>
            <h1 className='mt-4'>Kyc</h1>
            <Row className='mt-4 mb-4'>
                <UsersInfoCard color={'blue'} type={'Total'} amount={2} />
                <UsersInfoCard color={'green'} type={'Online'} amount={1} />
                <UsersInfoCard color={'red'} type={'Banned'} amount={0} />
                <UsersInfoCard color={'orange'} type={'Not active 7 days'} amount={0} />
            </Row>
            <Row>
                <Card className={`${cls.bg_black} p-3 mb-3`}>
                    <AdminInput placeholder='поиск'/>
                </Card>
            </Row>
            <Row>
                <Card className={`${cls.bg_black} p-3`}>
                    <Row className={cls.table_header}>
                        <Col className={cls.id_col}>#</Col>
                        <Col className={cls.default_col}>Date of registration</Col>
                        <Col className={cls.default_col}>Name</Col>
                        <Col className={cls.default_col}>Email</Col>
                        <Col className={cls.default_col}>Information</Col>
                        <Col className={cls.default_col}>Documents</Col>
                        <Col className={cls.default_col}>Status</Col>
                        <Col className={cls.default_col}>Action</Col>
                    </Row>
                    {
                        usersKyc
                            ?
                            usersKyc.map(user => {
                                return(
                                    <AdminKycTableItem
                                        key={user.ID}
                                        id={user.ID}
                                        registerDate={user.date_of_entry}
                                        city={user.city}
                                        zip={user.zip_code}
                                        state={user.state}
                                        name={user.name}
                                        email={user.email}
                                        docType={user.document_type}
                                        kycStatus={user.kyc_status}
                                        userId={user.user_id}
                                    />
                                )
                            })
                            : <h1>Loading</h1>
                    }
                </Card>
            </Row>

        </Container>
    )
}

export default AdminKYC