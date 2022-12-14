import React, {useEffect, useState} from 'react'
import {Col, Modal, Row} from "react-bootstrap";
import InputRadio from "../../../components/UI/InputRadio/InputRadio";
import './SecureDeal.scss'
import Input from "../../../components/UI/Input/Input";
import TextArea from "../../../components/UI/TextArea/TextArea";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";
import Select from "../../../components/UI/Select/Select";
import {useForm} from "react-hook-form";
import Button from "../../../components/UI/Button/Button";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../styles/Error.module.scss";
import Table from "../../../components/UI/Table/Table";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import SecureDealTableItem from "./components/SecureDealTableItem/SecureDealTableItem";
import {useNavigate} from "react-router-dom";
import Form from "../../../components/UI/Form/Form";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {emailValidate} from "../../../utils/checkEmail";
import {deleteData, getData, patchData, postData, putData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {NotifContext, useNotifContext} from "../../../context/notifContext";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';
import CustomModal from '../../../components/CustomModal/CustomModal';
import {getCurrentDate} from '../../../utils/getCurrentDate';
import AdminButton from '../../../components/UI/AdminButton/AdminButton';
import {copyTextToClipboard} from '../../../utils/copyToClipboard';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import axios from 'axios';


const SecureDeal = () => {
    const {theme} = useThemeContext(ThemeContext)
    const {updateNotif} = useNotifContext(NotifContext)
    const [showSecure, setShowSecure] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorDate, setErrorDate] = useState(false)
    const [errorBalance, setErrorBalance] = useState(false)
    const [state, setState] = useState(false)
    const [limit, setLimit] = useState(0)
    const [history, setHistory] = useState([])
    const [balances, setBalances] = useState([])
    const [startDate, setStartDate] = useState()
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: 'onBlur'
    })
    const navigate = useNavigate()
    const options = [
        {value: 'BTC', text: 'BTC'},
        {value: 'ETH', text: 'ETH'},
        {value: 'BCH', text: 'BCH'},
        {value: 'USDT', text: 'USDT'},
        {value: 'TRX', text: 'TRX'},
        {value: 'SOL', text: 'SOL'},
        {value: 'TRX/USDT', text: 'TRX/USDT'},
    ]
    const tableHeader = ['Amount', 'Status', 'Action']

    const onSubmit = async (data) => {
        data.userEmail = store.user.email
        if (data.role === 'seller') {
            data.sellerEmail = store.user.email
            data.buyerEmail = data.secondPartyEmail
        } else {
            data.sellerEmail = data.secondPartyEmail
            data.buyerEmail = store.user.email
        }
        delete data.role
        data.status = 'pending'
        data.dealDedline = data.startDate / 1000
        data.currentDate = dateToTimestamp()
        data.userId = store.user.id
        data.amountInCrypto = +data.amountInCrypto

        let newArr = balances.filter(el => el.coinName === data.coinName)
        console.log('newarr', newArr);
        if (data.startDate / 1000 < dateToTimestamp()) {
            setErrorDate(true)
        } else {
            if (newArr[0].coinBalance > +data.amountInCrypto) {
                const res = await putData(getSwitchQuery('/personal_area/secure_deal/create_secure_deal/'), data)
                if (res.status === 200) {
                    setShowSecure(true)
                    getHistory()
                    updateNotif()
                }
            } else {
                setErrorBalance(true)
            }
        }

        
    }

    useEffect(() => {
        onFilter()
        getHistory()
        getBalanceForCheck()
    }, [])

    const getHistory = async () => {
        const res = await getData(`${getSwitchQuery('/personal_area/secure_deal/secure_deal_history/')}${store.user.email}`)
        // let history = res.data.history.filter(item => {
        //     if (dateToTimestamp() > item.dealDedline) {
        //         onMissDeadline(item._id, item.dealDedline)
        //     }
        //     return  dateToTimestamp() < item.dealDedline
        // })
        setHistory(res.data.history)
    }

    const onMissDeadline = async (id, deadline) => {
        const obj = {
            dealId: id,
            dedline: deadline
        }
        const res = await patchData(getSwitchQuery('/personal_area/secure_deal/secure_deal_detail/miss_dedline/'), obj)
    }

    const checkOnBlur = async (e) => {
        let obj = {
            userEmail: e.target.value,
            domainName: window.location.host,
            staffId: null
        }

        try {
            const res = await postData(getSwitchQuery('/second_party_user_checker/'), obj)

        } catch(e) {
            setErrorEmail(true)
        }
    }

    const onFilter = () => {

        console.log('history filter', history)
    }

    useEffect(() => {
        getHistory()
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

    const onChangeDate = (date) => {
        setStartDate(date)
        setValue('startDate', date)
    }

    const getBalanceForCheck = async () => {
        const res = await getData(`${getSwitchQuery('/get_user_balance/')}${store.user.id}`)
        setBalances(res.data)
    }

    return (
        <>

            <CustomModal btnClose={'Close'} show={errorEmail} handleClose={() => setErrorEmail(false)} size='md' title='Email error'>
                Participant email have not found!
            </CustomModal>

            <CustomModal btnClose={'Close'} show={errorDate} handleClose={() => setErrorDate(false)} size='md' title='Date error'>
                You can't set past date!
            </CustomModal>

            <CustomModal btnClose={'Close'} show={errorBalance} handleClose={() => setErrorBalance(false)} size='md' title='Balance error'>
                Insufficient of funds!
            </CustomModal>


            <CustomModal btnClose={'Close'} show={showSecure} handleClose={() => setShowSecure(false)} size='md' title='Secure deal'>
                Secure deal was created successfully!
                Please visit detail page of your secure deal.
            </CustomModal>

            <Row>
                <Col className='col-12 col-lg-8'>
                    <ButtonCard theme={theme}>
                        <Row className='text-center'>
                            <h2>Create new secure deal</h2>
                        </Row>
                        <Form classnames='wide-form' onSubmit={handleSubmit(onSubmit)}>
                            <Row className='mb-3 pb-2 secure_deal_row text-center'>
                                <h4 style={{color: theme === 'dark' ? '#fff' : 'grey'}} className='mb-3'>
                                    <span className='step'>01</span>
                                    Step 1: Choose your role</h4>
                                <p>You can buy or sell anything securely via our platform.</p>
                                <div className='secure_deal_col mb-3 d-flex justify-content-center'>
                                    <div className='p-0 py-4 text-center' style={{marginRight: 20}}>
                                        <InputRadio {...register('role', {
                                            required: 'Chose the role',
                                        })} img={'seller'} classname={['radio_btn', `${errors.role ? 'error' : ''}`]} id='seller' label='Seller' value='seller' name='role' />
                                        <ErrorMessage
                                          name='role'
                                          errors={errors}
                                          render={({message}) => <p className={error.error}>{message}</p>} />
                                    </div>
                                    <div className='p-0 py-4 text-center'>
                                        <InputRadio {...register('role', {
                                            required: 'Chose the role',
                                        })} img={'buyer'} classname={['radio_btn', `${errors.role ? 'error' : ''}`]} label='Buyer' id='buyer' value='buyer' name='role' />
                                        <ErrorMessage
                                          name='role'
                                          errors={errors}
                                          render={({message}) => <p className={error.error}>{message}</p>} />
                                    </div>
                                </div>
                            </Row>
                            <Row className='mb-3 pb-2 justify-content-center'>
                                <Col className='text-center'>
                                    <h4 style={{color: theme === 'dark' ? '#fff' : 'grey'}} className='mb-3'>
                                        <span className='step'>02</span>
                                        Step 2: Participant</h4>
                                    <p>Please enter username or email of another participant. User should have account at localhost</p>
                                    <Input classname={['inputTransparent', `${errors.secondPartyEmail ? 'error' : ''}`]} {...register('secondPartyEmail', {
                                        required: 'You must specify email',
                                        validate: emailValidate,
                                        message: 'Email is not valid',
                                        onBlur: (e) => checkOnBlur(e)
                                    })} placeholder='Second party email' />
                                    <ErrorMessage
                                      name='secondPartyEmail'
                                      errors={errors}
                                      render={({message}) => <p className={error.error}>{message}</p>} />
                                </Col>
                            </Row>
                            <Row className='mb-3 pb-2'>
                                <Col className='text-center'>
                                    <h4 style={{color: theme === 'dark' ? '#fff' : 'grey'}} className='mb-3'>
                                        <span className='step'>03</span>
                                        Step 3: Deal conditions</h4>
                                    <p>Please describe all aspects of the deal as accurately as possible.
                                        Do not use special professional vocabulary,
                                        they must be clear to the third party, a Guarantor.
                                        The resolution of possible disputes will depend on this.</p>
                                    <TextArea {...register('dealCondition', {
                                        required: 'Deal conditions are required',
                                    })} rows={10} classname={['textareaTransparent', `${errors.dealCondition ? 'error' : ''}`]} placeholder='Deal conditions' />
                                    <ErrorMessage
                                      name='dealCondition'
                                      errors={errors}
                                      render={({message}) => <p className={error.error}>{message}</p>} />
                                </Col>
                            </Row>
                            <Row className='pb-2'>
                                <Col className='col-12 col-md-6 mb-3'>
                                    <DatePickert
                                      required
                                      customInput={<DatePickerCustom {...register('startDate', {
                                          required: 'Date is required'
                                      })} classname={['inputTransparent', `${errors.startDate ? 'error' : ''}`]}/>}
                                      placeholderText='Date'
                                      selected={startDate}
                                      dateFormat='yyyy/MM/dd'
                                      onChange={(date) => onChangeDate(date)} />
                                    <ErrorMessage
                                      name='startDate'
                                      errors={errors}
                                      render={({message}) => <p className={error.error}>{message}</p>} />
                                </Col>
                                <Col className='col-12 col-md-6 mb-3'>
                                    <Select {...register('coinName', {
                                        required: 'This field is required',
                                    })} options={options} classname={['selectTransparent', `${errors.amountInCrypto ? 'error' : ''}`]} />
                                    <ErrorMessage
                                      name='coinName'
                                      errors={errors}
                                      render={({message}) => <p className={error.error}>{message}</p>} />
                                </Col>
                            </Row>
                            <Row className='mb-3 pb-2'>
                                <Col>
                                    <Input classname={['inputTransparent', `${errors.amountInCrypto ? 'error' : ''}`]} {...register('amountInCrypto', {
                                        required: 'Check the value',
                                        pattern: /^[0-9]+$/
                                    })} placeholder='Amount'/>
                                    <ErrorMessage
                                      name='amountInCrypto'
                                      errors={errors}
                                      render={({message}) => <p className={error.error}>{message ? message : 'Check value'}</p>} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <Button style={{padding: '0 20px'}} classname='btnBlue'>Create secure deal</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-lg-4'>
                    <ButtonCard theme={theme}>
                        <h2>Recent deals</h2>
                        <Row>
                            <Table>
                                <TableBody>
                                    {
                                        history.length ?
                                          history.map(item => {
                                              return <SecureDealTableItem
                                                key={item._id}
                                                classname={'table_item_small'}
                                                amount={item.amountInCrypto}
                                                status={item.status}
                                                coin={item.coinName}
                                                buyer={item.buyer}
                                                seller={item.seller}
                                                onClick={() => navigate(`/secure-deal/${item._id}`)}/>
                                          })
                                          : <h4 className='text-center my-4' style={{color: '#cecece'}}>No deals!</h4>
                                    }

                                </TableBody>
                            </Table>
                        </Row>
                        <Row className={'mb-3 mt-3'}>
                            {
                                history.length >= 10 ?
                                  <AdminButton onClick={onMore} classname={['xs', 'green']}>More</AdminButton>
                                  : null
                            }
                            {
                                limit > 0 ?
                                  <AdminButton onClick={onLess} classname={['xs', 'green']}>Less</AdminButton>
                                  : null
                            }
                        </Row>
                    </ButtonCard>
                </Col>
            </Row>


        </>
    )
}

export default SecureDeal