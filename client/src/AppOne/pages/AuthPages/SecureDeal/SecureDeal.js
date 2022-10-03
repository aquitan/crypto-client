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
import {deleteData, getData, patchData, putData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {NotifContext, useNotifContext} from "../../../context/notifContext";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';


const SecureDeal = () => {
    const {theme} = useThemeContext(ThemeContext)
    const {updateNotif} = useNotifContext(NotifContext)
    const [showSecure, setShowSecure] = useState(false)
    const [state, setState] = useState(false)
    const [history, setHistory] = useState([])
    const [startDate, setStartDate] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const navigate = useNavigate()
    const options = [
        {value: 'BTC', text: 'BTC'},
        {value: 'ETH', text: 'ETH'},
        {value: 'BCH', text: 'BCH'},
        {value: 'USDT', text: 'USDT'},
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
        data.dealDedline = dateToTimestamp(startDate)
        data.currentDate = dateToTimestamp()
        data.userId = store.user.id
        data.amountInCrypto = +data.amountInCrypto
        const res = await putData('/personal_area/secure_deal/create_secure_deal/', data)
        if (res.status === 200) {
            setShowSecure(true)
            getHistory()
            updateNotif()
        }
    }

    useEffect(() => {
        getHistory()
        onFilter()
    }, [])

    const getHistory = async () => {
        const res = await getData(`/personal_area/secure_deal/secure_deal_history/${store.user.email}`)
        setHistory(res.data.history.filter(item => {
            if (dateToTimestamp() > item.dealDedline) {
                console.log('dateToTimestamp() > item.dealDedline', dateToTimestamp() > item.dealDedline)
                onMissDeadline(item._id, item.dealDedline)
            }
            return  dateToTimestamp() < item.dealDedline
        }))
        console.log('history', history)
    }

    const onMissDeadline = async (id, deadline) => {
        const obj = {
            dealId: id,
            dedline: deadline
        }
        const res = await patchData('/personal_area/secure_deal/secure_deal_detail/miss_dedline/', obj)
        // if (res.status === 200) {
        //     const resDel = await deleteData(`/personal_area/secure_deal/secure_deal_detail/delete_deal/${id}`, {data: {staffId: id}})
        // }
        console.log('on miss deadline', obj)
    }

    const checkOnBlur = async (e) => {
        const res = await getData(`/second_party_user_checker/${e.target.value}/${window.location.host}/1`)
    }

    const onFilter = () => {

        console.log('history filter', history)
    }

    return (
        <>
            <Modal
              size='md'
              animation={false}
              style={{opacity: 1, zIndex: 9999}}
              show={showSecure}
              onHide={() => setShowSecure(false)}
              dialogClassName={`modal-window ${theme}`}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Secure deal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Secure deal was created successfully!
                    Please visit detail page of your secure deal.
                </Modal.Body>
            </Modal>

            <Row>
                <Col className='col-12 col-lg-7'>
                    <ButtonCard theme={theme}>
                        <Row>
                            <h2>Create new secure deal</h2>
                        </Row>
                        <Form classnames='wide-form' onSubmit={handleSubmit(onSubmit)}>
                            <Row className='mb-3 pb-2 secure_deal_row'>
                                <h4 className='mb-3'>
                                    <span className='step'>01</span>
                                    Step 1: Choose your role</h4>
                                <p>You can buy or sell anything securely via our platform.</p>
                                <div className='secure_deal_col mb-3 d-flex'>
                                    <div className='p-0 py-4'>
                                        <InputRadio {...register('role', {
                                            required: 'This field is required',
                                        })} classname='radio_btn' id='seller' label='Seller' value='seller' name='role' />
                                        <ErrorMessage
                                          name='role'
                                          errors={errors}
                                          render={({message}) => <p className={error.error}>{message}</p>} />
                                    </div>
                                    <div className='p-0 py-4'>
                                        <InputRadio {...register('role', {
                                            required: 'This field is required',
                                        })} classname='radio_btn' label='Buyer' id='buyer' value='buyer' name='role' />
                                        <ErrorMessage
                                          name='role'
                                          errors={errors}
                                          render={({message}) => <p className={error.error}>{message}</p>} />
                                    </div>
                                </div>
                            </Row>
                            <Row className='mb-3 pb-2'>
                                <Col>
                                    <h4 className='mb-3'>
                                        <span className='step'>02</span>
                                        Step 2: Participant</h4>
                                    <p>Please enter username or email of another participant. User should have account at localhost</p>
                                    <Input classname='inputTransparent' {...register('secondPartyEmail', {
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
                                <Col>
                                    <h4 className='mb-3'>
                                        <span className='step'>03</span>
                                        Step 3: Deal conditions</h4>
                                    <p>Please describe all aspects of the deal as accurately as possible.
                                        Do not use special professional vocabulary,
                                        they must be clear to the third party, a Guarantor.
                                        The resolution of possible disputes will depend on this.</p>
                                    <TextArea {...register('dealCondition', {
                                        required: 'This field is required',
                                    })} rows={10} classnames='textareaTransparent' placeholder='Deal conditions' />
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
                                      customInput={<DatePickerCustom classname='inputTransparent'/>}
                                      placeholderText='Date'
                                      selected={startDate}
                                      dateFormat='yyyy/MM/dd'
                                      onChange={(date) => setStartDate(date)} />
                                </Col>
                                <Col className='col-12 col-md-6 mb-3'>
                                    <Select {...register('coinName', {
                                        required: 'This field is required',
                                    })} options={options} classname='selectTransparent' />
                                    <ErrorMessage
                                      name='coinName'
                                      errors={errors}
                                      render={({message}) => <p className={error.error}>{message}</p>} />
                                </Col>
                            </Row>
                            <Row className='mb-3 pb-2'>
                                <Col>
                                    <Input classname='inputTransparent' {...register('amountInCrypto', {
                                        required: 'This field is required',
                                        pattern: /(\d+(?:\.\d+)?)/
                                    })} placeholder='Amount'/>
                                    <ErrorMessage
                                      name='amountInCrypto'
                                      errors={errors}
                                      render={({message}) => <p className={error.error}>{message ? message : 'Check value'}</p>} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button classname='btnBlue'>Create secure deal</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-lg-5'>
                    <ButtonCard theme={theme}>
                        <h2>Recent deals</h2>
                        <Row>
                            <Table>
                                <TableBody>
                                    {
                                        history.length ?
                                          history.map(item => {
                                              return <SecureDealTableItem
                                                classname={'table_item_small'}
                                                amount={item.amountInCrypto}
                                                status={item.status ? 'Completed' : 'Pending'}
                                                onClick={() => navigate(`/secure-deal/${item._id}`)}/>
                                          })
                                          : <h4 className='text-center my-4' style={{color: '#cecece'}}>No deals!</h4>
                                    }

                                </TableBody>
                            </Table>
                        </Row>
                    </ButtonCard>
                </Col>
            </Row>


        </>
    )
}

export default SecureDeal