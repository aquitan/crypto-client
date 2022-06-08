import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {getData, patchData} from "../../../services/StaffServices";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "../../../components/UI/Select/Select";
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {useForm} from "react-hook-form";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";

const StaffTrading = () => {
    const {register, handleSubmit} = useForm()

    useEffect(() => {
        getTrading()
    }, [])

    const getTrading = async () => {
        const res = await getData(`/staff/trading/get_valid_trading_data/${window.location.host}`)
        console.log('res data', res.data)
    }

    const onSubmit = async (data) => {
        const obj = {
            valueInPercent: +data.valueInPercent,
            coinName: 'BTC',
            growthParams: Boolean(data.growthParams),
            staffId: store.fullAccess ? 'root': store.user.id,
            domainName: window.location.host,
            currentDate: dateToTimestamp(new Date()),
            timeRangeInMs: +data.timeRangeInMs,
            rootAccess: store.fullAccess
        }

        const res = await patchData('/staff/trading/update_coin_rate/', obj)
    }

    const growth = [
        {text: 'true', value: true},
        {text: 'false', value: false},
    ]

    return (
        <Container>
            <AdminButtonCard>
                <h1 className={'text-center'}>Трейдинг</h1>
            </AdminButtonCard>

            <AdminButtonCard>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className={'mb-3'}>
                        <AdminInput
                            {...register('valueInPercent')}
                            classname={['admin-square']}
                            placeholder={'Значение в процентах'} />
                    </Row>
                    <Row className={'mb-3'}>
                        <Select
                            {...register('growthParams')}
                            classname={['admin-square']}
                            placeholder={'Параметр роста'}
                            options={growth} />
                    </Row>
                    <Row className={'mb-3'}>
                        <AdminInput
                            {...register('timeRangeInMs')}
                            classname={['admin-square']}
                            placeholder={'Интервал в миллесекундах'} />
                    </Row>
                    <AdminButton classname={'green'}>Изменить</AdminButton>
                </Form>
            </AdminButtonCard>

        </Container>
    )
}

StaffTrading.propTypes = {
    
}
StaffTrading.defaultProps = {
    
}

export default StaffTrading