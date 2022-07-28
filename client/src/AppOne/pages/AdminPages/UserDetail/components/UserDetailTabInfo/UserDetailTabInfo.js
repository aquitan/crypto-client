import React, {useState} from 'react'
import {Col, Row, Form, Container} from "react-bootstrap";
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
import {store} from "../../../../../../index";
import {patchData} from "../../../../../services/StaffServices";
import Swal from "sweetalert2";
// import {SwalSimple} from "../../../../../utils/SweetAlert";


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
        datas.curError = datas.errorId
        datas.domainName = window.location.host
        datas.staffId = store.user.id
        datas.staffEmail = store.userEmail
        datas.userEmail = data.user.base_data.email
        datas.rootAccess = store.fullAccess
        delete datas.errorId

        let res = await patchData('/staff/users/user_detail/update_error_for_user/', datas)
        if (res.status === 202) {
            // SwalSimple('Тип ошибки изменен')
        } else {
            // SwalSimple('Упс! Что-то пошло не так!')
        }
    }

    const toArr = () => {
        let err = data.user.user_errors
        let arr = []
        for (let i = 0; i <= err.length - 1; i++) {
            let obj = {
                text: err[i].errorName,
                id: err[i]._id
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
        <Container>
            <AdminButtonCard title={'Информация о пользователе'}>
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
                    </Col>


                    <Col className='col-12 col-xl-6'>

                        <Row className={cls.users_detail_table_row}>
                            <p>Текущая ошибка</p>
                            <Col className='mb-3'>
                                <Select {...register('errorId')} classname={'admin-square'} options={toArr()}/>
                            </Col>
                            <Col>
                                <AdminButton onClick={handleSubmit(onSubmit)} classname='green'>Использовать</AdminButton>
                            </Col>
                        </Row>
                        <Row className={cls.users_detail_table_row}>
                            <Row>
                                <h3>Кошельки пользователя</h3>
                            </Row>
                        </Row>
                        {
                            data.user.user_money.map(money => {
                                return (
                                    <Row className={cls.users_detail_table_row}>
                                        <Col className={'col-12 col-md-3'}>
                                            {money.coinBalance} {money.coinName} <br/>
                                        </Col>
                                        <Col className={'col-12 col-md-9'}>
                                            {money.internalWallet}
                                        </Col>
                                    </Row>
                                )
                            })
                        }
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
            </AdminButtonCard>
        </Container>
    )
}

export default UserDetailTabInfo