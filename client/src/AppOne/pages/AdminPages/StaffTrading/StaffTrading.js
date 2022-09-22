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

const StaffTrading = () => {
    const {register, handleSubmit} = useForm()
    const [historyBuy, setHistoryBuy] = useState([])
    const [historySell, setHistorySell] = useState([])
    const [ratesData, setRatesData] = useState([])
    const [activeDomains, setActiveDomains] = useState([])
    const [currentDomain, setCurrentDomain] = useState(window.location.host)

    useEffect(() => {
        getHistory()
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

        await patchData('/staff/trading/update_coin_rate/', obj)
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
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                    <Tab eventKey="buy" title="Buy">
                        <Row className='mb-3'>
                            <Col>Email</Col>
                            <Col>Домен</Col>
                            <Col>Дата</Col>
                            <Col>Монета</Col>
                            <Col>Сумма Монеты</Col>
                            <Col>Сумма USDT</Col>
                            <Col>Рейт</Col>
                            <Col>Статус</Col>
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
                    <Tab eventKey="sell" title="Sell">
                        <Row className='mb-3'>
                            <Col>Email</Col>
                            <Col>Домен</Col>
                            <Col>Дата</Col>
                            <Col>Монета</Col>
                            <Col>Сумма Монеты</Col>
                            <Col>Сумма USDT</Col>
                            <Col>Рейт</Col>
                            <Col>Статус</Col>
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
    )
}

export default StaffTrading