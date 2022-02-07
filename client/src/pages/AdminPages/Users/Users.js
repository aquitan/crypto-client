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

const Users = () => {
    const [users, setUsers] = useState('')
    const {register, handleSubmit} = useForm()
    const getProfile = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host
        }
        const res = await postData('/staff/users/', userData)
        const data = await res.data
        const usersReversed = data.usersList.slice(0).reverse()
        setUsers(usersReversed)
        console.log('dataProfile', data)
    }
    useEffect(() => {
        getProfile()
    }, [])

    const onSubmit = (data) => {
        console.log(data)
    }


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
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mt-4'>
                        <h4 className='mb-3'>Поиск пользователей</h4>
                        <Row>
                            <Col className='col-lg-3'>
                                <AdminInput {...register('searchQuery')} type='search' placeholder='find user' />
                            </Col>
                            <Col>
                                <AdminButton classname='small green'>Найти</AdminButton>
                            </Col>
                        </Row>
                    </Row>
                </AdminForm>
            </AdminButtonCard>

            <AdminButtonCard>
                <Row>
                    <div className="users_table">
                        <div className={cls.users_table_inner}>
                            <Row className={cls.table_header}>
                                <Col>#</Col>
                                <Col>Date of registration</Col>
                                <Col>Name</Col>
                                <Col>Email</Col>
                                <Col>KYC</Col>
                                <Col>Action</Col>
                            </Row>
                            {
                                users
                                    ?
                                    users.map(user => {
                                        return(
                                            <UsersTableItem
                                                key={user.user_id}
                                                id={user.user_id}
                                                registerDate={user.date_of_entry}
                                                name={user.name}
                                                email={user.email}
                                                kycStatus={true}
                                                staff={true}/>
                                        )
                                    })
                                    : <h1>Loading</h1>
                            }

                        </div>
                    </div>
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

export default Users