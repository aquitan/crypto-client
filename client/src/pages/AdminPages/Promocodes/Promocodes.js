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

const Promocodes = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const currentDomains = [
        {value: 'localhost:3000', text: 'localhost:3000'}
    ]
    const [state, setState] = useState({
        currentPromocodes: '',
        usedPromocodes: '',
    })
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

        let currentDate = new Date()
        let fullDate = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate()
        let promoData = {
            value: dataPrep,
            date: fullDate,
            staff: store.userId,
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
            id: store.userId
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
            id: store.userId
        }
        const res = await postData('/staff/get_used_promocode_list/', promoData)
        const data = await res.data
        console.log('used', data)
    }

    useEffect(() => {
        getAllPromocodes()
        getUsedPromocodes()
    }, [])

    const onDeletePromo = async (id) => {
        const res = await deleteData('/staff/delete_promocode', {id: id})
        setState({
            ...state, currentPromocodes: state.currentPromocodes.filter(el => el.ID !== id )
        })
        handleCloseModal()
        setModal({...modal, isDelete: true})
        if (res.status === 200) {
            setModal({...modal, isDelete: true})
        }
    }
    const deleteAllUsed = async () => {
        const res = await deleteData('/123')
        setState({...state, usedPromocodes: ''})
        handleCloseModal()
    }

    const handleOpenModal = (id) => {
        const onClickConfirm = () => onDeletePromo(id) // запихнул коллбэк потому что возвращался объект в onClick и все крашилось
        setModal(
            {
            isOpen: true,
            onClickConfirm
        })
    }

    const handleCloseModal = () => {
        setModal({isOpen: false, onClickConfirm: null, isDelete: false})
    }

    const {isOpen, onClickConfirm, isDelete} = modal

    return (
        <Container>

            <ModalDark active={isOpen} onClick={onClickConfirm} setActive={handleCloseModal}>
                <h2>Вы уверены?</h2>
            </ModalDark>

            <ModalDark active={isDelete} setActive={handleCloseModal}>
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
                            <AdminInput {...register('counter', {
                                required: true,
                                message: 'Заполните поле'
                            })} placeholder='Кол-во промокодов' />
                            <ErrorMessage  name='counter' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                        <Col className='col-12 col-md-6 mb-3'>
                            <Select options={currentDomains} {...register('domainName', {
                                required: true,
                                message: 'Заполните поле'
                            })} />
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
                            })} options={options} />
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
                                    onClick={() => handleOpenModal(promo.ID)}
                                    key={promo.ID}
                                    id={promo.ID}
                                    code={promo.code}
                                    reward={promo.value}
                                    type={promo.type}/>
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
                    <Col className='d-none d-md-block'>Код</Col>
                    <Col className='d-none d-md-block'>Награждение</Col>
                    <Col className='d-none d-md-block'>Валюта</Col>
                    <Col className='d-none d-md-block'>Конфигурировать</Col>
                </Row>
                <div className={cls.current_promocodes}>
                    {
                        state.usedPromocodes ?
                            state.usedPromocodes.map(promo => {
                                return <PromocodesItem key={promo.ID} id={promo.ID} code={promo.code} reward={promo.value} type={promo.type}/>
                            })
                            : null
                    }
                </div>

            </AdminButtonCard>
            
        </Container>
    )
}

export default Promocodes