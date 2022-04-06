import React from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../components/AdminButtonCard/AdminButtonCard";
import AdminButton from "../../../../components/UI/AdminButton/AdminButton";
import './GroupDetails.scss'

const GroupDetails = () => {
    return (
        <Container>
            <AdminButtonCard title='Данные по группе' >
                <Row className='mb-3'>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Создатель
                            </Col>
                            <Col>
                                Ozzy
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Нзвание
                            </Col>
                            <Col>
                                NY
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Дата создания
                            </Col>
                            <Col>
                                Jan. 30, 2021, 12:27 a.m.
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Видны ли все пользователи
                            </Col>
                            <Col>
                                True
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='col-12 col-lg-4 text-center mb-3'>
                        <AdminButton classname='red'>Выйти из группы</AdminButton>
                    </Col>
                    <Col className='col-12 col-lg-4 text-center mb-3'>
                        <AdminButton classname='orange'>Изменить видимость участников</AdminButton>
                    </Col>
                    <Col className='col-12 col-lg-4 text-center mb-3'>
                        <AdminButton classname='green'>Отправить заявку на участие</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

GroupDetails.propTypes = {
    
}
GroupDetails.defaultProps = {
    
}

export default GroupDetails