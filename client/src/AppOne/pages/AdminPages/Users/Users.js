import React, {useEffect, useState} from 'react'
import { Col, Container, Row} from "react-bootstrap";
import UsersInfoCard from "./components/UsersInfoCard/UsersInfoCard";
import cls from './Users.module.scss'
import UsersTableItem from "./components/UsersTableItem/UsersTableItem";
import {store} from "../../../../index";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {postData} from "../../../services/StaffServices";
import {v4 as uuid} from 'uuid'

const Users = () => {
    const [state, setState] = useState({
        users: '',
        search: ''
    })
    const [limit, setLimit] = useState(0)
    const [value, setValue] = useState(0)
    const getProfile = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host,
            rootAccess: store.fullAccess,
            staffEmail: store.fullAccess ? 'root': store.user.email,
            staffId: store.fullAccess ? 'root': store.user.id,
            skipValue: value,
            limitValue: 10
        }
        const res = await postData('/staff/users/', userData)
        if (typeof res.data.usersList !== 'string') {
            const usersReversed = res.data.usersList.slice(0).reverse()
            setState({...state, users: usersReversed})
        }

    }

    const onSearch = (e) => {
        setState({...state, search: e.target.value})
    }
    useEffect(() => {
        getProfile()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }


    return (
        <Container>
            <AdminButtonCard>
                <h1 className='text-center'>Пользователи</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row className='mt-4'>
                    <UsersInfoCard color={'blue'} type={'Total'} amount={2} />
                    <UsersInfoCard color={'green'} type={'Online'} amount={1} />
                    <UsersInfoCard color={'red'} type={'Banned'} amount={0} />
                    <UsersInfoCard color={'orange'} type={'Not active 7 days'} amount={0} />
                </Row>
            </AdminButtonCard>
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
                                <Col className='d-none d-md-block col-2 text-center'>Register date</Col>
                                <Col className='d-none d-md-block col-6 col-md-2 text-center'>Name</Col>
                                <Col className='col-6 col-md-2 text-center'>Email</Col>
                                <Col className='d-none d-md-block col-8 col-sm-2 text-center'>Domain</Col>
                                <Col className='d-none d-md-block col-4 col-sm-1 text-center'>KYC</Col>
                                <Col className='d-none d-md-block col-4 col-sm-1 text-center'>Status</Col>
                                <Col className='col-6 col-md-2 text-center'>Action</Col>
                            </Row>
                            {
                                state.users.length > 0
                                    ?
                                  state.users.slice(0).reverse().map(user => {
                                        return(
                                            <UsersTableItem
                                                key={uuid()}
                                                registerDate={user.dateOfEntry}
                                                name={user.name}
                                                email={user.email}
                                                id={user.userId}
                                                userStatus={user.userStatus}
                                                kycStatus={user.kycStatus}
                                                userDomain={user.domainName}
                                                staff={true}/>
                                        )
                                    })
                                    : <h3 className={'mt-3'}>No users!</h3>
                            }

                        </div>
                        <Row className={'mb-3 mt-3'}>
                            {
                                state.users.length >= 10 ?
                                  <AdminButton onClick={onMore} classname={['xs', 'green']}>Еще</AdminButton>
                                  : null
                            }
                            {
                                limit > 0 ?
                                  <AdminButton onClick={onLess} classname={['xs', 'green']}>Назад</AdminButton>
                                  : null
                            }
                        </Row>
                    </div>
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

export default Users