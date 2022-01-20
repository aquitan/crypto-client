import React from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import UsersInfoCard from "./components/UsersInfoCard/UsersInfoCard";
import Input from "../../../components/UI/Input/Input";

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
                    <div className="users_table_card">
                        <Row className='header'>
                            <Col>
                            </Col>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                            <Col>

                            </Col>
                        </Row>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default Users