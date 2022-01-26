import React, {useEffect, useState} from 'react'
import { Col, Container, Row} from "react-bootstrap";
import UsersInfoCard from "./components/UsersInfoCard/UsersInfoCard";
import cls from './Users.module.scss'
import UsersTableItem from "./components/UsersTableItem/UsersTableItem";
import {store} from "../../../index";

const Users = () => {
    const [users, setUsers] = useState('')
    const getProfile = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host
        }
        const res = await fetch(`/api/staff/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(userData)
        })
        const data = await res.json()
        const usersReversed = data.usersList.slice(0).reverse()
        setUsers(usersReversed)
        console.log('dataProfile', data)
    }
    useEffect(() => {
        getProfile()
    }, [])



    return (
        <Container>
            <h1 className='mt-4'>Пользователи</h1>
            <Row className='mt-4'>
                <UsersInfoCard color={'blue'} type={'Total'} amount={2} />
                <UsersInfoCard color={'green'} type={'Online'} amount={1} />
                <UsersInfoCard color={'red'} type={'Banned'} amount={0} />
                <UsersInfoCard color={'orange'} type={'Not active 7 days'} amount={0} />
            </Row>
            <Row className='mt-4'>
                <h4>Поиск пользователей</h4>
                <Col className='col-lg-3'>
                    <input type='search' placeholder='find user' />
                </Col>
            </Row>

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
                                        <UsersTableItem key={user.ID} id={user.ID} registerDate={user.date_of_entry} name={user.name} email={user.email} kycStatus={true} staff={true}/>
                                    )
                                })
                                : <h1>Loading</h1>
                        }

                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default Users