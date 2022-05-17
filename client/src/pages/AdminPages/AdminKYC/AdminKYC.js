import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import {store} from "../../../index";
import UsersInfoCard from "../Users/components/UsersInfoCard/UsersInfoCard";
import cls from './AdminKYC.module.scss'
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminKycTableItem from "./components/AdminKycTablItem/AdminKycTableItem";
import {postData} from "../../../services/StaffServices";

const AdminKYC = () => {
    const [usersKyc, setUsersKyc] = useState()

    const getStaffKyc = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host,
            rootAccess: store.fullAccess
        }
        const res = await postData('/staff/users/kyc/', userData)
        const data = await res.data
        setUsersKyc(data.usersKycList)
        console.log('dataProfile', data.usersKycList)
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
                <Card className={`${cls.bg_black} p-3 scrollable-table`}>
                    <Row className={cls.table_header}>
                        <Col className={cls.default_col}>Date of registration</Col>
                        <Col className={cls.default_col}>Name</Col>
                        <Col className={cls.default_col}>Email</Col>
                        <Col className={cls.default_col}>Information</Col>
                        <Col className={cls.default_col}>Documents</Col>
                        <Col className={cls.default_col}>Status</Col>
                        <Col className={cls.default_col}>Action</Col>
                    </Row>
                    {
                        !usersKyc === 'empty set'
                            ?
                            usersKyc.map(user => {
                                return(
                                    <AdminKycTableItem
                                        key={user._id}
                                        city={user.city}
                                        zip={user.zipCode}
                                        state={user.state}
                                        email={user.userEmail}
                                        name={user.firstName}
                                        docType={user.documentType}
                                        kycStatus={user.kycStatus}
                                        id={user._id}
                                        userId={user.userId}
                                    />
                                )
                            })
                            : <Row className='text-center'>
                                <Col className='mt-4'>
                                    <h4>No data!</h4>
                                </Col>
                            </Row>
                    }
                </Card>
            </Row>

        </Container>
    )
}

export default AdminKYC