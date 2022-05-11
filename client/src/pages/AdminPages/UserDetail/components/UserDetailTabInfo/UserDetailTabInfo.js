import React, {useState} from 'react'
import {Col, Row, Form} from "react-bootstrap";
import cls from '../../UserDetail.module.scss'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import {useForm} from "react-hook-form";
import Select from "../../../../../components/UI/Select/Select";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import {store} from "../../../../../index";
import {patchData} from "../../../../../services/StaffServices";


const UserDetailTabInfo = ({data}) => {
    const {register, handleSubmit} = useForm()
    const [errorId, setErrorId] = useState(1)

    if (!data) {
        return <h1>Loading</h1>
    }

    const renderUserType = () => {
        if (data.user.user_params_data.isAdmin) return  'Админ'
        if (data.user.user_params_data.isStaff) return 'Стафф'
        return 'Пользователь'
    }
    const onSubmit = async (datas) => {
        datas.curError = +datas.curError
        datas.domainName = window.location.host
        datas.staffId = store.userId
        datas.staffEmail = store.userEmail
        datas.userEmail = data.user.base_data.email

        // let res = await patchData('/staff/users/user_detail/update_error_for_user/', datas)
    }

    const toArr = () => {
        let err = data.user.user_errors
        let arr = []
        for (let i = 0; i <= err.length - 1; i++) {
            let obj = {
                text: err[i].errorName,
                id: i + 1
            }
            arr.push(obj)
        }

        return arr
    }

    // const onChangeSelect = (e) => {
    //     console.log('target', e.target)
    //     const index = e.target.selectedIndex;
    //     const el = e.target.childNodes[index]
    //     const option =  el.getAttribute('id');
    //     setErrorId(option)
    //     console.log('option', option)
    // }

    if (!data) {
        return <h1>Loading</h1>
    }

    return (
        <div>
            <Row>
                <Col className='col-12 col-xl-6'>
                    {/*<Row className={cls.users_detail_table_row}>*/}
                    {/*    <Col className={cls.users_detail_table_col}>*/}
                    {/*        ID*/}
                    {/*    </Col>*/}
                    {/*    <Col className={cls.users_detail_table_col}>*/}
                    {/*        {data.user.base_data.ID}*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Тип пользователя
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {renderUserType()}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Ник
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.base_data.name ? data.user.base_data.name : <FontAwesomeIcon color={'tomato'} icon={faTimesCircle} />}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Имя в саппорте
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.staff_params !== null ? data.user.staff_params.supportName : <FontAwesomeIcon color={'tomato'} icon={faTimesCircle} />}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Домен
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.base_data.domainName}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Email
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.base_data.email}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Пароль
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.base_data.password}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Email подтверждён
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.user_params_data.isActivated ? <FontAwesomeIcon color={'green'} icon={faCheckCircle} /> : <FontAwesomeIcon color={'tomato'} icon={faTimesCircle} />}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Кто привел
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.base_data.registrationType === 'xx999xx--001' ? 'root' : data.user.base_data.registrationType}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Процент
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            Ставка: {data.user.staff_params?.paymentFee} %
                            {/*Платформа: 20%*/}
                            {/*Фактическая прибыль: 80%*/}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <p>Текущая ошибка</p>
                        <Col>
                            <Select {...register('curError')} classname={'admin-square'} options={toArr()}/>
                        </Col>
                        <Col>
                            <AdminButton onClick={handleSubmit(onSubmit)} classname='green'>Использовать</AdminButton>
                        </Col>
                    </Row>
                </Col>


                <Col className='col-12 col-xl-6'>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Зарегистрирован
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {getCurrentDate(data.user.base_data.dateOfEntry)}
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            2FA
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {
                                data.user.user_params_data.twoStepStatus ? <FontAwesomeIcon color={'green'} icon={faCheckCircle} />  : <FontAwesomeIcon color={'tomato'} icon={faTimesCircle} />
                            }
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            KYC Статус
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {
                                data.user.user_params_data.kycStatus != 'empty'
                                    ? <FontAwesomeIcon color={'green'} icon={faCheckCircle} />
                                    : <FontAwesomeIcon color={'tomato'} icon={faTimesCircle} />
                            }
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Дата последнего депозита
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            -
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Комиссия при пополнении (%)
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            {data.user.user_action_data.depositFee} %
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
                            Внутренние транзакции и обмены
                        </Col>
                        <Col className={cls.users_detail_table_col}>
                            <Link to='/staff/transactions'>Создать/Посмотреть</Link>
                        </Col>
                    </Row>
                    <Row className={cls.users_detail_table_row}>
                        <Col className={cls.users_detail_table_col}>
                            Интернал адреса пользователей
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
                    {/*<Row className={cls.users_detail_table_row}>*/}
                    {/*    <Col className={cls.users_detail_table_col}>*/}
                    {/*        Внутренние обмены*/}
                    {/*    </Col>*/}
                    {/*    <Col className={cls.users_detail_table_col}>*/}
                    {/*        <Link to='/staff/users'>Создать/Посмотреть</Link>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row className={cls.users_detail_table_row}>*/}
                    {/*    <Col className={cls.users_detail_table_col}>*/}
                    {/*        Проверка на депы (последняя: None)*/}
                    {/*    </Col>*/}
                    {/*    <Col className={cls.users_detail_table_col}>*/}
                    {/*        <Link to='/staff/users'>Посмотреть</Link>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                </Col>
            </Row>
        </div>
    )
}

export default UserDetailTabInfo