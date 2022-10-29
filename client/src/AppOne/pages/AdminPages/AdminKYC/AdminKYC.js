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
    const [limit, setLimit] = useState(0)

    const getStaffKyc = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host,
            rootAccess: store.fullAccess,
            staffEmail: store.fullAccess ? 'root' : store.user.email,
            staffId: store.fullAccess ? 'root' : store.user.id,
            skipValue: limit,
            limitValue: 20
        }
        const res = await postData('/staff/users/kyc/', userData)
        const data = await res.data
        console.log('res-kyc', res.data.usersKycList);
        setUsersKyc(data.usersKycList)
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        getStaffKyc()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
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
                <Card style={{overflow: 'scroll'}} className={`${cls.bg_black} p-3`}>
                    <div style={{minWidth: '1000px'}}>
                        <Row className={cls.table_header}>
                            {/*<Col className={'col-1'}>Register date</Col>*/}
                            <Col style={{width: '190px'}} className={'text-center'}>Имя</Col>
                            <Col style={{width: '190px'}} className={'text-center'}>Почта</Col>
                            <Col style={{width: '190px'}} className={'text-center'}>Инфо</Col>
                            <Col style={{width: '190px'}} className={'text-center'}>Док-ты</Col>
                            <Col style={{width: '190px'}} className={'text-center'}>Фото</Col>
                            <Col style={{width: '190px'}} className={'col-6 col-md-3 text-center'}>Изменить стутус</Col>
                            <Col style={{width: '190px'}} className={'col-6 col-md-3 text-center'}>Удалить</Col>
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
                    </div>
                    {
                        usersKyc &&  typeof usersKyc !== 'string' ? 
                            <Row className={'mb-3 mt-3'}>
                                {
                                    usersKyc.length >= 10 ?
                                        <AdminButton onClick={onMore} classname={['xs', 'green']}>Еще</AdminButton>
                                        : null
                                }
                                {
                                    limit > 0 ?
                                        <AdminButton onClick={onLess} classname={['xs', 'green']}>Назад</AdminButton>
                                        : null
                                }
                            </Row>
                            : null
                        
                    }
                    
                </Card>
            </Row>

        </Container>
    )
}

export default AdminKYC