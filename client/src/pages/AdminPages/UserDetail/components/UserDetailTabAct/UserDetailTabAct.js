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
import Modal from "../../../../../components/UI/Modal/Modal";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import error from "../../../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";

const UserDetailTabAct = (props) => {
    const [isModal, setIsModal] = useState(false)
    const [state, setState] = useState({
        isOpen: false,
        onClickConfirm: null,
    })
    const [btns, setBtns] = useState({
        currentPrem: props.isPremium,
        fullBan: false,
        double: false,
        transactionBan: false,
        isStaff: false,
        swapBan: false
    })

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
        const response = await UserService.postUserDetailData('/123', data)
    }
    const changeNotif = async (data) => {
        // const response = await UserService.postUserDetailData('/123', data)
        console.log('notif', data)
    }
    const changePercent = async (data) => {
        const response = await UserService.postUserDetailData('/123', data)
    }
    const changeReqruiterName = async (data) => {
        // const response = await UserService.postUserDetailData('/123', data)
        console.log('chage', data)
    }
    const changeSupportName = async (data) => {
        // const response = await UserService.postUserDetailData('/123', data)
        console.log('reqruiter')
    }
    const makeStaff = async () => {
        setBtns({...btns, isStaff: !btns.isStaff})
        handleCloseModal()
        // const response = await UserService.postUserDetailData('/123',{isStaff: !isStaff})
    }
    const makeDouble = async () => {
        setBtns({...btns, double: !btns.double})
        handleCloseModal()
        // const response = await UserService.postUserDetailData('/123',{doubleDep: !doubleDep})
        console.log('double')
    }
    const makeFullBan = async () => {
        setBtns({...btns, fullBan: !btns.fullBan})
        handleCloseModal()
        // const response = await UserService.postUserDetailData('/123',{isBan: !fullBan})
        console.log('full ban')
    }
    const makeTransactionBan = async () => {
        setBtns({...btns, transactionBan: !btns.transactionBan})
        handleCloseModal()
        // const response = await UserService.postUserDetailData('/123',{transactionBan: !transactionBan})
        console.log('internal ban')
    }
    const makeSwapBan = async () => {
        setBtns({...btns, swapBan: !btns.swapBan})
        // setSwapBan(!swapBan)
        // const response = await UserService.postUserDetailData('/123',{swapBan: !swapBan})
        console.log('swap ban')
    }

    const sendPremStatus = async () => {
        const response = await UserService.postUserDetailData('/personal_area/profile/update_premium_status/',{
            status: btns.currentPrem,
            userId: props.data.base_data.ID,
            staffId: store.userId,
            staffEmail: store.userEmail,
            userEmail: props.data.user_kyc.email,
            domainName: window.location.host
        })
        const premResp = response
        setBtns({...btns, currentPrem: !btns.currentPrem})
        setState({isOpen: false, onClickConfirm: null})
        handleCloseModal()
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
                return changeSupportName;
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
                return changeReqruiterName;
            case 'new-percent':
                return changePercent;
            case 'notification':
                return changeNotif;
            case 'make-staff':
                return makeStaff;
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
                                ? <AdminButton onClick={() => handleOpenModal('make-staff')} className={'green'}>Сделать</AdminButton>
                                : <AdminButton onClick={() => handleOpenModal('make-staff')} className={'red'}>Убрать</AdminButton>
                        }
                    </AdminButtonCard>
                    : null
            }

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Изменение баланса</h3>
                        </Col>
                    </Row>
                    <AdminForm onSubmit={balanceHandleSubmit(changeBalance)}>
                        <Row>
                            <Col>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Счёт пользователя:</h5></Col>
                                    <Col>
                                        <Form.Select {...balanceRegister('wallet')} aria-label="Default select example">
                                            <option value="BTC">BTC</option>
                                            <option value="ETH">ETH</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Баланс кошелька:</h5></Col>
                                    <Col>
                                        <AdminInput {...balanceRegister('balance')} name='balance' placeholder='balance' value='2.0'/>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Нотификация:</h5></Col>
                                    <Col>
                                        <AdminInput {...balanceRegister('notification')} name='notification' placeholder='This your notif text'/>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Направление:</h5></Col>
                                    <Col>
                                        <Form.Select {...balanceRegister('type')} aria-label="Default select example">
                                            <option value="deposit">Пополнение</option>
                                            <option value="withdraw">Снятие</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Сумма:</h5></Col>
                                    <Col>
                                        <AdminInput {...balanceRegister('sum')} name='sum' placeholder='0' />
                                    </Col>
                                </Row>
                            </Col>
                            <Row className={`${cls.bg_black} mt-3`}>
                                <Col className='col-3'>
                                    <AdminButton className={'green'} >Изменить</AdminButton>
                                </Col>
                            </Row>
                        </Row>

                    </AdminForm>
                </Row>
            </Card>

            <AdminButtonCard title='Нотификации'>
                <AdminInput {...registerNotif('notification', {
                    pattern: /^[A-Za-z]+$/
                })} className='mb-3' name='recruiterName' placeholder='Текст нотификации' />
                <ErrorMessage  name='notification' errors={errors2} render={() => <p className={error.error}>Только английские буквы</p>} />

                <AdminButton onClick={() => handleOpenModal('notification')} className={'green'}>Изменить</AdminButton>
            </AdminButtonCard>

            <AdminButtonCard title='Комиссия депозита'>
                <Row className='mb-1'>Текущий процент: 80%</Row>
                <AdminInput {...registerPercent('newPercent')} className='mb-3' name='recruiterName' placeholder='Изменить процент' />
                <AdminButton onClick={() => handleOpenModal('new-percent')} className={'green'}>Изменить</AdminButton>
            </AdminButtonCard>

            <AdminButtonCard title='Новый стафф рекрутер'>
                <AdminInput {...registerRecruiter('recruiterName', {
                    pattern: /^[A-Za-z]+$/
                })} className='mb-3' name='recruiterName' placeholder='Изменить рекрутера' />
                <ErrorMessage  name='recruiterName' errors={errors2} render={() => <p className={error.error}>Только английские буквы</p>} />
                <AdminButton onClick={() => handleOpenModal('staff-reqruiter')} className={'green'}>Изменить</AdminButton>
            </AdminButtonCard>

            <AdminButtonCard title='Премиум статус'>
                {
                    !btns.currentPrem ?
                        <AdminButton onClick={() => handleOpenModal('premium')} className={'green'}>Вкл</AdminButton>
                        :
                        <AdminButton onClick={() => handleOpenModal('premium')} className={'red'}>выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Изменить имя в саппорте'>
                <AdminInput {...registerSupport('supportName',{
                    pattern: /^[A-Za-z]+$/i
                })} name='supportName' className='mb-3' placeholder='Изменить имя'/>
                <ErrorMessage  name='supportName' errors={errors3} render={() => <p className={error.error}>Только английские буквы</p>} />
                <AdminButton onClick={() => handleOpenModal('support')} className={'green'} >Изменить</AdminButton>
            </AdminButtonCard>

            <AdminButtonCard title='Дабл депов'>
                {
                   !btns.double
                       ? <AdminButton onClick={() => handleOpenModal('double')} className={'green'}>Вкл</AdminButton>
                       : <AdminButton onClick={() => handleOpenModal('double')} className={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Полный бан'>
                {
                    !btns.fullBan ?
                        <AdminButton onClick={() => handleOpenModal('full-ban')} className={'green'}>Вкл</AdminButton>
                        : <AdminButton onClick={() => handleOpenModal('full-ban')} className={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Бан внутренних транзакций'>
                {
                    !btns.transactionBan ?
                        <AdminButton onClick={() => handleOpenModal('internal-ban')} className={'green'}>Вкл</AdminButton>
                        : <AdminButton onClick={() => handleOpenModal('internal-ban')} className={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='Бан свапов'>
                {
                    !btns.swapBan ?
                        <AdminButton onClick={() => handleOpenModal('swap-ban')} className={'green'}>Вкл</AdminButton>
                        : <AdminButton onClick={() => handleOpenModal('swap-ban')} className={'red'}>Выкл</AdminButton>
                }
            </AdminButtonCard>

            <AdminButtonCard title='IP адреса'>
                <Row className={cls.ip_list}>
                    {
                        props.ipData.length ?
                            props.ipData.map(ip => {
                                return (
                                    <Row key={uuid()}>
                                        <Col className='col-3'>{ip.ip_address}</Col>
                                        <Col className='col-3'>{ip.email}</Col>
                                    </Row>
                                )
                            })
                            : <h5>User is unique</h5>
                    }
                </Row>
                <AdminButton onClick={() => handleOpenModal('swap-ban')} className={'green'}>Очистить IP</AdminButton>
            </AdminButtonCard>
        </div>
    )
}

export default UserDetailTabAct