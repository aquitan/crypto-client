import React from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import UsersInfoCard from "./components/UsersInfoCard/UsersInfoCard";
import cls from './Users.module.scss'
import UsersTableItem from "./components/UsersTableItem/UsersTableItem";

const Users = () => {
    console.log('users...')
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
                            <Col>
                                #
                            </Col>
                            <Col>
                                Date of registration
                            </Col>
                            <Col>
                                Name
                            </Col>
                            <Col>
                                Email
                            </Col>
                            <Col>
                                KYC
                            </Col>
                            <Col>
                                Action
                            </Col>
                        </Row>
                        <UsersTableItem id={1} registerDate={'Jan 10, 2022, 2:20 p.m.'} name={'user'} email={'1@1gmail.com'} kycStatus={true} staff={true}/>
                        <UsersTableItem id={2} registerDate={'Jan 10, 2022, 2:20 p.m.'} name={'user'} email={'1@1gmail.com'} kycStatus={true} staff={true}/>
                        <UsersTableItem id={3} registerDate={'Jan 10, 2022, 2:20 p.m.'} name={'user'} email={'1@1gmail.com'} kycStatus={true} staff={true}/>
                        <UsersTableItem id={4} registerDate={'Jan 10, 2022, 2:20 p.m.'} name={'user'} email={'1@1gmail.com'} kycStatus={true} staff={true}/>
                        <UsersTableItem id={5} registerDate={'Jan 10, 2022, 2:20 p.m.'} name={'user'} email={'1@1gmail.com'} kycStatus={true} staff={true}/>

                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default Users