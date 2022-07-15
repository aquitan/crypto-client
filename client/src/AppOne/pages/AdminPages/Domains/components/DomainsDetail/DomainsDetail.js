import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import {getData, patchData, putData} from "../../../../../services/StaffServices";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import DomainsDetailTableItem from "../DomainsDetailTableItem/DomainDetailTableItem";
import {useForm} from "react-hook-form";
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {ErrorMessage} from "@hookform/error-message";
import cls from "../../../../NonAuthPages/SignIn/SignIn.module.scss";
import {defaultErrors, domainSelect, domainsInputs, domainsInputsNums} from "../../../../../utils/staffConstants";
import Select from "../../../../../components/UI/Select/Select";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import {v4 as uuid} from 'uuid'
import StaffErrorItem from "../../../StaffErrors/components/StaffErrorItem/StaffErrorItem";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import {useParams} from "react-router-dom";
import {store} from "../../../../../../index";


const DomainsDetail = () => {
    const params = useParams()
    const [state, setState] = useState({
        domain: '',
        errors: '',
        params: ''
    })
    const [errorsNames, setErrorsNames] = useState([])
    const [errorList, setErrorList] = useState([])

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const {register: registerError, handleSubmit: submitError} = useForm({
        mode: 'onBlur'
    })
    useEffect(() => {
        getDomainData()
    }, [])

    const btns = [
        {text: 'Ok', value: 'Ok'},
        {text: 'Close', value: 'Close'},
        {text: 'Support', value: 'Support'},
    ]

    const getDomainData = async () => {
        const res = await getData(`/staff/domains/domain_detail/${params.id}/`)
        setState({
            domain: res.data.domain_detail.baseDomainData,
            errors: res.data.domain_detail.domainErrors,
            params: res.data.domain_detail.domainParams
        })
        let arr = []
        res.data.domain_detail.domainErrors.forEach(item => {
            let obj = {
                text: item.errorTitle,
                value: item.errorTitle
            }
            arr.push(obj)
        })
        createErrorArr(res.data.domain_detail.domainErrors)

        setErrorsNames(arr)
        console.log('detail data', arr)
    }



    const createErrorArr = (errors) => {
        let errorList = {
            verif_document: {
            },
            verif_address: {
            },
            insurance: {
            },
            premium: {
            },
            multi_account: {
            },
        }
        errors.filter(el => {
            if (el.errorTitle === 'Address Verification') {
                errorList.verif_address.errorName = el.errorName
                errorList.verif_address.title = el.errorTitle
                errorList.verif_address.text = el.errorText
                errorList.verif_address.button = el.errorButton
            } else if (el.errorTitle === 'Documents Verification') {
                errorList.verif_document.errorName = el.errorName
                errorList.verif_document.title = el.errorTitle
                errorList.verif_document.text = el.errorText
                errorList.verif_document.button = el.errorButton
            } else if (el.errorTitle === 'Insurance') {
                errorList.insurance.errorName = el.errorName
                errorList.insurance.title = el.errorTitle
                errorList.insurance.text = el.errorText
                errorList.insurance.button = el.errorButton
            } else if (el.errorTitle === 'Premium') {
                errorList.premium.errorName = el.errorName
                errorList.premium.title = el.errorTitle
                errorList.premium.text = el.errorText
                errorList.premium.button = el.errorButton
            } else if (el.errorTitle === 'Multi-account') {
                errorList.multi_account.errorName = el.errorName
                errorList.multi_account.title = el.errorTitle
                errorList.multi_account.text = el.errorText
                errorList.multi_account.button = el.errorButton
            }
            setErrorList(errorList)
            console.log('error list ------', errorList)
        })
    }


    const onSubmit = async (data) => {
        if (data.showNews === 'true') {
            data.showNews = true
        }
        if (data.showNews === 'false') {
            data.showNews = false
        }
        if (data.doubleDeposit === 'true') {
            data.doubleDeposit = true
        }
        if (data.doubleDeposit === 'false') {
            data.doubleDeposit = false
        }
        data.errorList = errorList
        data.dateOfDomainCreate = dateToTimestamp()
        data.depositFee = parseInt(data.depositFee)
        data.rateCorrectSum = parseInt(data.rateCorrectSum)
        data.minDepositSum = parseInt(data.minDepositSum)
        data.minWithdrawalSum = parseInt(data.minWithdrawalSum)
        data.currencySwapFee = parseInt(data.currencySwapFee)
        data.companyPhoneNumber = parseInt(data.companyPhoneNumber)
        data.companyYear = parseInt(data.companyYear)
        if (store.fullAccess) {
            data.staffId = 'dsfsdf'
        } else {
            data.staffId = store.user.id
        }
        if (data.doubleDeposit === 'Да') {
            data.doubleDeposit = true
        } else {
            data.doubleDeposit = false
        }
        if (data.showNews === 'Да') {
            data.showNews = true
        } else {
            data.showNews = false
        }
        data.rootAccess = store.fullAccess
        // const res = await patchData('/staff/domains/domain_detail/domain_edit/', data)
        console.log('domains-data', data)
    }

    const onChangeError = (data) => {
        console.log(data)
        for (let key in errorList) {
            console.log('key', errorList[key].title)
            console.log('error-list', data.error)
            if (errorList[key].title === data.error) {
                let obj = {
                    errorName: data.error,
                    domainName: window.location.host,
                    title: data.title,
                    text: data.text,
                    button: data.button
                }
                if (errorList[key].title === 'Address Verification') {
                    setErrorList({...errorList, verif_address: obj})
                } else if (errorList[key].title === 'Documents Verification') {
                    setErrorList({...errorList, verif_document: obj})
                } else if (errorList[key].title === 'Premium') {
                    setErrorList({...errorList, premium: obj})
                } else if (errorList[key].title === 'Insurance') {
                    setErrorList({...errorList, insurance: obj})
                } else if (errorList[key].title === 'Multi-account') {
                    setErrorList({...errorList, multi_account: obj})
                }
            }
        }
    }


    return (
        <Container>
            <AdminButtonCard>
                <h1 className='text-center'>Детальная информация о LocalHost</h1>
            </AdminButtonCard>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <AdminButtonCard>
                    {
                        state.domain ? <DomainsDetailTableItem params={state.params} data={state.domain} /> : <Preloader />
                    }
                </AdminButtonCard>
                <AdminButtonCard>
                    <h2 className='mb-3 text-center'>Редактировать домен LocalHost</h2>
                    <Row className='mb-3 relative'>
                        Никнейм или Email пользователя
                        <AdminInput {...register('staffEmail', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='User email or name' />
                        <ErrorMessage  name='staffEmail' errors={errors} render={() => <p className={cls.error}>enter staff email or name</p>} />
                    </Row>
                    <Row className='mb-3 relative'>
                        Полное доменное имя
                        <AdminInput {...register('fullDomainName', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='bitdomain.com' />
                        <ErrorMessage  name='fullDomainName' errors={errors} render={() => <p className={cls.error}>enter domain name</p>} />
                    </Row>
                    {
                        domainsInputs.map(input => {
                            return (
                                <Row key={uuid()} className='mb-3 relative'>
                                    {input.text}
                                    <AdminInput type={input.inp} {...register(input.name, {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} placeholder={input.text}/>
                                    <ErrorMessage  name={input.name} errors={errors} render={() => <p className={cls.error}>This field is required</p>} />
                                </Row>
                            )
                        })
                    }
                    {
                        domainsInputsNums.map(input => {
                            return (
                                <Row key={uuid()} className='mb-3 relative'>
                                    {input.text}
                                    <AdminInput type={input.inp} {...register(input.name, {
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                    })} placeholder={input.text}/>
                                    <ErrorMessage  name={input.name} errors={errors} render={() => <p className={cls.error}>Check the value</p>} />
                                </Row>
                            )
                        })
                    }
                    <Row className={'mb-3 relative'}>
                        Коммиссия на свапе %
                        <AdminInput {...register('currencySwapFee', {
                            required: true,
                            pattern: /^[0-9]+$/,
                            min: 0,
                            max: 5
                        })} placeholder={'Коммиссия на свапе %'}/>
                        <ErrorMessage  name={'currencySwapFee'} errors={errors} render={() => <p className={cls.error}>Check the value</p>} />
                    </Row>
                    <Row className={'mb-3 relative'}>
                        Комиссия при пополнении %
                        <AdminInput {...register('depositFee', {
                            required: true,
                            pattern: /^[0-9]+$/,
                            min: 0,
                            max: 5
                        })} placeholder={'Комиссия при пополнении %'}/>
                        <ErrorMessage  name={'depositFee'} errors={errors} render={() => <p className={cls.error}>Check the value</p>} />
                    </Row>
                    <Row className={'mb-3 relative'}>
                        Корректировка курса в %
                        <AdminInput {...register('rateCorrectSum', {
                            required: true,
                            pattern: /^[0-9]+$/,
                            min: 0,
                            max: 15
                        })} placeholder={'Корректировка курса в %'}/>
                        <ErrorMessage  name={'rateCorrectSum'} errors={errors} render={() => <p className={cls.error}>Check the value</p>} />
                    </Row>
                    {
                        domainSelect.map(select => {
                            return (
                                <Row key={uuid()} className='mb-3 relative'>
                                    {select.text}
                                    <Select {...register(select.name)} classname={'admin-square'} placeholder={select.text} options={select.options} />
                                    <ErrorMessage  name={select.name} errors={errors} render={() => <p className={cls.error}>This field is required</p>} />
                                </Row>
                            )
                        })
                    }
                </AdminButtonCard>
                <AdminButtonCard>
                    {
                        state.errors ? state.errors.map(error => {
                                return <StaffErrorItem key={uuid()} data={error} />
                            })
                            : <h4>No data!</h4>
                    }
                </AdminButtonCard>
                <AdminButtonCard>
                    <h2>Редактировать ошибку на домене</h2>
                    <Row className='mb-3'>
                        <Select {...registerError('error')} classname={'admin-square'} options={errorsNames} />
                    </Row>
                    <Row className='mb-3'>
                        <AdminInput {...registerError('title')}  placeholder='Новый заголовок'/>
                    </Row>
                    <Row className='mb-3'>
                        <TextArea {...registerError('text')}  classnames='dark admin-square' placeholder='Новый текст'/>
                    </Row>
                    <Row className='mb-3'>
                        <Select {...registerError('button')}  classname={'admin-square'} options={btns} />
                    </Row>
                    <Row>
                        <AdminButton onClick={submitError(onChangeError)} classname={'green'}>Изменить ошибку</AdminButton>
                    </Row>
                </AdminButtonCard>
                <AdminButtonCard title={'Сохранить все изменения!'}>
                    <AdminButton classname='green'>Изменить</AdminButton>
                </AdminButtonCard>
            </Form>
        </Container>
    )
}

DomainsDetail.propTypes = {

}
DomainsDetail.defaultProps = {

}

export default DomainsDetail