import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import {store} from "../../../../index";
import UsersInfoCard from "../Users/components/UsersInfoCard/UsersInfoCard";
import cls from './AdminKYC.module.scss'
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminKycTableItem from "./components/AdminKycTablItem/AdminKycTableItem";
import {postData} from "../../../services/StaffServices";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";

const AdminKYC = () => {
    const [usersKyc, setUsersKyc] = useState()
    const [search, setSearch] = useState()

    const getStaffKyc = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host,
            rootAccess: store.fullAccess,
            staffEmail: store.fullAccess ? 'root' : store.user.email,
            staffId: store.fullAccess ? 'root' : store.user.id,
            skipValue: 0,
            limitValue: 20
        }
        const res = await postData('/staff/users/kyc/', userData)
        const data = await res.data
        console.log('res-kyc', res.data.usersKycList);
        setUsersKyc(data.usersKycList)
    }

    useEffect(() => {
        getStaffKyc()
    }, [])

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <Container style={{color: '#fff'}}>
            <AdminButtonCard>
                <h1 className='text-center'>Kyc</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row className=''>
                    <UsersInfoCard color={'blue'} type={'Total'} amount={2} />
                    <UsersInfoCard color={'green'} type={'Online'} amount={1} />
                    <UsersInfoCard color={'red'} type={'Banned'} amount={0} />
                    <UsersInfoCard color={'orange'} type={'Not active 7 days'} amount={0} />
                </Row>
            </AdminButtonCard>
            <Row>
                <Card className={`${cls.bg_black} p-3 mb-3`}>
                    <AdminInput onChange={onSearch} placeholder='поиск'/>
                </Card>
            </Row>
            <Row>
                <Card className={`${cls.bg_black} p-3`}>
                    <Row className={cls.table_header}>
                        {/*<Col className={'col-1'}>Register date</Col>*/}
                        <Col className={'d-none d-md-block col-2 text-center'}>Name</Col>
                        <Col className={'col-6 col-md-2 text-center'}>Email</Col>
                        <Col className={'d-none d-md-block col-8 col-sm-2 text-center'}>Information</Col>
                        <Col className={'d-none d-md-block col-4 col-sm-2 text-center'}>Documents</Col>
                        <Col className={'d-none d-md-block col-4 col-sm-1 text-center'}>Status</Col>
                        <Col className={'col-6 col-md-3 text-center'}>Action</Col>
                    </Row>
                    {
                        usersKyc &&  typeof usersKyc !== 'string'
                            ?
                          usersKyc.map(user => {
                                return(
                                    <AdminKycTableItem
                                        key={user._id}
                                        city={user.city}
                                        zip={user.zipCode}
                                        state={user.state}
                                        email={user.email}
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
                                    <h4 className='text-center my-4' style={{color: '#cecece'}}>Data not found</h4>
                                </Col>
                            </Row>
                    }
                </Card>
            </Row>

        </Container>
    )
}

export default AdminKYC