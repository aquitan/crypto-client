import React from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import cls from './Promocodes.module.scss'
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {store} from "../../../index";

const Promocodes = () => {
    const {register, handleSubmit} = useForm()

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
        const datas = await res
        console.log(datas)
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
                        <AdminButton color='green'>Сгенерировать</AdminButton>
                    </Row>
                </AdminForm>
            </Card>
            
        </Container>
    )
}

export default Promocodes