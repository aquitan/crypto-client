import React from 'react'
import {Card, Col, Form, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import cls from '../../UserDetail.module.scss'
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import Button from "../../../../../components/UI/Button/Button";

const UserDetailTabAct = () => {
    const {register, handleSubmit} = useForm()
    const isPremium = false
    return (
        <div>
            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Col className='col-4'>
                        <h3>Сделать Работником</h3>
                    </Col>
                    <Col className='col-3'>
                        <AdminButton color={'green'} >Сделать</AdminButton>
                    </Col>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Изменение баланса</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Счёт пользователя:</h5></Col>
                                <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option value="1">BTC</option>
                                        <option value="2">ETH</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Баланс кошелька:</h5></Col>
                                <Col>
                                    <AdminInput {...register('balance')} name='balance' placeholder='balance' value='2.0'/>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Нотификация:</h5></Col>
                                <Col>
                                    <AdminInput {...register('notification')} name='notification' placeholder='balance' value='This your notif text'/>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Направление:</h5></Col>
                                <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option value="1">Пополнение</option>
                                        <option value="2">Снятие</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Сумма:</h5></Col>
                                <Col>
                                    <AdminInput {...register('sum')} name='sum' placeholder='0' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={`${cls.bg_black} mb-3`}>
                        <Col className='col-3'>
                            <AdminButton color={'green'} >Сделать</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Нотификации</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Текст нотификации:</h5></Col>
                                <Col>
                                    <AdminInput {...register('notificationText')} name='notificationText' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            <AdminButton color={'green'} >Сделать</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </Card>
            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Комиссия депозита:</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Текущий процент:</h5></Col>
                                <Col>
                                    <AdminInput {...register('comission')} name='comission' value={80} placeholder='Текущий процент'/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Новый процент</h5></Col>
                                <Col>
                                    <AdminInput {...register('comission')} name='comission' placeholder='Новый процент'/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            <AdminButton color={'green'} >Установить</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Новый стафф рекрутер:</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Изменить рекрутера:</h5></Col>
                                <Col>
                                    <AdminInput {...register('notificationText')} name='notificationText' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            <AdminButton color={'green'} >Изменить</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </Card>



            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Премиум статус:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {isPremium ? <AdminButton color={'green'}>Премиум</AdminButton> : <AdminButton color={'green'}>Обычный</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Изменить имя в саппорте</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className='mt-3'>
                                <Col className='col-lg-3'><h5>Изменить имя:</h5></Col>
                                <Col>
                                    <AdminInput {...register('supportName')} name='supportName' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            <AdminButton color={'green'} >Изменить</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Дабл депов:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {isPremium ? <AdminButton color={'green'}>Выкл</AdminButton> : <AdminButton color={'green'}>Вкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Бан внутренних транзакций:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {isPremium ? <AdminButton color={'green'}>Выкл</AdminButton> : <AdminButton color={'green'}>Вкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Бан свапов:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {isPremium ? <AdminButton color={'green'}>Выкл</AdminButton> : <AdminButton color={'green'}>Вкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>
            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>IP адреса:</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-4'>
                            <h5>12.231.123123</h5>
                            <h5>12.231.123123</h5>
                            <h5>12.231.123123</h5>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            <AdminButton color={'green'}>Очистить IP</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </Card>

        </div>
    )
}

export default UserDetailTabAct