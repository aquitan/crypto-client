import React, {useEffect, useState} from 'react'
import {Col, Container, Modal, Row} from "react-bootstrap";
import cls from './Promocodes.module.scss'
import error from '../../../styles/Error.module.scss'
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import PromocodesItem from "./components/PromocodesItem/PromocodesItem";
import {ErrorMessage} from "@hookform/error-message";
import Select from '../../../components/UI/Select/Select';
import {deleteData, postData, putData} from '../../../services/StaffServices';
import AdminButtonCard from '../../../components/AdminButtonCard/AdminButtonCard';
import ModalDark from "../../../components/UI/ModalDark/ModalDark";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";

const Promocodes = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const currentDomains = [
        {value: 'localhost:3000', text: 'localhost:3000'}
    ]
    const [state, setState] = useState({
        currentPromocodes: '',
    })
    const [usedPromocodes, setUsedPromocodes] = useState('')
    const [modal, setModal] = useState({
        isOpen: false,
        onClickConfirm: null,
        isDelete: false
    })
    const options = [
        {value: 'BTC', text: 'BTC'}, 
        {value: 'ETH', text: 'ETH'},
        {value: 'BCH', text: 'BCH'},
        {value: 'USDT', text: 'USDT'},
    ]
    const promoAmount = [
        {text: 1, id: 1},
        {text: 2, id: 2},
        {text: 3, id: 3},
        {text: 4, id: 4},
        {text: 5, id: 5},
        {text: 6, id: 6},
        {text: 7, id: 7},
        {text: 8, id: 8},
        {text: 9, id: 9},
        {text: 10, id: 10},
    ]

    function getRandom(min, max) {
        return (Math.random() * (max - min) + min / 1).toFixed(3);
    }

    const prepareData = (counter, min, max) => {
        if (counter > 1 && counter <= 10) {
            let valArr = []
            for (let i = 0; i < counter; i++) {
                let values = getRandom(min, max)
                valArr.push(values)
            }
            return valArr
        }
        return parseFloat(getRandom(min, max))
    }

    const sendPromocode = async (data) => {
        let dataPrep = prepareData(data.counter, data.min, data.max)

        let promoData = {
            value: dataPrep,
            date: dateToTimestamp(),
            staffId: store.userId,
            domainName: window.location.host,
            counter: data.counter,
            currency: data.currency,
            notification: data.notification
        }
        const res = await putData('/staff/create_promocode/', promoData)
        if (res.status === 201) getAllPromocodes()
    }

    const getAllPromocodes = async () => {
        let promoData = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            id: store.userId,
            rootAccess: store.fullAccess,
            staffEmail: store.userEmail
        }
        const res = await postData('/staff/get_promocode_list/', promoData)
        const data = await res.data
        console.log('current promos', res.data)
        setState({
            ...state, currentPromocodes: data.promocodeList
        })
    }

    const getUsedPromocodes = async () => {
        let promoData = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            id: store.userId,
            rootAccess: store.fullAccess
        }
        const res = await postData('/staff/get_used_promocode_list/', promoData)
        const data = await res.data

        setUsedPromocodes(data.promocodeList)
        console.log('data.promocodeList', data.promocodeList)
    }

    useEffect(() => {
        getAllPromocodes()
        getUsedPromocodes()
    }, [])

    const onDeletePromo = async (code) => {
        const obj = {
            promocode: code
        }
        console.log('code', obj)
        const res = await deleteData('/staff/delete_promocode/', {data: obj})
        setState({
            ...state, currentPromocodes: state.currentPromocodes.filter(el => el.code !== code )
        })
        handleCloseModal()
        setModal({...modal, isDelete: true})
        if (res.status === 200) {
            setModal({...modal, isDelete: true})
        }
    }
    const deleteAllUsed = async () => {
        const obj = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            id: store.userId
        }
        const res = await deleteData('/staff/delete_all_used_promocode/', {data: obj})
        setState({...state, usedPromocodes: ''})
        handleCloseModal()
    }

    const handleOpenModal = (code) => {
        const onClickConfirm = () => onDeletePromo(code) // запихнул коллбэк потому что возвращался объект в onClick и все крашилось
        console.log('this is', code)
        setModal(
            {
            isOpen: true,
            onClickConfirm
        })
    }

    const handleCloseModal = () => {
        setModal({isOpen: false, onClickConfirm: null, isDelete: false})
    }

    console.log('currentPromocodes', state.usedPromocodes)

    const {isOpen, onClickConfirm, isDelete} = modal

    return (
        <Container>

            <ModalDark active={isOpen} onClick={onClickConfirm} setActive={handleCloseModal}>
                <h2>Вы уверены?</h2>
            </ModalDark>

            <ModalDark singleBtn={true} active={isDelete} setActive={handleCloseModal}>
                <h2>Код удален!</h2>
            </ModalDark>

            <h1 className='mt-4'>Промокоды</h1>
            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`}>
                <h2 className={'mb-3'}>Создать промокод</h2>
                <AdminForm onSubmit={handleSubmit(sendPromocode)}>
                    <Row>
                        <Col className='col-12 col-md-6 mb-3'>
                            <AdminInput {...register('min',{
                                required: true,
                                message: 'Заполните поле'
                            })} maxLength='5' placeholder='Сумма вознаграждения от' />
                            <ErrorMessage  name='min' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                        <Col className='col-12 col-md-6 mb-3'>
                            <AdminInput {...register('max', {
                                required: true,
                                message: 'Заполните поле'
                            })} maxLength='5' placeholder='Сумма вознаграждения до' />
                            <ErrorMessage  name='max' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-12 col-md-6 mb-3'>
                            {/*<AdminInput {...register('counter', {*/}
                            {/*    required: true,*/}
                            {/*    message: 'Заполните поле'*/}
                            {/*})} placeholder='Кол-во промокодов' />*/}

                            <Select {...register('counter', {
                                required: true,
                                message: 'Заполните поле'
                            })} classname={'admin-square'} options={promoAmount} />

                            <ErrorMessage  name='counter' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                        <Col className='col-12 col-md-6 mb-3'>
                            <Select options={currentDomains} {...register('domainName', {
                                required: true,
                                message: 'Заполните поле'
                            })} classname={'admin-square'} />
                            <ErrorMessage  name='domainName' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-12 mb-3'>
                            <AdminInput {...register('notification', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu,
                                message: 'Заполните поле'
                            })} placeholder='Нотификация' />
                            <ErrorMessage  name='notification' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-12 mb-3'>
                            <Select {...register('currency', {
                                required: true,
                                message: 'Выберите валюту'
                            })} classname={'admin-square'} options={options} />
                            <ErrorMessage  name='currency' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <AdminButton classname='green'>Сгенерировать</AdminButton>
                        </Col>
                    </Row>
                </AdminForm>
            </AdminButtonCard>

            <AdminButtonCard>
                <Row className='mb-4'>
                    <Col><h2>Текущие промокоды</h2></Col>
                </Row>
                <Row className={cls.table_header}>
                    <Col className='d-none d-md-block col-2'>Код</Col>
                    <Col className='d-none d-md-block col-2'>Награждение</Col>
                    <Col className='d-none d-md-block col-2'>Валюта</Col>
                    <Col className='d-none d-md-block col-4'>Конфигурировать</Col>
                </Row>
                <div className={cls.current_promocodes}>
                    {
                        state.currentPromocodes ?
                            state.currentPromocodes.map(promo => {
                                return <PromocodesItem
                                    onClick={() => handleOpenModal(promo.code)}
                                    key={promo.ID}
                                    id={promo.ID}
                                    code={promo.code}
                                    reward={promo.value}
                                    btn={true}
                                    currency={promo.coinName}/>
                            })
                            : null
                    }
                </div>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row className='mb-4'>
                    <Col className='col-12 col-sm-8 mb-3'>
                        <h2>Использованные промокоды</h2>
                    </Col>
                    <Col className='col-12 col-sm-4'>
                        <AdminButton
                            onClick={deleteAllUsed}
                            classname={['red', 'xs']}>Удалить все</AdminButton>
                    </Col>
                </Row>
                <Row className={cls.table_header}>
                    <Col className='d-none d-md-block col-2'>Код</Col>
                    <Col className='d-none d-md-block col-2'>Награждение</Col>
                    <Col className='d-none d-md-block col-2'>Валюта</Col>
                </Row>
                <div className={cls.current_promocodes}>
                    {
                        usedPromocodes ?
                            usedPromocodes.map(promo => {
                                return <PromocodesItem
                                    key={promo.ID}
                                    id={promo.ID}
                                    code={promo.code}
                                    reward={promo.value}
                                    btn={false}
                                    currency={promo.coinName}/>
                            })
                            : null
                    }
                </div>

            </AdminButtonCard>
            
        </Container>
    )
}

export default Promocodes