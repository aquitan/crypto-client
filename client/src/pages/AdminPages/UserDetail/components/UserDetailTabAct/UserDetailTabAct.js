import React, {useEffect, useState} from 'react'
import {Card, Col, Form, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import cls from '../../UserDetail.module.scss'
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import UserService from "../../../../../services/UserService";
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import {v4 as uuid} from 'uuid'
import ModalDark from "../../../../../components/UI/ModalDark/ModalDark";
import {store} from "../../../../../index";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import error from "../../../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {patchData, postData} from "../../../../../services/StaffServices";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";

const UserDetailTabAct = (props) => {
    const [isModal, setIsModal] = useState(false)
    const [state, setState] = useState({
        isOpen: false,
        onClickConfirm: null,
    })
    console.log('props---', props.data)
    const [btns, setBtns] = useState({
        currentPrem: props.isPremium,
        fullBan: props.data.base_data.isBanned,
        double: props.data.base_data.double_deposit,
        transactionBan: false,
        isStaff: false,
        swapBan: props.data.base_data.swap_ban
    })
    const dataObj = {
        userId: props.data.base_data.ID,
        staffId: store.userId,
        staffEmail: store.userEmail,
        userEmail: props.data.base_data.email,
        domainName: window.location.host,
        currentDate: getCurrentDate()
    }

    const {register: balanceRegister, handleSubmit: balanceHandleSubmit, formState: {errors}} = useForm({
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

    const changeBalance = async (data) => {
        console.log('balance',  data)
    }
    const changeNotif = async (data) => {
        // const response = await UserService.postUserDetailData('/123', data)
        console.log('notif', data)
    }
    const changePercent = async (data) => {
        console.log(data)
        // const response = await UserService.postUserDetailData('/123', data)
    }
    const changeReqruiterName = async (data) => {
        // const response = await UserService.postUserDetailData('/123', data)
        console.log('chage', data)
    }
    const changeSupportName = async (data) => {
        delete dataObj.userId
        delete dataObj.userEmail
        console.log(data)
        const response = await patchData('/staff/users/user_detail/update_staff_support_name/', {
            ...dataObj, updatedName: data.supportName
        })
        console.log('reqruiter')
    }
    const makeStaff = async () => {
        const response = await patchData('/staff/users/user_detail/update_staff_status/', {
            ...dataObj, status: !btns.isStaff
        })
        setBtns({...btns, isStaff: !btns.isStaff})
        handleCloseModal()
    }
    const makeDouble = async () => {
        const response = await patchData('/staff/users/user_detail/update_double_deposit/', {
            ...dataObj, status: !btns.double
        })
        setBtns({...btns, double: !btns.double})
        handleCloseModal()
        console.log('double', response.data)
    }
    const makeFullBan = async () => {
        const response = await patchData('/staff/users/user_detail/update_full_ban_status/', {
            ...dataObj, status: !btns.fullBan
        })
        setBtns({...btns, fullBan: !btns.fullBan})
        handleCloseModal()
        console.log('full ban', response)
    }
    const makeTransactionBan = async () => {
        const response = await patchData('/staff/users/user_detail/update_internal_ban_status/', {
            ...dataObj, status: !btns.fullBan
        })
        setBtns({...btns, transactionBan: !btns.transactionBan})
        handleCloseModal()
        console.log('internal ban')
    }
    const makeSwapBan = async () => {
        const response = await patchData('/staff/users/user_detail/update_swap_ban_status/', {
            ...dataObj, status: !btns.fullBan
        })
        setBtns({...btns, swapBan: !btns.swapBan})
        console.log('swap ban')
    }

    const sendPremStatus = async () => {
        const response = await patchData('/staff/users/user_detail/update_premium_status/',{
            ...dataObj,
            status: btns.currentPrem,
        })
        const premResp = response
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
                return balanceHandleSubmit(changeBalance);
            case 'ip-clear':
                return makeIpClear;
            case 'email-clear':
                return makeEmailClear;
            default:
                return () => {
                    console.log('default')
                }
        }
    }

    const handleOpenModal = (requestType) => {
        const onClickConfirm = handleFindType(requestType)
        setState({
            isOpen: true,
            onClickConfirm
        })
    }

    if (!props) {
        return <h1>Loading...</h1>
    }

    const {isOpen, onClickConfirm} = state

    return (
        <div>

            <ModalDark active={isOpen} onClick={onClickConfirm} setActive={handleCloseModal}>
                <Row>Вы уверены?</Row>
            </ModalDark>

            {
                store.isAdmin ?
                    <AdminButtonCard title='Сделать Работником'>
                        {
                            !btns.isStaff
                                ? <AdminButton onClick={() => handleOpenModal('make-staff')} classname={'green'}>Сделать</AdminButton>
                                : <AdminButton onClick={() => handleOpenModal('make-staff')} classname={'red'}>Убрать</AdminButton>
                        }
                    </AdminButtonCard>
                    : null
            }

            <AdminButtonCard title='Изменение баланса'>
                <Row>
                    <Col className='col-lg-2'>
                        Счёт пользователя:
                    </Col>
                    <Col className='col-lg-6'>
                        <Form.Select className='mb-3' {...balanceRegister('wallet')} aria-label="Default select example">
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-lg-2'>
                        Баланс кошелька:
                    </Col>
                    <Col className='col-lg-6'>
                        <AdminInput className='mb-3' {...balanceRegister('balance')} name='balance' placeholder='balance' value='2.0'/>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-lg-2'>
                        Нотификация:
                    </Col>
                    <Col className='col-lg-6'>
                        <AdminInput className='mb-3' {...balanceRegister('notification')} name='notification' placeholder='This your notif text'/>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-lg-2'>
                        Направление:
                    </Col>
                    <Col className='col-lg-6'>
                        <Form.Select className='mb-3' {...balanceRegister('type')} aria-label="Default select example">
                            <option value="deposit">Пополнение</option>
                            <option value="withdraw">Снятие</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-lg-2'>
                        Сумма:
                    </Col>
                    <Col className='col-lg-6'>
                        <AdminInput className='mb-3' {...balanceRegister('sum')} name='sum' placeholder='0' />
                    </Col>
                </Row>
                <AdminButton onClick={() => handleOpenModal('balance')} classname={'green mb-3'} >Изменить</AdminButton>

            </AdminButtonCard>

            <AdminButtonCard title='Нотификации'>
                <Row>
                    <Col>
                        <AdminInput {...registerNotif('notification', {
                            pattern: /^[A-Za-z]+$/
                        })} className='mb-3' name='recruiterName' placeholder='Текст нотификации' />
                        <ErrorMessage  name='notification' errors={errors2} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Col>
                    <Col>
                        <AdminButton onClick={() => handleOpenModal('notification')} classname={'green'}>Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Комиссия депозита'>
                <Row className='mb-1'>Текущий процент: 80%</Row>
                <Row>
                    <Col>
                        <AdminInput {...registerPercent('newPercent')} className='mb-3' name='newPercent' placeholder='Изменить процент' />
                    </Col>
                    <Col>
                        <AdminButton onClick={() => handleOpenModal('new-percent')} classname={'green'}>Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Новый стафф рекрутер'>
                <Row>
                    <Col>
                        <AdminInput {...registerRecruiter('recruiterName', {
                            pattern: /^[A-Za-z]+$/
                        })} className='mb-3' name='recruiterName' placeholder='Изменить рекрутера' />
                        <ErrorMessage  name='recruiterName' errors={errors2} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Col>
                    <Col>
                        <AdminButton onClick={() => handleOpenModal('staff-reqruiter')} classname={'green'}>Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Изменить имя в саппорте'>
                <Row>
                    <Col>
                        <AdminInput {...registerSupport('supportName',{
                            pattern: /^[A-Za-z]+$/i
                        })} name='supportName' className='mb-3' placeholder='Изменить имя'/>
                        <ErrorMessage  name='supportName' errors={errors3} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Col>
                    <Col>
                        <AdminButton onClick={() => handleOpenModal('support')} classname={'green'} >Изменить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title='Премиум статус'>
                {
                    !btns.currentPrem ?
                        <AdminButton onClick={() => handleOpenModal('premium')} classname={'green'}>Вкл</AdminButton>
                        :
                        <AdminButton onClick={() => handleOpenModal('premium')} classname={'red'}>выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Дабл депов'>
                {
                   !btns.double
                       ? <AdminButton onClick={() => handleOpenModal('double')} classname={'green'}>Вкл</AdminButton>
                       : <AdminButton onClick={() => handleOpenModal('double')} classname={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Полный бан'>
                {
                    !btns.fullBan ?
                        <AdminButton onClick={() => handleOpenModal('full-ban')} classname={'green'}>Вкл</AdminButton>
                        : <AdminButton onClick={() => handleOpenModal('full-ban')} classname={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Бан внутренних транзакций'>
                {
                    !btns.transactionBan ?
                        <AdminButton onClick={() => handleOpenModal('internal-ban')} classname={'green'}>Вкл</AdminButton>
                        : <AdminButton onClick={() => handleOpenModal('internal-ban')} classname={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Бан свапов'>
                {
                    !btns.swapBan ?
                        <AdminButton onClick={() => handleOpenModal('swap-ban')} classname={'green'}>Вкл</AdminButton>
                        : <AdminButton onClick={() => handleOpenModal('swap-ban')} classname={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='IP адреса и почта'>
                <Row className={cls.ip_list}>
                    <Col className='col-4'>
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
                        <AdminButton onClick={() => handleOpenModal('ip-clear')} classname={'green'}>Очистить IP</AdminButton>
                    </Col>
                    <Col className='col-4'>
                        { props.data ?
                            <Row>
                                <Col>{props.data.base_data.email}</Col>
                            </Row>
                            : <h5>Email not found</h5>
                        }
                        <AdminButton onClick={() => handleOpenModal('email-clear')} classname={'green'}>Очистить Почту</AdminButton>
                    </Col>
                </Row>
                
            </AdminButtonCard>
        </div>
    )
}

export default UserDetailTabAct