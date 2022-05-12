import React, {useEffect} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import StaffWalletsItem from "./components/StaffWalletsItem/StaffWalletsItem";
import UserService from "../../../services/UserService";
import cls from './StaffWallets.module.scss'
import err from '../../../styles/Error.module.scss'
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import Input from "../../../components/UI/Input/Input";
import {store} from "../../../index";


const StaffWallets = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const wallets = [
        {currency: 'BTC', id: 1},
        {currency: 'ETH', id: 2},
        {currency: 'USDT', id: 3},
        {currency: 'BCH', id: 4},
    ]

    const onGetWallets = async () => {
        const obj = {
        }
        const res = await UserService.getWallets(obj)
        const data = await res
        console.log('wallets', data)
    }
    useEffect(() => {
        onGetWallets()
    }, [])

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Container className='container-xxl'>
            <h1 className='mt-4 mb-4'>Staff Wallets</h1>
            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`}>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    {
                        wallets.map(currency => {
                            return(
                                <Row className='mb-3' key={currency.id}>
                                    <AdminInput {...register(`${currency.currency}`, {
                                        minLength: {
                                            value: 30,
                                            message: 'Минимальное кол-во символов 31'
                                        },
                                        maxLength: {
                                            value: 45,
                                            message: 'Максимальное кол-во символов 45'
                                        }
                                    })} placeholder={currency.currency}/>
                                    <ErrorMessage name={currency.currency} errors={errors} render={({message}) => <p className={err.error}>{message}</p>} />
                                </Row>
                            )
                        })
                    }
                    <Row className='justify-content-center'>
                        <Col className='col-12 col-md-3 mb-3 text-center'>
                            <AdminButton classname='green'>Подтвердить</AdminButton>
                        </Col>
                    </Row>
                </AdminForm>
            </AdminButtonCard>

            {
                store.fullAccess || store.isAdmin ?
                    <AdminButtonCard>
                        <Row>
                            <AdminInput type='search' placeholder='Найти кошелек'/>
                        </Row>
                    </AdminButtonCard>
                    : null
            }

            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`}>
                <Row className='mb-3'>
                    <Col className='col-lg-3'>
                        <select name="currency" id="">
                            <option value='BTC'>BTC</option>
                            <option value='ETH'>ETH</option>
                            <option value='USDT'>USDT</option>
                            <option value='BCH'>BCH</option>
                        </select>
                    </Col>
                </Row>
                <Row style={{borderBottom: '1px solid #cecece'}} className={'mb-3'}>
                    <Col>Name</Col>
                    <Col className='d-none d-md-block'>Currency</Col>
                    <Col>Address</Col>
                    <Col className='d-none d-md-block'>Total</Col>
                    <Col className='d-none d-md-block'>last</Col>
                </Row>
                <StaffWalletsItem name={'sadas'} currency={'BTC'} address={'ljsdfjsdkjfskjdfsdfsdfsdf'} total={0.0} last={0.0}/>
            </AdminButtonCard>
        </Container>
    )
}

export default StaffWallets