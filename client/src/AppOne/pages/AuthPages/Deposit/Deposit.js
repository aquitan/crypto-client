import React, {useEffect, useState} from 'react'
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import {store} from "../../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData, postData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import TableItemUser from "../../../components/UI/TableItemUser/TableItemUser";
import {getGeoData} from "../../../queries/getSendGeoData";
import cls from "../Withdraw/Withdraw.module.scss";
import Image from "../../../components/UI/Image/Image";
import {imgMatch} from "../../../utils/imgMatch";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {useLocation} from "react-router-dom";
import {NotifContext, useNotifContext} from "../../../context/notifContext";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import {useModal} from "../../../hooks/useModal";
import CustomModal from "../../../components/CustomModal/CustomModal";
import '../InternalSwap/InternalSwapTabs.scss'


const Deposit = ({coin, coinsBalance, coinFullName}) => {
    const {theme} = useThemeContext(ThemeContext)
    const [show, showModal, closeModal] = useModal()
    const [success = show, showSuccess = showModal, closeSuccess = closeModal] = useModal()
    const [depError = show, showError = showModal, closeError = closeModal] = useModal()
    const [fieldError = show, showFieldError = showModal, closeFieldError = closeModal] = useModal()
    const {notificationList, updateNotif} = useNotifContext(NotifContext)
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
    const [history, setHistory] = useState([])
    let btc = store.rates[coin.toLowerCase()]
    console.log('rate', btc);


    useEffect(() => {
        getHistoryDeposit()
        getBalance()
        setBalance(coinsBalance)
    }, [])

    const getHistoryDeposit = async () => {
        const res = await getData(`/deposit/get_deposit_history/${store.user.id}/0/10`)
        if (typeof res.data.depositHistory !== 'string') {
            const reversedLogs = res.data.depositHistory.slice(0).reverse()
            setHistory(reversedLogs)
        } else {
            setHistory(res.data.depositHistory)
        }

    }
    const getBalances = async () => {
        const obj = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            coinName: coin
        }
        const res = postData('/staff/balances/check_address_balance/', obj)
    }

    const getAddressForDeposit = async () => {
        let d = new Date();
        d.setMinutes(d.getMinutes() + 30 );

        const obj = {
            userId: store.user.id,
            coinName: coin,
            coinFullName: coinFullName,
            expiredTime: dateToTimestamp(d),
            userEmail: store.user.email
        }
        const res = await postData('/get_address_for_deposit/', obj)
        setAddress(res.data.address)
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
            coinFullName: coinFullName,
            amountInCrypto: +state.value.toFixed(5),
            amountInUsd: stateVal.toFixed(5),
            currentDate: dateToTimestamp(),
            depositAddress: address,
            depositStatus: 'pending',
            logTime: getCurrentDate(dateToTimestamp()),
            ipAddress: geoData.ipAddress,
            city: geoData.city,
            browser: geoData.browser,
            countryName: geoData.countryName,
            coordinates: geoData.coordinates
        }
        if (!address) {
            showModal(true)
        } else {
            if (state.value > 0) {
                const res = await putData('/deposit/make_deposit/', obj)
                updateNotif()
                if (res.status === 201) {
                    getHistoryDeposit()
                    showSuccess(true)
                } else {
                    showError(true)
                }
            } else {
                showFieldError(true)
            }

        }


    }
    const onChange = (e) => {
        let calc = +e.target.value / btc
        setState({text: e.target.value, value: calc})
    }
    const getBalance = async () => {
        const res = await getData(`/get_user_balance/${store.user.id}`)
        setBalance(res.data.filter(item => item.coinName === coin))
    }
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

    const onShow = (date, usdAmount, cryptoAmount, coinName, address, status) => {

    }


    return (
        <>

            <CustomModal
              title={'Success'}
              text={'Deposit was successful!'}
              show={success}
              handleClose={closeSuccess} />
            <CustomModal
              title={'Error'}
              text={'Something went wrong! Try again later...'}
              show={depError}
              handleClose={closeError} />
            <CustomModal
              title={'Error'}
              text={'All fields must be fulfilled!'}
              show={fieldError}
              handleClose={closeFieldError} />

            <CustomModal
                title={'No address'}
                text={'Please, generate address first before making deposit!'}
                show={show}
                handleClose={closeModal} />

            <ButtonCard theme={theme} style={{padding: 0}}>
                <Tabs
                    variant='pills'
                    defaultActiveKey='deposit'>
                    <Tab
                        tabClassName='content-tab'
                        eventKey='deposit'
                        title='Deposit'>
                        <Row className='mb-3 mt-3'>
                            <div className='p-0 mb-2'>{address ? `Your address: ${address}` :
                                <Button classname={['btnSmall', 'btnGray']} onClick={getAddressForDeposit}>Generate address</Button>}</div>
                            {/*<Select {...register('coinName')} classname='transparent' options={statusOptions} />*/}

                            <div style={{padding: '20px 20px'}} className={cls.inputWrapper}>
                                        <span style={{display: 'flex', alignItems: 'center'}}>
                                            <Image src={`/img/${imgMatch(coin)}.svg`} height={30} width={30} />
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
                                                {coin}
                                            </span>
                                        </span>
                                <div>Coin balance: {balance ? balance[0].coinBalance.toFixed(5) : <Preloader />}</div>
                            </div>
                        </Row>
                        <Row className='mb-3 p-0'>
                            <span>Or Enter Your Amount</span>
                            <Input classname='inputTransparent' placeholder='' onChange={onChange} value={state.text} />
                        </Row>
                        <Row className='mb-3 p-0'>
                            <span>Amount in Crypto</span>
                            <Input classname='inputTransparent' placeholder='Amount in Crypto' onChange={onChange} disabled value={state.value} />
                        </Row>
                        <span style={{fontSize: 12}}>Note: Minimum deposit amount is {store.domain.domainParams.minDepositSum} USD</span>
                        <span style={{fontSize: 12}}>Note: Deposit fee is: {store.domain.domainParams.depositFee}%</span>
                        <Row className='mb-3 mt-3 justify-content-center'>
                            <Button style={{maxWidth: 200}} classname='btnBlue' onClick={handleSubmit(onSubmit)}>Submit</Button>
                        </Row>
                    </Tab>
                    <Tab
                        tabClassName='history-tab'
                        eventKey='history'
                        title='history'>
                        <Row style={{padding: '10px', borderBottom: '1px solid #fff' }}>
                            <Col className={'text-center'}>Date</Col>
                            <Col className={'text-center'}>Amount</Col>
                            <Col className={'text-center'}></Col>
                        </Row>

                        <div style={{maxHeight: 400, overflowY: 'auto', height: '100%'}}>
                            {
                                typeof history !== 'string' ?
                                    history.map(item => {
                                        return (
                                            <TableItemUser
                                                key={item._id}
                                                address={item.address}
                                                onShow={onShow}
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
                    </Tab>
                </Tabs>
            </ButtonCard>
        </>
    )
}

Deposit.propTypes = {
    
}
Deposit.defaultProps = {
    
}

export default Deposit