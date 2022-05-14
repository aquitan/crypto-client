import React, {useEffect, useState} from 'react'
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
import {getData, postData, putData} from "../../../services/StaffServices";
import {v4 as uuid} from 'uuid'
import ModalDark from "../../../components/UI/ModalDark/ModalDark";


const StaffWallets = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const {register: registerUser, handleSubmit: handleSubmitUser} = useForm()
    const {register: registerWallet, handleSubmit: handleSubmitWallet} = useForm()
    const [modal, setModal] = useState(false)
    const [wallet, setWallet] = useState()
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
        // const arr = [
        //     {coinName: 'BTC', coinAddress: data.BTC},
        //     {coinName: 'BCH', coinAddress: data.BCH},
        //     {coinName: 'ETH', coinAddress: data.ETH},
        //     {coinName: 'USDT', coinAddress: data.USDT},
        //     {coinName: 'TRX', coinAddress: data.TRX},
        //     {coinName: 'USDTTRX', coinAddress: data.USDTTRX},
        //     {coinName: 'SOL', coinAddress: data.SOL},
        //
        // ]
        let obj = {
            staffId: id,
            rootAccess: store.fullAccess,
            btcWallet: data.BTC,
            bchWallet: data.BCH,
            ethWallet: data.ETH,
            usdtWallet: data.USDT,
            tronWallet: data.TRX,
            trxUsdtWallet: data.USDTTRX,
            solanaWalet: data.SOL,
        }
        const res = await putData('/staff/wallets/create_staff_wallet/', obj)
        console.log('wallet', obj)

    }

    const getWallet = async () => {
        const obj = {
            staffId: store.fullAccess ? '1' : store.user.id,
            rootAccess: store.fullAccess
        }
        const res = await postData(`/staff/staff_wallets/get_wallets/`, obj)
        setWallet(res.data)
    }

    const findUser = async (data) => {
        const res = getData(`/staff/staff_wallets/check_staff/${data.userEmail}`)
        if (res.status !== 200) {
            setModal(true)
        }
    }
    const findWallet = async (data) => {
        const res = getData(`/staff/staff_wallets/check_staff_by_wallet/${data.userWallet}`)
        if (res.status !== 200) {
            setModal(true)
        }
    }

    return (
        <Container className='container-xxl'>
            <ModalDark active={modal} singleBtn={true} setActive={setModal}>
                Не найдено!
            </ModalDark>

            <AdminButtonCard>
                <h1 className='text-center'>Staff Wallets</h1>
            </AdminButtonCard>
            {
                !store.fullAccess && !store.isAdmin ?
                    <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`} title={'Создать кошельки'}>
                        <AdminForm onSubmit={handleSubmit(onSubmit)}>
                            {
                                wallets.map(currency => {
                                    return(
                                        <Row className='mb-3' key={uuid()}>
                                            <AdminInput {...register(`${currency.currency}`, {
                                                minLength: {
                                                    value: 40,
                                                    message: 'Минимальное кол-во символов 40'
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Максимальное кол-во символов 50'
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
                    : null
            }

            {
                store.fullAccess || store.isAdmin ?
                    <AdminButtonCard>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <AdminInput {...registerUser('userEmail')} type='search' placeholder='Найти пользователя'/>
                                    </Col>
                                    <Col>
                                        <AdminButton onClick={handleSubmitUser(findUser)} classname={'green'}>Найти</AdminButton>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <AdminInput {...registerWallet('userWallet')} type='search' placeholder='Найти кошелек'/>
                                    </Col>
                                    <Col>
                                        <AdminButton onClick={handleSubmitWallet(findWallet)} classname={'green'}>Найти</AdminButton>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </AdminButtonCard>
                    : null
            }

            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`} title={'Все кошелки'}>

                <Row style={{borderBottom: '1px solid #cecece'}} className={'mb-3'}>
                    <Col className='d-none d-md-block'>Currency</Col>
                    <Col>Address</Col>
                    <Col className='d-none d-md-block'>Edit</Col>
                    <Col className='d-none d-md-block'>Approve</Col>
                </Row>
                {
                    wallet ?
                        wallet.map(wallet => {
                            return <StaffWalletsItem
                                        id={wallet.staffId}
                                        currency={wallet.coinName}
                                        address={wallet.walletAddress} />
                        })
                        : <h3>No wallets</h3>
                }
            </AdminButtonCard>
        </Container>
    )
}

export default StaffWallets