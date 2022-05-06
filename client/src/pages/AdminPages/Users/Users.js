import React, {useEffect, useState} from 'react'
import { Col, Container, Row} from "react-bootstrap";
import UsersInfoCard from "./components/UsersInfoCard/UsersInfoCard";
import cls from './Users.module.scss'
import UsersTableItem from "./components/UsersTableItem/UsersTableItem";
import {store} from "../../../index";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {postData} from "../../../services/StaffServices";
import {v4 as uuid} from 'uuid'
import Preloader from "../../../components/UI/Preloader/Preloader";
import {getSearchItems} from "../../../utils/searchFn";

const Users = () => {
    const [state, setState] = useState({
        users: '',
        search: ''
    })
    const getProfile = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host,
            rootAccess: store.fullAccess
        }
        const res = await postData('/staff/users/', userData)
        const usersReversed = res.data.usersList.slice(0).reverse()
        console.log('usersReversed', usersReversed)
        setState({...state, users: usersReversed})
    }
    useEffect(() => {
        getProfile()
    }, [])

    const onSearch = (e) => {
        setState({...state, search: e.target.value})
    }

    console.log('user-data', state.users)

    return (
        <Container>
            <h1 className='mt-4'>Пользователи</h1>
            <Row className='mt-4'>
                <UsersInfoCard color={'blue'} type={'Total'} amount={2} />
                <UsersInfoCard color={'green'} type={'Online'} amount={1} />
                <UsersInfoCard color={'red'} type={'Banned'} amount={0} />
                <UsersInfoCard color={'orange'} type={'Not active 7 days'} amount={0} />
            </Row>
            <AdminButtonCard>
                <Row className='mt-4'>
                    <h4 className='mb-3'>Поиск пользователей</h4>
                    <Row>
                        <Col className='p-0 col-12 col-sm-6 mb-3'>
                            <AdminInput onChange={onSearch} value={state.search}  type='search' placeholder='find user' />
                        </Col>
                        <Col className='col-12 col-sm-6'>
                            <AdminButton classname={['small', 'green', 'marginless']}>Найти</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard>
                <Row>
                    <div className="users_table">
                        <div className={cls.users_table_inner}>
                            <Row className={cls.table_header}>
                                <Col className='d-none d-md-block col-2'>Date of registration</Col>
                                <Col className='d-none d-sm-block col-2'>Name</Col>
                                <Col className='col-8 col-sm-2'>Email</Col>
                                <Col className='col-4 col-sm-2'>KYC</Col>
                                <Col className='col-4 col-sm-2'>Status</Col>
                                <Col className='d-none d-sm-block col-2'>Action</Col>
                            </Row>
                            {
                                state.users.length > 0
                                    ?
                                    getSearchItems(state.users, state.search).map(user => {
                                        return(
                                            <UsersTableItem
                                                key={uuid()}
                                                registerDate={user.registerDate}
                                                name={user.userName}
                                                email={user.userEmail}
                                                id={user.userId}
                                                userStatus={user.userStatus}
                                                kycStatus={user.kycStatus}
                                                staff={true}/>
                                        )
                                    })
                                    : <Preloader />
                            }

                        </div>
                    </div>
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

export default Users