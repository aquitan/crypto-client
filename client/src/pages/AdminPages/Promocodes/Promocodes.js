import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import cls from './Promocodes.module.scss'
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import PromocodesItem from "./components/PromocodesItem/PromocodesItem";

const Promocodes = () => {
    const {register, handleSubmit} = useForm()
    const [promocodeList, setpromocodeList] = useState()

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

        const timeDate = new Date()
        const currentDate = timeDate.getFullYear() + '-'
            + timeDate.getMonth()+1 + '-'
            + timeDate.getDate() + ' '
            + timeDate.getHours() + ':'
            + timeDate.getMinutes() + ':'
            + timeDate.getSeconds()


        let promoData = {
            value: dataPrep,
            date: currentDate,
            staff: store.userId,
            domainName: window.location.host,
            counter: data.counter
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
        console.log(datas)
    }

    const getAllPromocodes = async () => {
        let promoData = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            id: store.userId
        }
        const res = await fetch('/api/staff/get_promocode_list/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(promoData)
        })
        const data = await res.json()
        setpromocodeList(data.promocodeList)
        console.log('get promocodes', data)
    }

    useEffect(() => {
        getAllPromocodes()
    }, [])


    return (
        <Container>
            <Card className={`${cls.bg_black} mb-3 p-3`}>
                <h2 className={'mb-3'}>Создать промокод</h2>
                <AdminForm onSubmit={handleSubmit(sendPromocode)}>
                    <Row className='mb-4'>
                        <Col>
                            <AdminInput {...register('min')} maxLength='5' placeholder='Сумма вознаграждения от' />
                        </Col>
                        <Col>
                            <AdminInput {...register('max')} maxLength='5' placeholder='Сумма вознаграждения до' />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <AdminInput {...register('counter')} placeholder='Кол-во промокодов' />
                        </Col>
                        <Col>
                            <AdminInput {...register('domainName')} placeholder='Выбрать домен' />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <AdminButton color='green'>Сгенерировать</AdminButton>
                    </Row>
                </AdminForm>
            </Card>

            <Card className={`${cls.bg_black} mb-3 p-3`}>
                <Row className={cls.table_header}>
                    <Col>#</Col>
                    <Col>Код</Col>
                    <Col>Награждение</Col>
                    <Col>Тип</Col>
                    <Col>Конфигурировать</Col>
                </Row>
                {
                    promocodeList ?
                        promocodeList.map(promo => {
                            return <PromocodesItem key={promo.ID} id={promo.ID} code={promo.code} reward={promo.value} type={promo.type}/>
                        })
                        : null
                }
            </Card>
            
        </Container>
    )
}

export default Promocodes