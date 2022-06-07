import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import cls from '../../UserDetail.module.scss'
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import {v4 as uuid} from 'uuid'
import ModalDark from "../../../../../components/UI/ModalDark/ModalDark";
import {store} from "../../../../../index";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import error from "../../../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {deleteData, patchData, postData, putData} from "../../../../../services/StaffServices";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import CustomCheckboxBtn from "../../../../../components/UI/CustomCheckboxBtn/CustomCheckboxBtn";
import {useNavigate} from "react-router-dom";
import {onLogin} from "../../../../../utils/onLogin";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import moment from "moment";
import Select from "../../../../../components/UI/Select/Select";
import {optionsCurrency} from "../../../../../utils/staffConstants";
import {log} from "util";
import {SwalSimple} from "../../../../../utils/SweetAlert";

const UserDetailTabAct = (props) => {

    const navigate = useNavigate()
    const [state, setState] = useState({
        isOpen: false,
        onClickConfirm: null,
        doubleConfirm: false
    })
    const [btns, setBtns] = useState({
        currentPrem: props.data.user_params_data.premiumStatus,
        fullBan: props.data.user_params_data.isBanned,
        double: props.data.user_params_data.doubleDeposit,
        transactionBan: props.data.user_params_data.internalBan,
        isStaff: props.data.user_params_data.isStaff,
        swapBan: props.data.user_params_data.swapBan
    })
    console.log('user-actions', props.data)
    const dataObj = {
        userId: props.data.base_data._id,
        staffEmail: store.userEmail,
        userEmail: props.data.base_data.email,
        domainName: window.location.host,
        currentDate: dateToTimestamp(),
        rootAccess: store.fullAccess,
        staffId: store.fullAccess ? 'root' : store.user.id
    }

    const {register: balanceRegister, handleSubmit: handleBalanceSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const {register: registerNotif, handleSubmit: handleNotifSubmit, formState: {errors: errors2}} = useForm({
        mode: 'onBlur'
    })
    const {register: registerPercent, handleSubmit: handlePercentSubmit, formState: {errors: errors5}} = useForm({
        mode: 'onBlur'
    })
    const {register: registerRecruiter, handleSubmit: handleRecruiterSubmit, formState: {errors: errors3}} = useForm({
        mode: 'onBlur'
    })
    const {register: registerSupport, handleSubmit: handleSupportSubmit, formState: {errors: errors4}} = useForm({
        mode: 'onBlur'
    })

    const getCurCoinName = (coin, bucs) => {
        if (coin === 'usd' || coin === 'usdt') {
            return bucs
        }
        else {
            return store.rates[coin] * bucs
        }
    }

    const changeBalance = async (data) => {
        data.amountInCrypto = +data.amountInCrypto
        data.userId = props.data.base_data._id
        data.userEmail = props.data.base_data.email
        data.domainName = window.location.host
        data.amountInUsd = getCurCoinName(data.coinName.toLowerCase(), data.amountInCrypto)
        data.currentDate = dateToTimestamp()
        data.depositStatus = 'pending'
        data.coinFullName = 'bitcoin'
        data.depositAddress = 'alkalksdlaksndlaksd'
        data.staffId = store.user.id

        if (data.transaction === 'Deposit') {
            const res = await putData('/staff/create_transaction/create_regular_deposit_transaction/', data)
        }
        if (data.transaction === 'Withdraw') {
            data.withdrawalAddress = null
            data.withdrawalStatus = 'complete'
            delete data.depositAddress
            delete data.depositStatus
            const res = await putData('/staff/users/user_detail/make_withdrawal/', data)
        }

        handleCloseModal()
    }
    const changeNotif = async (data) => {
        data.userEmail = store.userEmail
        data.domainName = window.location.host
        const response = await putData('/staff/notifications/create_new_notification/', data)
        handleCloseModal()
    }
    const changePercent = async (data) => {
        // const response = await UserService.postUserDetailData('/123', data)
        handleCloseModal()
    }
    const changeReqruiterName = async (data) => {
        // const response = await UserService.postUserDetailData('/123', data)
        handleCloseModal()
    }
    const changeSupportName = async (data) => {
        delete dataObj.userId
        delete dataObj.userEmail
        const response = await patchData('/staff/users/user_detail/update_staff_support_name/', {
            ...dataObj, updatedName: data.supportName
        })
        handleCloseModal()
    }
    const makeStaff = async () => {
        dataObj.status =  !btns.isStaff
        if (store.fullAccess) {
            dataObj.rootAccess = store.fullAccess
        }
        delete dataObj.userId
        const response = await patchData('/staff/users/user_detail/update_staff_status/', dataObj)
        setBtns({...btns, isStaff: !btns.isStaff})
        handleCloseModal()
    }
    const makeDouble = async () => {
        const response = await patchData('/staff/users/user_detail/update_double_deposit/', {
            ...dataObj, status: !btns.double
        })
        setBtns({...btns, double: !btns.double})
        handleCloseModal()
    }
    const makeFullBan = async () => {
        delete dataObj.currentDate
        if (store.fullAccess) {
            dataObj.staffId = null
        }
        const response = await patchData('/staff/users/user_detail/update_full_ban_status/', {
            ...dataObj, status: !btns.fullBan
        })
        setBtns({...btns, fullBan: !btns.fullBan})
        handleCloseModal()
    }
    const makeTransactionBan = async () => {
        const response = await patchData('/staff/users/user_detail/update_internal_ban_status/', {
            ...dataObj, status: !btns.fullBan
        })
        setBtns({...btns, transactionBan: !btns.transactionBan})
        handleCloseModal()
    }
    const makeSwapBan = async () => {
        const response = await patchData('/staff/users/user_detail/update_swap_ban_status/', {
            ...dataObj, status: !btns.fullBan
        })
        setBtns({...btns, swapBan: !btns.swapBan})
        handleCloseModal()
    }

    const sendPremStatus = async () => {
        delete dataObj.currentDate
        const response = await patchData('/staff/users/user_detail/update_premium_status/',{
            ...dataObj,
            status: !btns.currentPrem,
        })
        if (response.status === 202) {
            SwalSimple('Изменено!')
        }
        setBtns({...btns, currentPrem: !btns.currentPrem})
        setState({isOpen: false, onClickConfirm: null})
        handleCloseModal()
    }

    const makeIpClear = async () => {
        const response = await patchData('/staff/users/user_detail/clear_match_ip_list/', dataObj)
    }
    const makeEmailClear = async () => {
        const response = await patchData('/123', dataObj)
    }


    const handleCloseModal = () => {
        setState({
            isOpen: false,
            onClickConfirm: null
        })
    }

    const handleFindType = (requestType) => {
        console.log('requestType', requestType)
        switch (requestType) {
            case 'support':
                return handleSupportSubmit(changeSupportName);
            case 'double':
                return makeDouble;
            case 'premium':
                return sendPremStatus;
            case 'full-ban':
                return makeFullBan;
            case 'internal-ban':
                return makeTransactionBan;
            case 'swap-ban':
                return makeSwapBan;
            case 'staff-reqruiter':
                return handleRecruiterSubmit(changeReqruiterName);
            case 'new-percent':
                return handlePercentSubmit(changePercent);
            case 'notification':
                return handleNotifSubmit(changeNotif);
            case 'make-staff':
                return makeStaff;
            case 'balance':
                return handleBalanceSubmit(changeBalance);
            case 'ip-clear':
                return makeIpClear;
            case 'email-clear':
                return makeEmailClear;
            case 'delete-user':
                return deleteUser;
            case 'confirm-delete':
                return confirmDelete;
            default:
                return () => {
                    console.log('default')
                }
        }
    }

    const handleOpenModal = (requestType) => {
        if (requestType === 'confirm-delete') {
            const onClickConfirm = handleFindType(requestType)
            setState({
                isOpen: false,
                onClickConfirm,
                doubleConfirm: true
            })
        } else {
            const onClickConfirm = handleFindType(requestType)
            setState({
                isOpen: true,
                onClickConfirm,
                doubleConfirm: false
            })
        }

    }
    const onUserEnter = () => {
        store.logout()
        store.setAsUser({
            email: props.data.base_data.email,
            password: props.data.base_data.password
        })
        onLogin()
        navigate('/')
    }

    const trsType = [
        {
            value: 'Deposit', text: 'Deposit'
        },
        {
            value: 'Withdraw', text: 'Withdraw',
        }
    ]

    if (!props) {
        return <h1>Loading...</h1>
    }

    const deleteUser = () => {
        handleCloseModal()
        setState({isOpen: false, onClickConfirm: null})
        setTimeout(() => {
            handleOpenModal('confirm-delete')
        }, 1500)
    }
    const confirmDelete = async () => {
        handleOpenModal('confirm-delete')
        const res = await deleteData('/staff/users/user_detail/delete_user_with_all_params/', {data: {
                userId: props.data.base_data._id,
                userEmail: props.data.base_data.email,
                rootAccess: store.fullAccess
            }})
        if (res.status === 200) {
            navigate('/staff')
        }
        console.log("you've deleted user")
    }


    const {isOpen, onClickConfirm, doubleConfirm} = state

    return (
        <Container>

            <ModalDark active={isOpen} onClick={onClickConfirm} setActive={handleCloseModal}>
                <Row>Вы уверены?</Row>
            </ModalDark>

            <ModalDark active={doubleConfirm} onClick={onClickConfirm} setActive={handleCloseModal}>
                <Row>Вы точно уверены?</Row>
            </ModalDark>

            {
                store.isAdmin || store.fullAccess ?
                    <AdminButtonCard title='Сделать Работником'>
                        <CustomCheckboxBtn id='make-staff' onChange={() => handleOpenModal('make-staff')} checked={!btns.isStaff ? false : true}/>
                    </AdminButtonCard>
                    : null
            }

            <AdminButtonCard title='Войти как пользователь'>
                <AdminButton onClick={onUserEnter} classname='green'>Войти</AdminButton>
            </AdminButtonCard>




            {/*<AdminButtonCard title='Изменение баланса'>*/}
            {/*    <Row className='mb-3'>*/}
            {/*        <Col className='col-12 col-md-2 col-lg-2'>*/}
            {/*            Счёт пользователя:*/}
            {/*        </Col>*/}
            {/*        <Col className='col-12 col-md-6 col-lg-6'>*/}
            {/*            <Select {...balanceRegister('coinName')} classname={'admin-square'} options={optionsCurrency}/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row className='mb-3'>*/}
            {/*        <Col className='col-12 col-md-2 col-lg-2'>*/}
            {/*            Баланс кошелька:*/}
            {/*        </Col>*/}
            {/*        /!*<Col className='col-12 col-md-6 col-lg-6'>*!/*/}
            {/*        /!*    <AdminInput {...balanceRegister('balance')} placeholder='balance'/>*!/*/}
            {/*        /!*</Col>*!/*/}
            {/*    </Row>*/}
            {/*    /!*<Row className='mb-3'>*!/*/}
            {/*    /!*    <Col className='col-12 col-md-2 col-lg-2'>*!/*/}
            {/*    /!*        Нотификация:*!/*/}
            {/*    /!*    </Col>*!/*/}
            {/*    /!*    <Col className='col-12 col-md-6 col-lg-6'>*!/*/}
            {/*    /!*        <AdminInput {...balanceRegister('notification', {*!/*/}
            {/*    /!*            required: false,*!/*/}
            {/*    /!*            pattern: /^[^а-яё]+$/iu*!/*/}
            {/*    /!*        })} name='notification' placeholder='This your notif text'/>*!/*/}
            {/*    /!*    </Col>*!/*/}
            {/*    /!*</Row>*!/*/}
            {/*    <Row className='mb-3'>*/}
            {/*        <Col className='col-12 col-md-2 col-lg-2'>*/}
            {/*            Направление:*/}
            {/*        </Col>*/}
            {/*        <Col className='col-12 col-md-6 col-lg-6'>*/}
            {/*            <Select {...balanceRegister('transaction')} classname={'admin-square'} options={trsType}/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row className='mb-3'>*/}
            {/*        <Col className='col-12 col-md-2 col-lg-2'>*/}
            {/*            Сумма:*/}
            {/*        </Col>*/}
            {/*        <Col className='col-12 col-md-6 col-lg-6'>*/}
            {/*            <AdminInput {...balanceRegister('amountInCrypto')} placeholder='0' />*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row>*/}
            {/*        <AdminButton onClick={() => handleOpenModal('balance')} classname={['green', 'marginless']} >Изменить</AdminButton>*/}
            {/*    </Row>*/}

            {/*</AdminButtonCard>*/}




            <AdminButtonCard title='Нотификации'>
                <Row>
                    <Col className='col-12 col-sm-6 mb-2'>
                        <AdminInput {...registerNotif('notifText', {
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='Текст нотификации' />
                        <ErrorMessage  name='notifText' errors={errors2} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Col>
                    <Col className='col-12 col-sm-6 mb-2'>
                        <AdminButton onClick={() => handleOpenModal('notification')} classname={['green', 'marginless']}>Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Комиссия депозита'>
                <Row className='mb-1'>Текущий процент: 80%</Row>
                <Row className='mb-3'>
                    <Col className='col-12 col-sm-6 mb-2'>
                        <AdminInput {...registerPercent('newPercent')}  name='newPercent' placeholder='Изменить процент' />
                    </Col>
                    <Col className='col-12 col-sm-6 mb-2'>
                        <AdminButton onClick={() => handleOpenModal('new-percent')} classname={['green', 'marginless']}>Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Новый стафф рекрутер'>
                <Row className='mb-3'>
                    <Col className='col-12 col-sm-6 mb-2'>
                        <AdminInput {...registerRecruiter('recruiterName', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} name='recruiterName' placeholder='Изменить рекрутера' />
                        <ErrorMessage  name='recruiterName' errors={errors3} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Col>
                    <Col className='col-12 col-sm-6'>
                        <AdminButton onClick={() => handleOpenModal('staff-reqruiter')} classname={['green', 'marginless']}>Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Изменить имя в саппорте'>
                <Row className='mb-3'>
                    <Col className='col-12 col-sm-6 mb-2'>
                        <AdminInput {...registerSupport('supportName',{
                            pattern: /^[^а-яё]+$/iu
                        })} name='supportName' placeholder='Изменить имя'/>
                        <ErrorMessage  name='supportName' errors={errors4} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Col>
                    <Col className='col-12 col-sm-6'>
                        <AdminButton onClick={() => handleOpenModal('support')} classname={['green', 'marginless']} >Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Премиум статус'>
                <Row>
                    <CustomCheckboxBtn id='premium' onChange={() => handleOpenModal('premium')} checked={!btns.currentPrem ? false : true}/>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Дабл депов'>
                <Row>
                    <CustomCheckboxBtn id='double' onChange={() => handleOpenModal('double')} checked={!btns.double ? false : true}/>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Полный бан'>
                <Row>
                    <CustomCheckboxBtn id='full-ban' onChange={() => handleOpenModal('full-ban')} checked={!btns.fullBan ? false : true}/>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Бан внутренних транзакций'>
                <Row>
                    <CustomCheckboxBtn id='internal-ban' onChange={() => handleOpenModal('internal-ban')} checked={!btns.transactionBan ? false : true}/>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Бан свапов'>
                <Row>
                    <CustomCheckboxBtn id='swap-ban' onChange={() => handleOpenModal('swap-ban')} checked={!btns.swapBan ? false : true}/>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='IP адреса и почта'>
                <Row className={cls.ip_list}>
                    <Col className='col-6'>
                        {
                            props.ipData.length ?
                                props.ipData.map(ip => {
                                    return (
                                        <Row style={{color: 'tomato'}} key={uuid()}>
                                            <Col className='col-3'>{ip.ip_address}</Col>
                                            <Col className='col-3'>{ip.email}</Col>
                                        </Row>
                                    )
                                })
                                : <h5>User is unique</h5>
                        }
                        <AdminButton onClick={() => handleOpenModal('ip-clear')} classname={['green', 'marginless']}>Очистить IP</AdminButton>
                    </Col>
                    <Col className='col-6'>
                        { props.data ?
                            <Row>
                                <Col>{props.data.base_data.email}</Col>
                            </Row>
                            : <h5>Email not found</h5>
                        }
                    </Col>
                </Row>
                
            </AdminButtonCard>

            {
                store.fullAccess ?
                    <AdminButtonCard>
                        <Row className={'text-center mb-5'}>
                            <h2>Удалить пользователя</h2>
                        </Row>
                        <Row className={'justify-content-center mb-4'}>
                            <AdminButton onClick={() => handleOpenModal('delete-user')} classname={['red', 'xxl']}>Удалить</AdminButton>
                        </Row>
                    </AdminButtonCard>
                    : null
            }
        </Container>
    )
}

export default UserDetailTabAct