import React from 'react'
import {Col, Row, Form} from "react-bootstrap";
import cls from '../../UserDetail.module.scss'
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import {Link} from "react-router-dom";

const UserDetailTabInfo = () => {
    let isPremium = false
    let doubleDep = false
    return (
        <div>
            <Row>
                <Col>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            ID
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            5
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Тип пользователя
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Админ
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Ник
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            super
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Имя в саппорте
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Support Team
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Домен
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            127.0.0.1:8000
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Email
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            1@1gmail.com
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Пароль
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            None
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Трансферы
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            <Row className={cls.users_detail_table_row}>
                                2.0 BTC 2.0 $
                                1AjU5dRmEHPvrF81rH56PwTQCmL5jFpxUm
                            </Row>
                            <Row className={cls.users_detail_table_row}>
                                0.0 ETH 0.0 $
                                0x20F32773b28c9F9401e55E9C576e7D4c846e7Df9
                            </Row>
                            <Row className={cls.users_detail_table_row}>
                                0.0 BCH 0.0 $
                                1
                            </Row>
                            <Row className={cls.users_detail_table_row}>
                                0.0 USDT 0.0 $
                                1
                            </Row>
                            <Row className={cls.users_detail_table_row}>
                                0.0 TRX/USDT 0.0 $
                                1
                            </Row>
                            <Row className={cls.users_detail_table_row}>
                                0.0 TRX 0.0 $
                                1
                            </Row>
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Email подтверждён
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Саморег
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Статус чата
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Саморег
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Зарегистрирован
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Jan. 14, 2022, 2:26 p.m.
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Процент
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Ставка: 80%
                            Платформа: 20%
                            Фактическая прибыль: 80%
                        </Col>
                    </Row>
                </Col>


                <Col>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Привёл
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Саморег
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            2FA
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Off
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Дата последнего депозита
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Не было
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Комиссия при пополнении (%)
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            0.0
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Повторяющиеся ip
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            <Row>

                            </Row>
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Внутренние транзакции
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            <Link to='/admin/users'>Создать/Посмотреть</Link>
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Внутренние обмены
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            <Link to='/admin/users'>Создать/Посмотреть</Link>
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Проверка на депы (последняя: None)
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            <Link to='/admin/users'>Посмотреть</Link>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row className='mt-5 mb-5'>
                <h4>Список кастомных ошибок</h4>
                <h5>Для задействования данных ошибок - выберите "текущая ошибка" с таким же названием!</h5>
                <p>Текущая ошибка</p>
                <Col className='col-4'>
                    <Form.Select aria-label="Default select example">
                        <option value="1">Верификация адреса</option>
                        <option value="2">Верификация документов</option>
                        <option value="3">Страховка</option>
                        <option value="4">Премиум</option>ё
                        <option value="5">Штрфф за мультиакк</option>
                        <option value="6">Отключена</option>
                        <option value="7">Кастомная ошибка</option>
                    </Form.Select>
                </Col>
            </Row>
        </div>
    )
}

export default UserDetailTabInfo