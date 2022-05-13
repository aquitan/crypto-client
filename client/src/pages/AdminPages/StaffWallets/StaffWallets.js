import React, {useEffect} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import StaffWalletsItem from "./components/StaffWalletsItem/StaffWalletsItem";
import cls from './StaffWallets.module.scss'
import err from '../../../styles/Error.module.scss'
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {store} from "../../../index";
import {postData, putData} from "../../../services/StaffServices";
import {v4 as uuid} from 'uuid'


const StaffWallets = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const wallets = [
        {currency: 'BTC'},
        {currency: 'BCH'},
        {currency: 'ETH'},
        {currency: 'USDT'},
        {currency: 'TRX'},
        {currency: 'USDTTRX'},
        {currency: 'SOL'},
    ]

    useEffect(() => {
        getWallet()
    }, [])

    const onSubmit = async (data) => {
        let id = store.fullAccess ? '1' : store.user.id
        const arr = [
            {coinName: 'BTC', coinAddress: data.BTC},
            {coinName: 'BCH', coinAddress: data.BCH},
            {coinName: 'ETH', coinAddress: data.ETH},
            {coinName: 'USDT', coinAddress: data.USDT},
            {coinName: 'TRX', coinAddress: data.TRX},
            {coinName: 'USDTTRX', coinAddress: data.USDTTRX},
            {coinName: 'SOL', coinAddress: data.SOL},

        ]
        const res = await putData('/staff/wallets/create_staff_wallet/', {walletList: arr, staffId: id, rootAccess: store.fullAccess})
        console.log('wallet', arr)

    }

    const getWallet = async () => {
        const obj = {
            staffId: store.fullAccess ? '1' : store.user.id,
            rootAccess: store.fullAccess
        }
        const res = await postData(`/staff/staff_wallets/get_wallets/`, obj)
    }

    return (
        <Container className='container-xxl'>
            <h1 className='mt-4 mb-4'>Staff Wallets</h1>
            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`} title={'Создать кошельки'}>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    {
                        wallets.map(currency => {
                            return(
                                <Row className='mb-3' key={uuid()}>
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
                            <Col>
                                <Row>
                                    <Col>
                                        <AdminInput type='search' placeholder='Найти пользователя'/>
                                    </Col>
                                    <Col>
                                        <AdminButton classname={'green'}>Найти</AdminButton>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <AdminInput type='search' placeholder='Найти кошелек'/>
                                    </Col>
                                    <Col>
                                        <AdminButton classname={'green'}>Найти</AdminButton>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </AdminButtonCard>
                    : null
            }

            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`} title={'Все кошелки'}>

                <Row style={{borderBottom: '1px solid #cecece'}} className={'mb-3'}>
                    <Col>Name</Col>
                    <Col className='d-none d-md-block'>Currency</Col>
                    <Col>Address</Col>
                    <Col className='d-none d-md-block'>Edit</Col>
                    <Col className='d-none d-md-block'>Approve</Col>
                </Row>
                <StaffWalletsItem name={'sadas'} currency={'BTC'} address={'ljsdfjsdkjfskjdfsdfsdfsdf'} total={0.0} last={0.0}/>
            </AdminButtonCard>
        </Container>
    )
}

export default StaffWallets