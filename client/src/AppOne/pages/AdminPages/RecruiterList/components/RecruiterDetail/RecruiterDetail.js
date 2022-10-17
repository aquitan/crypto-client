import React, {useEffect, useState} from 'react'
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import {Col, Container, Form, Row} from "react-bootstrap";
import {deleteData, getData, patchData, postData, putData} from "../../../../../services/StaffServices";
import {useParams} from "react-router-dom";
import {store} from "../../../../../../index";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {emailValidate} from "../../../../../utils/checkEmail";
import {ErrorMessage} from "@hookform/error-message";
import cls from "../../../../NonAuthPages/SignIn/SignIn.module.scss";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import err from "../../../../../styles/Error.module.scss";
import {v4 as uuid} from 'uuid'
import StaffWalletsItem from "../../../StaffWallets/components/StaffWalletsItem/StaffWalletsItem";
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";

const RecruiterDetail = () => {
    const [recruiter, setRecruiter] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const {register: comission, handleSubmit: submitComission} = useForm()
    const {register: walletsRegister, handleSubmit: walletsSubmit, formState: {errors: error}} = useForm()
    const [staffList, setStaffList] = useState([])
    const [existingWallets, setExistingWallets] = useState([])
    const params = useParams()
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
        getRecruiterDetails()
        getWallets()
    }, [])


    const getRecruiterDetails = async () => {
        let obj = {
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            recruiterId: params.id
        }
        const res = await postData('/staff/recruiter/detail_page/', obj)
        setRecruiter(res.data.recruiter)
        setStaffList(res.data.staffList)
    }

    const onSubmit = async (data) => {
        let obj = {
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            recruiterFee: +data.recruiterFee,
            staffEmail: data.userEmail,
            recruiterId: params.id
        }
        const res = await postData('/staff/recruiter/add_staff_user_to_current_recruiter/', obj)
        if (res.status === 201) {
            getRecruiterDetails()
            // SwalSimple('Пользователь добавлен!')
        }
    }

    const updateUserFee = async (data) => {
        let obj = {
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            recruiterId: params.id,
            updatedFee: +data.updatedFee
        }
        const res = await patchData('/staff/recruiter/update_recruiter_fee/', obj)
        if (res.status === 202) {
            // SwalSimple('Комиссия изменена')
            getRecruiterDetails()
        }

    }

    const deleteUserFromRecruiterList = async (id, email) => {
        let obj = {
            recruiterId: params.id,
            rootAccess: store.fullAccess,
            isAdmin: store.isAdmin,
            staffId: id,
            staffEmail: email

        }
        const res = await deleteData('/staff/recruiter/delete_staff_user_from_recruiter/', {data: obj})
        if (res.status === 200) {
            // SwalSimple('Пользователь удален!')
            getRecruiterDetails()
        }
    }

    const createWallets = async (data) => {
        let recruiterId = params.id
        let obj = {
            recruiterId: recruiterId,
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
        const res = await postData('/staff/recruiter/add_recruiter_wallets/', obj)
        if (res.status === 201) {
            // SwalSimple('Кошельки добавлены')
            getWallets()
        }
    }

    const getWallets = async () => {
        let obj = {
            rootAccess: store.fullAccess,
            isAdmin: store.isAdmin,
            recruiterId: params.id
        }
        const res = await postData('/staff/recruiter/get_recruiter_wallets/', obj)
        setExistingWallets(res.data)
    }

    const onUpdateWallet = async (currency, wallet) => {

        const obj = {
            recruiterId: params.id,
            rootAccess: store.fullAccess,
            isAdmin: store.isAdmin,
            wallet: wallet,
            coinName: currency
        }
        const res = await patchData('/staff/recruiter/update_recruiter_wallet/', obj)
        if (res.status === 201) {
            // SwalSimple('Кошелек изменен!')
            getWallets()
        } else {
            // SwalSimple('Упс! Что-то пошло не так...')
        }
    }


    return (
        <Container>
            <AdminButtonCard>
                <h1>Детальная Рекрутера</h1>
            </AdminButtonCard>
            <AdminButtonCard title={'Рекрутер'}>
                <Row className={'mb-3'}>
                    <Col>
                        Почта рекрутера: <b>{recruiter ? recruiter.recruiterEmail : 'No data'}</b>
                    </Col>
                </Row>
                <Row className={'mb-3'}>
                    <Col>
                        Комиссия рекрутера: <b>{recruiter ? recruiter.currentFee : 'No data'}</b>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <AdminInput
                                    placeholder={'Изменить комиссию'}
                                    {...comission('updatedFee')}
                                    classname={'admin-square'} />
                            </Col>
                            <Col>
                                <AdminButton
                                    onClick={submitComission(updateUserFee)}
                                    classname={'green'}>Изменить</AdminButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title={'Добавить пользователя'} >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className={'mb-3'}>
                        <AdminInput
                            {...register('userEmail', {
                                required: true,
                                validate: emailValidate,
                            })}
                            placeholder={'Почта пользователя'}
                            classname={'admin-square'}
                        />
                        <ErrorMessage  name='userEmail' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />
                    </Row>
                    <Row className={'mb-3'}>
                        <AdminInput
                            {...register('recruiterFee', {
                                required: true
                            })}
                            placeholder={'Комиссия рекрутера'}
                            classname={'admin-square'}
                        />
                        <ErrorMessage  name='recruiterFee' errors={errors} render={() => <p className={cls.error}>check the value</p>} />
                    </Row>
                    <Row>
                        <AdminButton classname={'green'}>Добавить</AdminButton>
                    </Row>
                </Form>
            </AdminButtonCard>

            <AdminButtonCard title={'Кошельки рекрутера'}>
                {
                    !existingWallets.length ?
                    <AdminForm onSubmit={walletsSubmit(createWallets)}>
                        {
                            wallets.map(currency => {
                                return(
                                    <Row className='mb-3' key={uuid()}>
                                        <AdminInput {...walletsRegister(`${currency.currency}`, {
                                            minLength: {
                                                value: 40,
                                                message: 'Минимальное кол-во символов 40'
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: 'Максимальное кол-во символов 50'
                                            }
                                        })} placeholder={currency.currency}/>
                                        <ErrorMessage name={currency.currency} errors={error} render={({message}) => <p className={err.error}>{message}</p>} />
                                    </Row>
                                )
                            })
                        }
                        <Row className='justify-content-center'>
                            <Col className='col-12 col-md-3 mb-3 text-center'>
                                <AdminButton classname='green'>Подтвердить</AdminButton>
                            </Col>
                        </Row>
                    </AdminForm> :
                        existingWallets.map(item => {
                            return(
                                <StaffWalletsItem
                                    key={uuid()}
                                    id={params.id}
                                    currency={item.coinName}
                                    address={item.walletAddress}
                                    onClick={(currency, wallet) => onUpdateWallet(currency, wallet)}
                                />
                            )
                        })

                }
            </AdminButtonCard>

            <AdminButtonCard title={'Пользователи рекрутера'}>
                <Row style={{padding: '10px 0', marginBottom: 10, borderBottom: '1px solid #fff'}}>
                    <Col className={'text-center'}>
                        Email
                    </Col>
                    <Col className={'text-center'}>
                        Staff fee
                    </Col>
                    <Col className={'text-center'}>
                        Fee of recruiter
                    </Col>
                    <Col className={'text-center'}>
                        Actions
                    </Col>
                </Row>
                {
                    staffList.length ?
                        staffList.map(item => {
                            return(
                                <Row key={uuid()} style={{padding: '10px 0', marginBottom: 10, borderBottom: '1px solid #fff'}}>
                                    <Col className={'text-center'}>{item.staffEmail}</Col>
                                    <Col className={'text-center'}>{item.staffFee}</Col>
                                    <Col className={'text-center'}>{item.recruiterFee}</Col>
                                    <Col className={'text-center'}>
                                        <AdminButton
                                            onClick={() => deleteUserFromRecruiterList(item.recruiterId, item.staffEmail)}
                                            classname={['red', 'xs']}>Удалить</AdminButton>
                                    </Col>
                                </Row>
                            )
                        })
                        : <h3>No users</h3>
                }
            </AdminButtonCard>
            
        </Container>
    )
}

RecruiterDetail.propTypes = {
    
}
RecruiterDetail.defaultProps = {
    
}

export default RecruiterDetail