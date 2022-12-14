import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../styles/Error.module.scss";
import TextArea from "../../../components/UI/TextArea/TextArea";
import Select from "../../../components/UI/Select/Select";
import {optionsCurrency} from "../../../utils/staffConstants";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {deleteData, patchData, postData, putData} from "../../../services/StaffServices";
import {useNavigate} from "react-router-dom";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import CustomModal from '../../../components/CustomModal/CustomModal';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

const AdminSecureDeal = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const [history, setHistory] = useState([])
    const [limit, setLimit] = useState(0)
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalError, setModalError] = useState(false)
    const styles = {
        todayBtn: {
            position: 'absolute',
            backgroundColor: '#444',
            paddingLeft: 10,
            top: 0,
            right: 20,
            height: '45px',
            borderLeft: '1px solid #fff',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box'
        }
    }
    const trsType = [
        {value: 'Deposit', text: '??????????????'},
        {value: 'Withdraw', text: '??????????'}
    ]

    const onSubmit = async (data) => {

        data.status = false
        data.dealDedline = dateToTimestamp(startDate)
        data.currentDate = dateToTimestamp()
        data.userId = store.fullAccess ? '1' : store.user.id
        data.amountInCrypto = +data.amountInCrypto
        data.userEmail = store.user.email
        if (data.buyerEmail === store.user.email) {
            data.secondPartyEmail = data.sellerEmail
        } else if (data.sellerEmail === store.user.email) {
            data.secondPartyEmail = data.buyerEmail
        }
        data.rootAccess = store.fullAccess
        try {
            const res = await putData('/personal_area/secure_deal/create_secure_deal/', data)
            getHistory()
            setModalSuccess(true)
        } catch(e) {
            setModalError(true)
        }
    }
    const onToday = () => {
        setStartDate(new Date())
    }
    const onNowTime = () => {
        let time = new Date()
        setTimeDate(time)
    }

    const getHistory = async () => {
        const obj = {
            staffId: store.fullAccess ? '1' : store.user.id,
            rootAccess: store.fullAccess,
            skipValue: limit,
            limitValue: 10
        }
        const res = await postData(`/staff/secure_deal/secure_deal_history/`, obj)
        if (res.data.history !== 'empty list') {
            setHistory(res.data.history.filter(item => {
                if (dateToTimestamp() > item.dealDedline) {
                    onMissDeadline(item._id, item.dealDedline)
                }
                return  dateToTimestamp() < item.dealDedline
            }))
        }
    }

    const onMissDeadline = async (id, deadline) => {
        const obj = {
            dealId: id,
            dedline: deadline
        }
        const res = await patchData(getSwitchQuery('/personal_area/secure_deal/secure_deal_detail/miss_dedline/'), obj)
    }

    const deleteSecureDeal = async (id) => {
        const res = await deleteData(`${getSwitchQuery('/personal_area/secure_deal/secure_deal_detail/delete_deal/')}${id}`)
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

    return (
        <Container>

            <CustomModal size={'md'} show={modalSuccess} handleClose={() => setModalSuccess(false)} themeDark={true} btnClose='Ok' title='??????????????'>
                ???????????? ?????????????? ??????????????!
            </CustomModal>
            <CustomModal size={'md'} show={modalError} handleClose={() => setModalError(false)} themeDark={true} btnClose='Ok' title='????????????'>
                ??????! ??????-???? ?????????? ???? ??????! ???????????????????? ??????????!
            </CustomModal>


            <AdminButtonCard>
                <h1 className={'text-center'}>???????????????????? ????????????</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className={'mb-3'}>
                        <Col className='col-12 col-md-6 mb-2'>
                            <AdminInput {...register('buyerEmail', {
                                required: true,
                                pattern: /^[^??-????]+$/iu
                            })} placeholder='Buyer'/>
                            <ErrorMessage  name='buyerEmail' errors={errors} render={() => <p className={error.error}>???????????? ???????????????????? ??????????</p>} />
                        </Col>
                        <Col className='col-12 col-md-6 mb-2'>
                            <AdminInput {...register('sellerEmail', {
                                required: true,
                                pattern: /^[^??-????]+$/iu
                            })} placeholder='Seller'/>
                            <ErrorMessage  name='sellerEmail' errors={errors} render={() => <p className={error.error}>???????????? ???????????????????? ??????????</p>} />
                        </Col>
                    </Row>

                    <Row className={'mb-3'}>
                        <Col>
                            <TextArea {...register('dealCondition')} classname={['dark', 'textarea_square']} rows='10' placeholder='Conditions'/>
                        </Col>
                    </Row>

                    <Row className='mb-3 flex-items'>

                        <Col className='col-12 col-lg-3 mb-3'>
                            <Select {...register('coinName')} classname={'admin-square'} options={optionsCurrency}/>
                        </Col>

                        <Col className='col-12 col-lg-3 mb-3'>
                            <AdminInput {...register('amountInCrypto')} placeholder='??????????' />
                        </Col>
                        <Col className='col-12 col-lg-3 mb-3' style={{position: 'relative'}}>
                            <DatePickert required
                                         customInput={<DatePickerCustom classname='adminDatepicker' />}
                                         placeholderText={'????????'}
                                         selected={startDate}
                                         dateFormat='yyyy/MM/dd'
                                         todayButton="Today"
                                         onChange={(date) => setStartDate(date)} />
                            <span style={styles.todayBtn} onClick={onToday}>Today</span>
                        </Col>
                        <Col className='col-12 col-lg-3 mb-3' style={{position: 'relative'}}>
                            <DatePickert required
                                         customInput={<DatePickerCustom classname='adminDatepicker' />}
                                         placeholderText='??????????'
                                         selected={timeDate}
                                         onChange={(date) => setTimeDate(date)}
                                         showTimeSelect
                                         showTimeSelectOnly
                                         timeIntervals={1}
                                         timeCaption="Time"
                                         dateFormat="HH:mm"/>
                            <span style={styles.todayBtn} onClick={onNowTime}>Now</span>
                        </Col>
                    </Row>
                    <Row>
                        <AdminButton classname={'green'}>??????????????</AdminButton>
                    </Row>
                </Form>
            </AdminButtonCard>

            <AdminButtonCard>
                <h2>?????????????? ????????????</h2>
                <Row>
                    <Row style={{borderBottom: '1px solid #fff', padding: '10px 0'}}>
                        <Col className='d-none d-md-block'>Time</Col>
                        <Col className='d-none d-md-block'>User</Col>
                        <Col className='d-none d-md-block'>Info</Col>
                        <Col className='d-none d-md-block'>Action</Col>
                    </Row>
                    {
                        history.length ?
                            history.map(item => {
                                return (
                                    <Row className='flex-column flex-md-row' style={{borderBottom: '1px solid #fff', marginBottom: 10, padding: '10px 0'}}>
                                        <Col className='mb-2 mb-md-0 text-center text-md-start'>
                                            <b style={{fontSize: 16, textDecoration: 'underline'}}>???????? ????????????????</b>: {getCurrentDate(item.dateOfCreate)} <br/>
                                            <b style={{fontSize: 16, textDecoration: 'underline'}}>??????????????</b>: {getCurrentDate(item.dealDedline)}
                                        </Col>
                                        <Col className='mb-2 mb-md-0 text-center text-md-start'>
                                            <b style={{fontSize: 16, textDecoration: 'underline'}}>Seller</b>: {item.seller} <br/>
                                            <b style={{fontSize: 16, textDecoration: 'underline'}}>Buyer</b>: {item.buyer}
                                        </Col>
                                        <Col className='mb-2 mb-md-0 text-center text-md-start'>
                                            <b style={{fontSize: 16, textDecoration: 'underline'}}>Amount</b>: {item.amountInCrypto} {item.coinName}<br/>
                                            <b style={{fontSize: 16, textDecoration: 'underline'}}>Status</b>: {item.status ? 'Complete' : 'Pending'}<br/>
                                        </Col>
                                        <Col>
                                            <Row className='justify-content-center'>
                                                <Col className='mb-1 text-center'>
                                                    <AdminButton classname={'red'} onClick={() => deleteSecureDeal(item._id)}>??????????????</AdminButton>
                                                </Col>
                                                <Col className='mb-1 text-center'>
                                                    <AdminButton
                                                        classname={'green'}
                                                        onClick={() => navigate(`/staff/secure-deal/${item._id}`)}
                                                    >????????????????????</AdminButton>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                            : <h3 className={'mb-3 mt-3'}>?????? ???????????????? ????????????</h3>
                    }

                </Row>
                <Row className={'mb-3 mt-3'}>
                    {
                        history.length >= 10 ?
                            <AdminButton onClick={onMore} classname={['xs', 'green']}>??????</AdminButton>
                            : null
                    }
                    {
                        limit > 0 ?
                            <AdminButton onClick={onLess} classname={['xs', 'green']}>??????????</AdminButton>
                            : null
                    }
                </Row>
            </AdminButtonCard>

        </Container>
    )
}

export default AdminSecureDeal