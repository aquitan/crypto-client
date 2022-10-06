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
import AdminButton from '../../../components/UI/AdminButton/AdminButton';
import {ErrorMessage} from '@hookform/error-message';


const Deposit = ({coin, coinsBalance, coinFullName}) => {
    const {theme} = useThemeContext(ThemeContext)
    const [show, showModal, closeModal] = useModal()
    const [minimalSum, setMinimalSum] = useState(false)
    const [success = show, showSuccess = showModal, closeSuccess = closeModal] = useModal()
    const [depError = show, showError = showModal, closeError = closeModal] = useModal()
    const [fieldError = show, showFieldError = showModal, closeFieldError = closeModal] = useModal()
    const {notificationList, updateNotif} = useNotifContext(NotifContext)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [address, setAddress] = useState('')
    const [state, setState] = useState({
        value: 0,
        text: ''
    })
    const [balanceCoin, setBalanceCoin] = useState('BTC')
    const [balance, setBalance] = useState(0)
    const [limit, setLimit] = useState(0)
    const [coins, setCoins] = useState([])
    const [coinsFull, setCoinsFull] = useState([])
    const [history, setHistory] = useState([])
    const [historyModal, setHistoryModal] = useState(false)
    const [historyModalData, setHistoryModalData] = useState({
        date: '',
        usdAmount: '',
        cryptoAmount: '',
        coinName: '',
        address: '',
        status: ''
    })
    let btc = store.rates[coin.toLowerCase()]


    useEffect(() => {
        getBalance()
        setBalance(coinsBalance)
    }, [])

    const getHistoryDeposit = async () => {
        const res = await getData(`/deposit/get_deposit_history/${store.user.id}/${limit}/10`)
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
            coinName: coin.toLowerCase(),
            // coinFullName: coinFullName.toLowerCase(),
            // expiredTime: dateToTimestamp(d),
            // userEmail: store.user.email
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
        } else if (stateVal < store.domain.domainParams.minWithdrawalSum) {
            setMinimalSum(true)
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
    }

    const onShow = (date, usdAmount, cryptoAmount, coinName, address, status) => {
        setHistoryModalData({date, usdAmount, cryptoAmount, coinName, address, status})
        setHistoryModal(true)
    }

    useEffect(() => {
        getHistoryDeposit()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }


    return (
        <>
            <CustomModal show={minimalSum} handleClose={() => setMinimalSum(false)} title={'Minimal sum'} size={'md'}>
                You are under of a minimal sum of deposit!
            </CustomModal>

            <CustomModal show={historyModal} handleClose={() => setHistoryModal(false)} title={'Deposit details'} size={'md'}>
                <Row className='mb-2'>
                    <Col>
                        <b>Date:</b>
                    </Col>
                    <Col style={{fontSize: 14, color: 'grey'}}>
                        {historyModalData.date}
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <b>Address:</b>
                    </Col>
                    <Col style={{fontSize: 14, color: 'grey'}}>
                        {historyModalData.address}
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <b>Amount:</b>
                    </Col>
                    <Col style={{fontSize: 14, color: 'grey'}}>
                        {historyModalData.cryptoAmount} {historyModalData.coinName} ($<b>{historyModalData.usdAmount}</b>)
                    </Col>
                </Row>
            </CustomModal>

            <CustomModal
              title={'Success'}
              size='md'
              show={success}
              handleClose={closeSuccess}>
                Deposit was successful!
            </CustomModal>
            <CustomModal
              title={'Error'}
              show={depError}
              size='md'
              handleClose={closeError}>
                Something went wrong! Try again later...
            </CustomModal>
            <CustomModal
              title={'Error'}
              size='md'
              show={fieldError}
              handleClose={closeFieldError}>
                All fields must be fulfilled!
            </CustomModal>

            <CustomModal
                title={'No address'}
                show={show}
                size='md'
                handleClose={closeModal}>
                Please, generate address first before making deposit!
            </CustomModal>

            <ButtonCard theme={theme} style={{padding: 0}}>
                <Tabs
                    variant='pills'
                    defaultActiveKey='deposit'>
                    <Tab
                        tabClassName='content-tab'
                        eventKey='deposit'
                        title='Deposit'>
                        <Row className='mb-4 mt-3'>
                            <div className='p-0 mb-3' style={{wordBreak: 'break-word'}}>{address ? `Your address: ${address}` :
                                <Button classname={['btnSmall', 'btnGray']} onClick={getAddressForDeposit}>Generate address</Button>}</div>
                            {/*<Select {...register('coinName')} classname='transparent' options={statusOptions} />*/}

                            <div style={{padding: '20px 20px'}} className={cls.inputWrapper}>
                                        <span style={{display: 'flex', alignItems: 'center'}}>
                                            <Image src={`/home/crypto-client/client/public/img/${imgMatch(coin)}.svg`} height={30} width={30} />
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
                                <div>Coin balance: {balance ? coinsBalance.toFixed(5) : <Preloader />}</div>
                            </div>
                        </Row>
                        <Row className='mb-3 mt-3 p-0'>
                            <span style={{fontSize: 14, marginBottom: 10}}>Enter amount in USD</span>
                            <Input classname='inputTransparent' {...register('amount', {
                                required: 'Check the field',
                                // validate: (val) => {
                                //     return +val < +state.text
                                // }
                            })} placeholder='' onChange={onChange} value={state.text} />
                            <ErrorMessage  name='amount' errors={errors} render={() => <p className={cls.error}>Check the field</p>} />
                        </Row>
                        <Row className='mb-3 p-0'>
                            <span style={{fontSize: 14, marginBottom: 10}}>Value in Crypto</span>
                            <Input classname='inputTransparent' placeholder='Amount in Crypto' onChange={onChange} disabled value={state.value.toFixed(5)} />
                        </Row>
                        <i style={{fontSize: 12, color: 'grey'}}>Note: Minimum deposit amount is {store.domain.domainParams.minDepositSum} USD</i><br/>
                        <i style={{fontSize: 12, color: 'grey'}}>Note: Deposit fee is: {store.domain.domainParams.depositFee}%</i>
                        <Row className='mb-3 mt-3 justify-content-center'>
                            <Button style={{maxWidth: 200}} classname='btnBlue' onClick={handleSubmit(onSubmit)}>Submit</Button>
                        </Row>
                    </Tab>
                    <Tab
                        tabClassName='history-tab'
                        eventKey='history'
                        title='History'>
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
                        <Row className={'mb-3 mt-3'}>
                            {
                                history.length >= 10 ?
                                  <AdminButton onClick={onMore} classname={['xs', 'green']}>More</AdminButton>
                                  : null
                            }
                            {
                                limit > 0 ?
                                  <AdminButton onClick={onLess} classname={['xs', 'green']}>Back</AdminButton>
                                  : null
                            }
                        </Row>
                    </Tab>
                </Tabs>
            </ButtonCard>
        </>
    )
}

export default Deposit