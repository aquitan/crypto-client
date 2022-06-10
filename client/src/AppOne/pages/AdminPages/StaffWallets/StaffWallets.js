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
import {store} from "../../../../index";
import {getData, patchData, postData, putData} from "../../../services/StaffServices";
import {v4 as uuid} from 'uuid'
import ModalDark from "../../../components/UI/ModalDark/ModalDark";
import {SwalSimple} from "../../../utils/SweetAlert";
import Preloader from "../../../components/UI/Preloader/Preloader";


const StaffWallets = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    console.log('errors-----', errors)
    const {register: registerUser, handleSubmit: handleSubmitUser} = useForm()
    const {register: registerWallet, handleSubmit: handleSubmitWallet} = useForm()
    const [modal, setModal] = useState(false)
    const [wallet, setWallet] = useState([])
    const [limit, setLimit] = useState(0)
    const [bot, setBot] = useState('')
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
        getDataTgBot()
    }, [])

    const onSubmit = async (data) => {
        let id = store.fullAccess ? '1' : store.user.id
        let obj = {
            staffId: id,
            rootAccess: store.fullAccess,
            walletList: {
                btcWallet: data.BTC,
                bchWallet: data.BCH,
                ethWallet: data.ETH,
                usdtWallet: data.USDT,
                tronWallet: data.TRX,
                trxUsdtWallet: data.USDTTRX,
                solanaWalet: data.SOL,
            }
        }
        const res = await putData('/staff/wallets/create_staff_wallet/', obj)

        console.log('wallet', obj)
    }

    const getDataTgBot = async () => {
        let obj = {
            userId: store.fullAccess ? '1' : store.user.id,
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess
        }

        const res = await postData('/staff/dashboard', obj)
        setBot(res.data.data.telegrams.twoStepBot)
    }

    const getWallet = async () => {
        const obj = {
            staffId: store.fullAccess ? '1' : store.user.id,
            rootAccess: store.fullAccess,
            skipValue: limit,
            limitValue: 10
        }
        const res = await postData(`/staff/staff_wallets/get_wallets/`, obj)
        setWallet(res.data)
    }

    const findUser = async (data) => {
        const res = await getData(`/staff/staff_wallets/check_staff/${data.userEmail}`)
        setWallet(res.data)
        console.log('res-data-wallet', res)
        if (res.status !== 202) {
            setModal(true)
        }
    }
    const findWallet = async (data) => {
        const res = await getData(`/staff/staff_wallets/check_staff_by_wallet/${data.userWallet}`)
        setWallet(res.data)
        console.log('res-data-wallet', res)
        if (res.status !== 202) {
            setModal(true)
        }
    }

    useEffect(() => {
        getWallet()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    const onUpdateWallet = async (currency, wallet) => {
        const obj = {
            staffId: store.user.id,
            rootAccess: store.fullAccess,
            isAdmin: store.isAdmin,
            wallet: wallet,
            coinName: currency
        }
        console.log('obj', obj)
        const res = await patchData('/staff/staff_wallets/edit_staff_wallets/', obj)
        if (res.status === 201) {
            SwalSimple('Кошелек изменен!')
        } else {
            SwalSimple('Упс! Что-то пошло не так...')
        }
    }

    return (
        <Container className='container-xxl'>
            <ModalDark active={modal} singleBtn={true} setActive={setModal}>
                Не найдено!
            </ModalDark>

            <AdminButtonCard>
                <h1 className='text-center'>Мои кошельки</h1>
            </AdminButtonCard>
            {
                !wallet ?
                    <>
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
                                    <Col className={'p-0'}>
                                        <Row className={'p-0'}>
                                            <Col className={'p-0'}>
                                                <AdminInput {...register('code', {
                                                    required: true,
                                                    message: "Без кода не отправить!"
                                                })} placeholder={'Вставь код'}/>
                                                <ErrorMessage name={'code'} errors={errors} render={({message}) => <p className={err.error}>Без кода не отправить!</p>} />
                                                {
                                                    bot ?
                                                        <a href={`http://${bot}`} target='_blank' rel="noopener noreferrer">Нажми на ссылку и получи код: {bot}</a>
                                                        : <Preloader/>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className='col-12 col-md-3 mb-3 text-center'>
                                        <AdminButton classname='green'>Подтвердить</AdminButton>
                                    </Col>
                                </Row>
                            </AdminForm>
                        </AdminButtonCard>
                    </>
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

            <AdminButtonCard className={`${cls.bg_black} mb-3 p-3`}>

                <Row style={{borderBottom: '1px solid #cecece'}} className={'mb-3'}>
                    <Col className='d-none d-md-block'>Currency</Col>
                    <Col>Address</Col>
                    {
                        store.fullAccess ?
                            <>
                                <Col className='d-none d-md-block'>Edit</Col>
                                <Col className='d-none d-md-block'>Approve</Col>
                            </>
                        : null
                    }
                </Row>
                {
                    wallet.length ?
                        wallet.map(wallet => {
                            return <StaffWalletsItem
                                        key={uuid()}
                                        id={wallet.staffId}
                                        currency={wallet.coinName}
                                        address={wallet.walletAddress}
                                        onClick={(currency, wallet) => onUpdateWallet(currency, wallet)}
                            />
                        })
                        : <h3>No wallets</h3>
                }
                <Row className={'mb-3 mt-3'}>
                    {
                        wallet.length >= 10 ?
                            <AdminButton onClick={onMore} classname={['xs', 'green']}>Еще</AdminButton>
                            : null
                    }
                    {
                        limit > 0 ?
                            <AdminButton onClick={onLess} classname={['xs', 'green']}>Назад</AdminButton>
                            : null
                    }
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

export default StaffWallets