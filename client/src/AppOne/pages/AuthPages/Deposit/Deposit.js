import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import {store} from "../../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData, postData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import TableItemUser from "../../../components/UI/TableItemUser/TableItemUser";
import {SwalSimple} from "../../../utils/SweetAlert";
import {getGeoData} from "../../../queries/getSendGeoData";
import cls from "../Withdraw/Withdraw.module.scss";
import Image from "../../../components/UI/Image/Image";
import {imgMatch} from "../../../utils/imgMatch";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {useLocation} from "react-router-dom";

const Deposit = () => {
    const {register, handleSubmit} = useForm()
    const [address, setAddress] = useState('')
    const [state, setState] = useState({
        value: 0,
        text: ''
    })
    const [balanceCoin, setBalanceCoin] = useState('BTC')
    const [balance, setBalance] = useState(0)
    const [coins, setCoins] = useState([])
    const [coinsFull, setCoinsFull] = useState([])
    const [history, setHistory] = useState()
    let btc = 38500
    const location = useLocation()

    useEffect(() => {
        getHistoryDeposit()
        // getBalance()
        getAddressForDeposit()
        setBalance(location.state.coinsBalance)
    }, [])

    const getHistoryDeposit = async () => {
        const res = await getData(`/deposit/get_deposit_history/${store.user.id}/3/10`)
        const reversedLogs = res.data.depositHistory.slice(0).reverse()
        setHistory(reversedLogs)
    }
    const getBalances = async () => {
        const obj = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            coinName: location.state.coin
        }
        const res = postData('/staff/balances/check_address_balance/', obj)
    }

    const getAddressForDeposit = async () => {
        let d = new Date();
        d.setMinutes(d.getMinutes() + 30 );

        const obj = {
            userId: store.user.id,
            coinName: location.state.coin,
            coinFullName: 'bitcoin',
            expiredTime: dateToTimestamp(d),
            userEmail: store.user.email
        }
        const res = await postData('/get_address_for_deposit/', obj)
    }


    const setValue = (val) => {
        let calc = +val / btc
        setState({text: val, value: calc})
    }
    const onSubmit = async (data, e) => {
        e.preventDefault()
        data.value = state.value
        let geoData = await getGeoData()

        let stateVal = +state.text

        const obj = {
            userId: store.user.id,
            userEmail: store.userEmail,
            domainName: window.location.host,
            coinName: balanceCoin,
            amountInCrypto: +state.value.toFixed(5),
            amountInUsd: stateVal.toFixed(5),
            currentDate: dateToTimestamp(),
            depositAddress: 'address',
            depositStatus: 'pending',
            logTime: getCurrentDate(dateToTimestamp()),
            ipAddress: geoData.ipAddress,
            city: geoData.city,
            browser: geoData.browser,
            countryName: geoData.countryName,
            coordinates: geoData.coordinates
        }
        const res = await putData('/deposit/make_deposit/', obj)
        if (!res.status === 400) {
            getHistoryDeposit()
        } else {
            SwalSimple('Something went wrong! Try again later...')
        }
    }
    const onChange = (e) => {
        let calc = +e.target.value / btc
        setState({text: e.target.value, value: calc})
    }
    // const getBalance = async () => {
    //     const res = await getData(`/get_user_balance/${store.user.id}`)
    //     let arr = []
    //     res.data.forEach(item => {
    //         let obj = {
    //             value: item.coinName,
    //             text: item.coinName,
    //             fullName: item.coinFullName
    //         }
    //         arr.push(obj)
    //     })
    //     setCoins(arr)
    //     setCoinsFull(res.data)
    //     setBalance(res.data[0].coinBalance)
    //     console.log('res balance', res.data)
    // }
    const onValChange = (e) => {
        let target = e.target.value
        let balanceAmount = 0
        setBalanceCoin(e.target.value)
        coinsFull.filter(el => {
            if (el.coinName === target) {
                balanceAmount = el.coinBalance.toFixed(5)
                return balanceAmount
            }
        })
        setBalance(balanceAmount)
        console.log('balance coin', coins)
    }

    return (
        <>
            {
                !address ?
                    <Container>
                        <Row className='justify-content-center'>
                            <Col className='col-12 col-md-4'>
                                <ButtonCard title={'Generate address'}>
                                    <Button onClick={() => setAddress('skjdbfkjsbdkfbsdkbfksd')}>Generate</Button>
                                </ButtonCard>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Container>
                        <Row>
                            <Col className='col-12 col-lg-6 mb-3'>
                                <ButtonCard>
                                    <h2 className='mb-3'>Deposit</h2>
                                    <Row className='mb-3'>
                                        <p>Address: {address}</p>
                                        {/*<Select {...register('coinName')} classname='transparent' options={statusOptions} />*/}

                                        <Col>
                                            <div style={{padding: '20px 20px', borderRadius: '20px'}} className={cls.inputWrapper}>
                                        <span style={{display: 'flex', alignItems: 'center'}}>
                                            <Image src={`/img/${imgMatch(location.state.coin)}.svg`} height={30} width={30} />
                                            {/*{*/}
                                            {/*    coins.length ?*/}
                                            {/*        <span>*/}
                                            {/*            {location.state.coin}*/}
                                            {/*        </span>*/}
                                            {/*        // <Select*/}
                                            {/*        //     value={balanceCoin}*/}
                                            {/*        //     onChange={e => onValChange(e)}*/}
                                            {/*        //     classname={['transparent', 'borderLess']}*/}
                                            {/*        //     options={coins} />*/}
                                            {/*        : <Preloader/>*/}
                                            {/*}*/}
                                            <span>
                                                {location.state.coin}
                                            </span>
                                        </span>
                                                <div>Coin balance: {balance}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <p>Choose Quick Amount to Deposit</p>
                                        <div className='d-flex flex-column'>
                                            <Row className=''>
                                                <Col className='col-12 col-sm-4 mb-3'>
                                                    <Button onClick={() => setValue(500)}>500</Button>
                                                </Col>
                                                <Col className='col-12 col-sm-4 mb-3'>
                                                    <Button onClick={() => setValue(1000)}>1000</Button>
                                                </Col>
                                                <Col className='col-12 col-sm-4 mb-3'>
                                                    <Button onClick={() => setValue(1500)}>1500</Button>
                                                </Col>
                                            </Row>
                                            <Row className=''>
                                                <Col className='col-12 col-sm-6 mb-3'>
                                                    <Button onClick={() => setValue(5000)}>5000</Button>
                                                </Col>
                                                <Col className='col-12 col-sm-6 mb-3'>
                                                    <Button onClick={() => setValue(10000)}>10000</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Row>
                                    <Row className='mb-3'>
                                        <span>Or Enter Your Amount</span>
                                        <Input placeholder='' onChange={onChange} value={state.text} />
                                    </Row>
                                    <Row className='mb-3'>
                                        <span>Amount in Crypto</span>
                                        <Input placeholder='' onChange={onChange} disabled value={state.value} />
                                    </Row>
                                    <span style={{fontSize: 12}}>Note: Minimum deposit amount is {store.domain.domainParams.minDepositSum} USD</span>
                                    <span style={{fontSize: 12}}>Note: Deposit fee is: {store.domain.domainParams.depositFee}%</span>
                                    <Row className='mb-3 mt-3 justify-content-center'>
                                        <Col className='col-6'>
                                            <Button classname='user-green' onClick={handleSubmit(onSubmit)}>Submit</Button>
                                        </Col>
                                    </Row>
                                </ButtonCard>
                            </Col>
                            <Col className='col-12 col-lg-6 mb-3'>
                                <ButtonCard>
                                    <h2 className='mb-3'>History</h2>
                                    <Row style={{padding: '10px', borderBottom: '1px solid #fff' }}>
                                        <Col className={'text-center'}>Date</Col>
                                        <Col className={'text-center'}>Amount</Col>
                                        <Col className={'text-center'}></Col>
                                    </Row>

                                    <div style={{maxHeight: 400, overflowY: 'auto', height: '100%'}}>
                                        {
                                            history ?
                                                history.map(item => {
                                                    return (
                                                        <TableItemUser
                                                            date={getCurrentDate(item.date)}
                                                            usdAmount={item.usdAmount}
                                                            cryptoAmount={item.cryptoAmount}
                                                            coinName={item.coinName}
                                                            status={item.status}
                                                        />
                                                    )
                                                })
                                                : <h3>No data</h3>

                                        }
                                    </div>
                                </ButtonCard>
                            </Col>
                        </Row>
                    </Container>
            }


        </>
    )
}

Deposit.propTypes = {
    
}
Deposit.defaultProps = {
    
}

export default Deposit