import React from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import cls from './Promocodes.module.scss'
import Form from "../../../components/UI/Form/Form";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";

const Promocodes = () => {
    return (
        <Container>
            <Card className={`${cls.bg_black} mb-3 p-3`}>
                <h2 className={'mb-3'}>Создать промокод</h2>
                <AdminForm>
                    <Row className='mb-4'>
                        <Col>
                            <AdminInput placeholder='Сумма вознаграждения от' />
                        </Col>
                        <Col>
                            <AdminInput placeholder='Сумма вознаграждения до' />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <AdminInput placeholder='Кол-во промокодов' />
                        </Col>
                        <Col>
                            <AdminInput placeholder='Сумма вознаграждения до' />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <AdminButton color='green'>Сгенерировать</AdminButton>
                    </Row>
                </AdminForm>
            </Card>
            
        </Container>
    )
}

export default Promocodes