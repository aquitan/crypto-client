import React, {useEffect, useState} from 'react'
import { Col, Container, Row} from "react-bootstrap";
import UsersInfoCard from "./components/UsersInfoCard/UsersInfoCard";
import cls from './Users.module.scss'
import UsersTableItem from "./components/UsersTableItem/UsersTableItem";
import {store} from "../../../../index";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {deleteData, postData} from "../../../services/StaffServices";
import {v4 as uuid} from 'uuid'
import Preloader from "../../../components/UI/Preloader/Preloader";
import {getSearchItems} from "../../../utils/searchFn";

const Users = () => {
    const [state, setState] = useState({
        users: '',
        search: ''
    })
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
            console.log('usersReversed', usersReversed)
            setState({...state, users: usersReversed})
        }

    }
    useEffect(() => {
        getProfile()
        // delUser()
    }, [])

    const onSearch = (e) => {
        setState({...state, search: e.target.value})
    }

    // const delUser = async () => {
    //     const res = await deleteData('/staff/users/user_detail/delete_user_with_all_params/', {data: {
    //             userId: '62d6524567a932e48e089a20',
    //             userEmail: 'aquitanfw@gmail.com',
    //             rootAccess: true
    //         }})
    // }

    console.log('user-data', state.users)

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
                                                id={user._id}
                                                userStatus={user.userStatus}
                                                kycStatus={user.kycStatus}
                                                userDomain={user.userDomain}
                                                staff={true}/>
                                        )
                                    })
                                    : <h3 className={'mt-3'}>No users!</h3>
                            }

                        </div>
                        <Row>
                            {
                                state.users.length > 10 ?
                                    <AdminButton onClick={() => setValue((prevState => prevState+1))} classname={['xs']}>Еще</AdminButton>
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