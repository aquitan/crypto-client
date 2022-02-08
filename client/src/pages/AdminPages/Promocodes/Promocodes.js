import React, {useEffect, useState} from 'react'
import { Col, Container, Row} from "react-bootstrap";
import cls from './Promocodes.module.scss'
import error from '../../../styles/Error.module.scss'
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import PromocodesItem from "./components/PromocodesItem/PromocodesItem";
import {emailValidate, validateInput} from "../../../utils/checkEmail";
import {ErrorMessage} from "@hookform/error-message";
import Select from '../../../components/UI/Select/Select';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { postData } from '../../../services/StaffServices';
import AdminButtonCard from '../../../components/AdminButtonCard/AdminButtonCard';

const Promocodes = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const [promocodeList, setpromocodeList] = useState()
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
        console.log('data', data)
        let dataPrep = prepareData(data.counter, data.min, data.max)

        let promoData = {
            value: dataPrep,
            date: getCurrentDate(),
            staff: store.userId,
            domainName: window.location.host,
            counter: data.counter,
            currency: data.currency
        }

        const res = await fetch('/api/staff/create_promocode/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(promoData)
        })
        const datas = await res.json()
    }

    const getAllPromocodes = async () => {
        let promoData = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            id: store.userId
        }
        const res = await postData('/staff/get_promocode_list/', promoData)
        const data = await res.data
        setpromocodeList(data.promocodeList)
    }

    useEffect(() => {
        getAllPromocodes()
    }, [])


    return (
        <Container>
            <h1 className='mt-4'>Промокоды</h1>
            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`}>
                <h2 className={'mb-3'}>Создать промокод</h2>
                <AdminForm onSubmit={handleSubmit(sendPromocode)}>
                    <Row className='mb-4'>
                        <Col>
                            <AdminInput {...register('min',{
                                required: true,
                                message: 'Заполните поле'
                            })} maxLength='5' placeholder='Сумма вознаграждения от' />
                            <ErrorMessage  name='domainName' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                        <Col>
                            <AdminInput {...register('max', {
                                required: true,
                                message: 'Заполните поле'
                            })} maxLength='5' placeholder='Сумма вознаграждения до' />
                            <ErrorMessage  name='domainName' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <AdminInput {...register('counter', {
                                required: true,
                                message: 'Заполните поле'
                            })} placeholder='Кол-во промокодов' />
                            <ErrorMessage  name='domainName' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                        <Col>
                            <AdminInput {...register('domainName', {
                                required: true,
                                message: 'Заполните поле'
                            })} placeholder='Выбрать домен' />
                            <ErrorMessage  name='domainName' errors={errors} render={() => <p className={error.error}>Заполните поле</p>} />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col className='col-12'>
                            <AdminInput {...register('notification', {
                                pattern: /^[A-Za-z]+$/i,
                                message: 'Заполните поле'
                            })} placeholder='Нотификация' />
                            <ErrorMessage  name='notification' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col className='col-12'>
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

            <AdminButtonCard title='Текущие промокоды'>
                <Row className={cls.table_header}>
                    <Col>#</Col>
                    <Col>Код</Col>
                    <Col>Награждение</Col>
                    <Col>Валюта</Col>
                    <Col>Конфигурировать</Col>
                </Row>
                <div className={cls.current_promocodes}>
                    {
                        promocodeList ?
                            promocodeList.map(promo => {
                                return <PromocodesItem key={promo.ID} id={promo.ID} code={promo.code} reward={promo.value} type={promo.type}/>
                            })
                            : null
                    }
                </div>
            </AdminButtonCard>
            <AdminButtonCard title='Использованные промокоды'>
                <Row className={cls.table_header}>
                    <Col>#</Col>
                    <Col>Код</Col>
                    <Col>Награждение</Col>
                    <Col>Валюта</Col>
                    <Col>Конфигурировать</Col>
                </Row>
                <div className={cls.current_promocodes}>
                    {
                        promocodeList ?
                            promocodeList.map(promo => {
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