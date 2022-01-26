import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import cls from './Promocodes.module.scss'
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {store} from "../../../index";

const Promocodes = () => {
    const {register, handleSubmit} = useForm()
    // const [promocodes, setPromocode] = useState([])

    function getRandom(min, max) {
        return (Math.random() * (max - min) + min / 1).toFixed(3);
    }

    const sendPromocode = async (data) => {
        let promocodes = []
        for (let i = 0; i < data.counter; i++) {
            if (promocodes.length <= 9) {
                setPromocode((prevState) => {
                    return [...prevState, getRandom(data.min, data.max)]
                })
            } else {
                alert(`maximum promocodes reached ${promocodes.length}`)
            }
        }

        const timeDate = new Date()
        const currentDate = timeDate.getFullYear() + '-'
            + timeDate.getMonth()+1 + '-'
            + timeDate.getDate() + ' '
            + timeDate.getHours() + ':'
            + timeDate.getMinutes() + ':'
            + timeDate.getSeconds()


        setTimeout(async () => {
            if (promocodes.length) {
                let promoData = {
                    value: promocodes,
                    date: currentDate,
                    staff: store.userId,
                    domainName: window.location.host,
                    counter: data.counter
                }

                const res = await fetch('12312', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(promoData)
                })
                const datas = await res
                console.log(datas)
            }
        }, 1500)
    }


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
                        <AdminButton color='green'>{promocodes.length ? 'Сгенерировать' : 'Ждите'}</AdminButton>
                    </Row>
                </AdminForm>
            </Card>
            
        </Container>
    )
}

export default Promocodes