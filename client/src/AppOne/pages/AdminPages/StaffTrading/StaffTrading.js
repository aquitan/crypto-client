import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Row, Tab, Tabs} from 'react-bootstrap';
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {getData, patchData, postData} from '../../../services/StaffServices';
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "../../../components/UI/Select/Select";
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {useForm} from "react-hook-form";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import HistoryItem from './components/HistoryItem/HistoryItem';
import {optionsCurrency} from '../../../utils/staffConstants';
import RateItem from './components/RateItem/RateItem';
import Preloader from '../../../components/UI/Preloader/Preloader';
import './StaffTrading.scss'
import CustomModal from '../../../components/CustomModal/CustomModal';

const StaffTrading = () => {
    const {register, handleSubmit} = useForm()
    const [historyBuy, setHistoryBuy] = useState([])
    const [historySell, setHistorySell] = useState([])
    const [ratesData, setRatesData] = useState([])
    const [activeDomains, setActiveDomains] = useState([])
    const [currentDomain, setCurrentDomain] = useState(window.location.host)
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalError, setModalError] = useState(false)

    useEffect(() => {
        getDomainList()
    }, [])

    useEffect(() => {
        getHistory()
    }, [currentDomain])

    const getHistory = async () => {
        const res = await getData(`/staff/trading/get_valid_trading_data/${currentDomain}`)
        setHistoryBuy(res.data.ordersData.ordersForBuy)
        setHistorySell(res.data.ordersData.ordersForSale)
        setRatesData(res.data.ratesData)
    }

    const onSubmit = async (data) => {
        const obj = {
            valueInPercent: +data.valueInPercent,
            coinName: data.coinName,
            growthParams: data.growthParams === 'true' ? true : false,
            domainName: window.location.host,
            timeRangeInMs: +data.timeRangeInMs * 60 * 1000,
        }

        try {
            await patchData('/staff/trading/update_coin_rate/', obj)
            setModalSuccess(true)
        } catch(e) {
            setModalError(true)
        }
    }

    const growth = [
        {text: 'Рост', value: true},
        {text: 'Падение', value: false},
    ]

    const getDomainList = async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess ? store.fullAccess : 'null',
            staffId: store.user.id
        }
        const res = await postData('/staff/domains/get_active_domains/', obj)

        let domains = []

        res.data.forEach(item => {
            let obj = {value: item.domainName, text: item.domainName}

            domains.push(obj)
        })
        setActiveDomains(domains)
    }

    const onChangeActiveDomain = async (e) => {
        setCurrentDomain(e.target.value)
    }

    const valueInPercent = [
        {value: 1, text: '1%'},
        {value: 2, text: '2%'},
    ]

    const timeLimit = [
        {value: 5, text: '5 минут'},
        {value: 10, text: '10 минут'},
        {value: 15, text: '15 минут'},
    ]



    return (
        <>

            <CustomModal show={modalSuccess} handleClose={() => setModalSuccess(false)} btnClose='Ok' size='md' title='Изменения внесены' themeDark={true}>
                Изменения в график внесены!
            </CustomModal>

            <CustomModal show={modalError} handleClose={() => setModalError(false)} btnClose='Ok' size='md' title='Ошибка' themeDark={true}>
                Упс! Что-то пошло не так! Попробуйте позже!
            </CustomModal>

            <Container>
                <AdminButtonCard>
                    <h1 className={'text-center'}>Трейдинг</h1>
                </AdminButtonCard>

                <AdminButtonCard>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className={'mb-3'}>
                            <Select {...register('coinName')} getAvalue={true} options={optionsCurrency} classname={'admin-square'} />
                        </Row>
                        <Row className={'mb-3'}>
                            <Select {...register('valueInPercent')} getAvalue={true} options={valueInPercent} classname={'admin-square'} />
                        </Row>
                        <Row className={'mb-3'}>
                            <Select {...register('timeRangeInMs')} getAvalue={true} options={timeLimit} classname={'admin-square'} />
                        </Row>
                        <Row className={'mb-3'}>
                            <Select
                                {...register('growthParams')}
                                getAvalue={true}
                                classname={['admin-square']}
                                options={growth} />
                        </Row>

                        <Row>
                            <Col className='text-center'>
                                <AdminButton classname={'green'}>Изменить</AdminButton>
                            </Col>
                        </Row>
                    </Form>
                </AdminButtonCard>

                <AdminButtonCard>
                    <h2 className={'text-center mb-4'}> Данные по рейтам</h2>
                    <Row className='my-3'>
                        {
                            activeDomains.length ? <Select value={currentDomain} onChange={onChangeActiveDomain} options={activeDomains} classname={'admin-square'} /> : <Preloader/>
                        }
                    </Row>
                    <Row>
                        <Col>Название</Col>
                        <Col>Процент</Col>
                        <Col>Таймер</Col>
                    </Row>
                    {
                        ratesData.length ?
                        ratesData.map(item => {
                            return (
                                <RateItem
                                    key={item.coinName}
                                    growthParams={item.growthParams}
                                    coinName={item.coinName}
                                    valueInPercent={item.valueInPercent}
                                    timeRangeInMs={item.timeRangeInMs}
                                />
                            )
                        }) : <h3 className={'mt-3'}>Нет данных по рейтам</h3>
                    }
                </AdminButtonCard>

                <AdminButtonCard>
                    <h2 className={'text-center'}>История ордеров пользователя</h2>

                    <Tabs
                    defaultActiveKey="buy"
                    id="history-tab"
                    className="mb-3 history-tab"
                    >
                        <Tab eventKey="buy" className='tab-content-buy' title="Buy">
                            <Row className='mb-3'>
                                <Col className='text-center'>Email</Col>
                                <Col className='text-center'>Домен</Col>
                                <Col className='text-center'>Дата</Col>
                                <Col className='text-center'>Монета</Col>
                                <Col className='text-center'>Сумма Монеты</Col>
                                <Col className='text-center'>Сумма USDT</Col>
                                <Col className='text-center'>Рейт</Col>
                                <Col className='text-center'>Статус</Col>
                            </Row>
                            {
                                historyBuy.length ?
                                historyBuy.map(item => {
                                    return(
                                        <HistoryItem
                                            key={dateToTimestamp(item.orderDate)}
                                            email={item.userEmail}
                                            domain={item.domainName}
                                            date={item.orderDate}
                                            coinName={item.coinName}
                                            coinValue={item.coinValue}
                                            valueInUsdt={item.valueInUsdt}
                                            coinRate={item.coinRate}
                                            orderType={item.orderType}
                                            orderStatus={item.orderStatus}
                                        />
                                    )
                                }) : <h3>Нет активных ордеров</h3>
                            }
                        </Tab>
                        <Tab eventKey="sell" className='tab-content-buy' title="Sell">
                            <Row className='mb-3'>
                                <Col className='text-center'>Email</Col>
                                <Col className='text-center'>Домен</Col>
                                <Col className='text-center'>Дата</Col>
                                <Col className='text-center'>Монета</Col>
                                <Col className='text-center'>Сумма Монеты</Col>
                                <Col className='text-center'>Сумма USDT</Col>
                                <Col className='text-center'>Рейт</Col>
                                <Col className='text-center'>Статус</Col>
                            </Row>
                            {
                                historySell.length ?
                                historySell.map(item => {
                                    return(
                                        <HistoryItem
                                        email={item.userEmail}
                                        domain={item.domainName}
                                        date={item.orderDate}
                                        coinName={item.coinName}
                                        coinValue={item.coinValue}
                                        valueInUsdt={item.valueInUsdt}
                                        coinRate={item.coinRate}
                                        orderType={item.orderType}
                                        orderStatus={item.orderStatus}
                                        />
                                    )
                                }) : <h3>Нет активных ордеров</h3>
                            }
                        </Tab>
                    </Tabs>
                </AdminButtonCard>

            </Container>
        </>
    )
}

export default StaffTrading