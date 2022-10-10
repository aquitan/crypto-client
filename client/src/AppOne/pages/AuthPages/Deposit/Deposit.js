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
import {copyTextToClipboard} from '../../../utils/copyToClipboard';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const Deposit = ({coin, coinsBalance, coinFullName}) => {
    const {theme} = useThemeContext(ThemeContext)
    const [show, showModal, closeModal] = useModal()
    const [minimalSum, setMinimalSum] = useState(false)
    const [success = show, showSuccess = showModal, closeSuccess = closeModal] = useModal()
    const [depError = show, showError = showModal, closeError = closeModal] = useModal()
    const [fieldError = show, showFieldError = showModal, closeFieldError = closeModal] = useModal()
    const {notificationList, updateNotif} = useNotifContext(NotifContext)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onChange"
    })
    const [address, setAddress] = useState('')
    const [state, setState] = useState({
        value: 0,
        text: ''
    })
    const [balance, setBalance] = useState(0)
    const [limit, setLimit] = useState(0)
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

    const getAddressForDeposit = async () => {
        let d = new Date();
        d.setMinutes(d.getMinutes() + 30 );

        const obj = {
            userId: store.user.id,
            coinName: coin.toLowerCase(),
        }
        const res = await postData('/get_address_for_deposit/', obj)
        setAddress(res.data.address)
    }

    console.log('deposit coin', coin)


    const onSubmit = async (data, e) => {
        e.preventDefault()
        data.value = state.value
        let geoData = await getGeoData()

        const obj = {
            userId: store.user.id,
            userEmail: store.userEmail,
            domainName: window.location.host,
            coinName: coin,
            coinFullName: coinFullName,
            amountInCrypto: Number(data.crypto).toFixed(5),
            amountInUsd: Number(data.amount).toFixed(5),
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
        } else if (data.amount < store.domain.domainParams.minWithdrawalSum) {
            setMinimalSum(true)
        } else {
            if (data.crypto > 0) {
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

    const onChangeCrypto = (e) => {
        setValue('amount', isNaN((e.target.value * store.rates[coin.toLowerCase()]).toFixed(5)) ? 'Only numbers allowed' : (e.target.value * store.rates[coin.toLowerCase()]).toFixed(5) )
    }
    const onChangeUsd = (e) => {
        setValue('crypto', isNaN((e.target.value / store.rates[coin.toLowerCase()]).toFixed(5)) ? 'Only numbers allowed' : (e.target.value / store.rates[coin.toLowerCase()]).toFixed(5) )
    }
    const getBalance = async () => {
        const res = await getData(`/get_user_balance/${store.user.id}`)
        setBalance(res.data.filter(item => item.coinName === coin))
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

    const onCopy = () => {
        copyTextToClipboard(historyModalData.address)
    }


    return (
        <>
            <CustomModal btnClose={'Close'} show={minimalSum} handleClose={() => setMinimalSum(false)} title={'Minimal sum'} size={'md'}>
                You are under of a minimal sum of deposit!
            </CustomModal>

            <CustomModal btnClose={'Close'} show={historyModal} handleClose={() => setHistoryModal(false)} title={'Deposit details'} size={'md'}>
                <Row className='mb-2 d-flex justify-content-center'>
                    <div className='text-center'>
                        <b>Date:</b>
                    </div>
                    <div className='text-center' style={{fontSize: 14, color: 'grey'}}>
                        {historyModalData.date}
                    </div>
                </Row>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Address:</b>
                    </div>
                    <div className='text-center' onClick={onCopy} style={{fontSize: 14, color: 'grey', cursor: 'pointer'}}>
                        <FontAwesomeIcon
                          style={{marginRight: 10}}
                          icon={faCopy} />
                        {historyModalData.address}
                    </div>
                </Row>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Amount:</b>
                    </div>
                    <div className='text-center' style={{fontSize: 14, color: 'grey'}}>
                        {historyModalData.cryptoAmount} {historyModalData.coinName} ($<b>{historyModalData.usdAmount}</b>)
                    </div>
                </Row>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Status:</b>
                    </div>
                    <div className='text-center' style={{fontSize: 14, color: 'grey'}}>
                        {historyModalData.status}
                    </div>
                </Row>
            </CustomModal>

            <CustomModal
              btnClose={'Close'}
              title={'Success'}
              size='md'
              show={success}
              handleClose={closeSuccess}>
                Deposit was successful!
            </CustomModal>
            <CustomModal
              btnClose={'Close'}
              title={'Error'}
              show={depError}
              size='md'
              handleClose={closeError}>
                Something went wrong! Try again later...
            </CustomModal>
            <CustomModal
              btnClose={'Close'}
              title={'Error'}
              size='md'
              show={fieldError}
              handleClose={closeFieldError}>
                All fields must be fulfilled!
            </CustomModal>

            <CustomModal
                btnClose={'Close'}
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
                                            <Image src={`${window.location.origin}/img/${imgMatch(coin === 'TRC 20' ? 'usdt' : coin ).toLowerCase()}.svg`} height={30} width={30} />
                                            <span>
                                                {coin === 'TRC 20' ? 'USDT (TRC 20)' : coin === 'USDT' ? 'USDT (ERC 20)' : coin}
                                            </span>
                                        </span>
                                <div>Balance: {balance ? coinsBalance.toFixed(5) : <Preloader />}</div>
                            </div>
                        </Row>
                        <Row className='mb-3 p-0'>
                            <span style={{fontSize: 14, marginBottom: 10}}>Enter amount in Crypto</span>
                            <Input classname={['inputTransparent', `${errors.crypto ? 'error' : ''}`]} placeholder='0.00' {...register('crypto', {
                                required: true,
                                pattern: /^[1-9]\d*(\.\d+)?$/,
                                onChange: (val) => onChangeCrypto(val)
                            })}/>
                            <ErrorMessage  name='crypto' errors={errors} render={() => <p className={cls.error}>Check the field</p>} />
                        </Row>
                        <Row className='mb-3 mt-3 p-0'>
                            <span style={{fontSize: 14, marginBottom: 10}}>Enter amount in USD</span>
                            <Input classname={['inputTransparent', `${errors.amount ? 'error' : ''}`]} {...register('amount', {
                                required: 'Check the field',
                                pattern: /^[1-9]\d*(\.\d+)?$/,
                                onChange: (val) => onChangeUsd(val)
                            })} placeholder='0.00' />
                            <ErrorMessage name='amount' errors={errors} render={() => <p className={cls.error}>Check the field</p>} />
                        </Row>
                        <i style={{fontSize: 12, color: 'grey'}}>Note: Minimum deposit amount is {store.domain.domainParams.minDepositSum} USD</i><br/>
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
                            <Col className={'text-center'}>Details</Col>
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