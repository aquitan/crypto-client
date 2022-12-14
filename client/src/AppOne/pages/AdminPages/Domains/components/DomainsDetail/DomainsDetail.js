import React, {useEffect, useState} from 'react'
import {Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import {deleteData, getData, patchData, putData} from '../../../../../services/StaffServices';
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import DomainsDetailTableItem from "../DomainsDetailTableItem/DomainDetailTableItem";
import {useForm} from "react-hook-form";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {ErrorMessage} from "@hookform/error-message";
import cls from "../../../../NonAuthPages/SignIn/SignIn.module.scss";
import {domainSelect, domainsInputs, domainsInputsNums} from "../../../../../utils/staffConstants";
import Select from "../../../../../components/UI/Select/Select";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {v4 as uuid} from 'uuid'
import StaffErrorItem from "../../../StaffErrors/components/StaffErrorItem/StaffErrorItem";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import {useParams} from "react-router-dom";
import {store} from "../../../../../../index";
import CustomModal from '../../../../../components/CustomModal/CustomModal';


const DomainsDetail = () => {
    const params = useParams()
    const [state, setState] = useState({
        domain: '',
        errors: '',
        params: ''
    })
    const [errorsNames, setErrorsNames] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false)
    const [modalDomainChange, setModalDomainChange] = useState(false)
    const [errorList, setErrorList] = useState([])

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const {register: registerError, handleSubmit: submitError} = useForm({
        mode: 'onBlur'
    })
    const designs = [
        {value: 'one', text: 'one'},
        {value: 'two', text: 'two'},
    ]
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
        })
    }


    const onSubmit = async (data) => {
        for (let key in errorList) {
            errorList[key].fullDomainName = data.fullDomainName
        }
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
        data.dateOfDomainCreate = new Date(dateToTimestamp())
        data.depositFee = parseInt(data.depositFee)
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
        if (data.doubleDeposit === '????') {
            data.doubleDeposit = true
        } else {
            data.doubleDeposit = false
        }
        if (data.showNews === '????') {
            data.showNews = true
        } else {
            data.showNews = false
        }
        data.rootAccess = store.fullAccess
        try {
            const res = await patchData('/staff/domains/domain_detail/domain_edit/', data)
            setModalDomainChange(true)
        } catch(e) {
            setShowError(true)
        }
    }

    const onChangeError = (data) => {
        for (let key in errorList) {
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
        setShowModal(true)
    }

    const onDelete = async () => {
        let obj = {
            isAdmin: true,
            rootAccess: true,
            domainName: state.domain.fullDomainName
        }
        await deleteData('/staff/domains/full_domain_delete/', {data: obj})
    }


    return (
        <Container>

            <CustomModal title={'?????????????????? ????????????'} show={showModal} size={'md'} themeDark={true} btnClose={'Ok'} handleClose={() => setShowModal(false)}>
                ???? ???????????????? ????????????!
            </CustomModal>

            <CustomModal title={'?????????????????? ????????????'} show={showError} size={'md'} themeDark={true} btnClose={'Ok'} handleClose={() => setShowError(false)}>
                ??????! ??????-???? ?????????? ???? ??????! ???????????????????? ??????????!
            </CustomModal>

            <CustomModal title={'?????????????????? ????????????'} show={modalDomainChange} size={'md'} themeDark={true} btnClose={'Ok'} handleClose={() => setModalDomainChange(false)}>
                ???? ???????????????? ???????????? ????????????!
            </CustomModal>

            <AdminButtonCard>
                <h1 className='text-center'>?????????????????? ???????????????????? ?? ????????????: {state.domain.fullDomainName}</h1>
            </AdminButtonCard>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <AdminButtonCard>
                    {
                        state.domain ? <DomainsDetailTableItem params={state.params} data={state.domain} /> : <Preloader />
                    }
                </AdminButtonCard>
                <AdminButtonCard>
                    <h2 className='mb-3 text-center'>?????????????????????????? ??????????</h2>
                    <Row className='mb-3 relative'>
                        ?????????????? ?????? Email ????????????????????????
                        <AdminInput {...register('staffEmail', {
                            required: true,
                            pattern: /^[^??-????]+$/iu
                        })} placeholder='User email or name' />
                        <ErrorMessage  name='staffEmail' errors={errors} render={() => <p className={cls.error}>enter staff email or name</p>} />
                    </Row>
                    <Row className='mb-3 relative'>
                        ???????????? ???????????????? ??????
                        <AdminInput defaultValue={state.domain.fullDomainName} {...register('fullDomainName', {
                            required: true,
                            pattern: /^[^??-????]+$/iu
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
                                        pattern: /^[^??-????]+$/iu
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
                        ?????????????????? ???? ?????????? %
                        <AdminInput {...register('currencySwapFee', {
                            required: true,
                            pattern: /^[0-9]+$/,
                            min: 0,
                            max: 5
                        })} placeholder={'?????????????????? ???? ?????????? %'}/>
                        <ErrorMessage  name={'currencySwapFee'} errors={errors} render={() => <p className={cls.error}>Check the value</p>} />
                    </Row>
                    <Row className={'mb-3 relative'}>
                        ???????????????? ?????? ???????????????????? %
                        <AdminInput {...register('depositFee', {
                            required: true,
                            pattern: /^[0-9]+$/,
                            min: 0,
                            max: 5
                        })} placeholder={'???????????????? ?????? ???????????????????? %'}/>
                        <ErrorMessage  name={'depositFee'} errors={errors} render={() => <p className={cls.error}>Check the value</p>} />
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
                    <Row className={'mb-3 relative'}>
                        ????????????
                        <Select {...register('designName')} classname={'admin-square'} options={designs}/>
                        <ErrorMessage  name={'designName'} errors={errors} render={() => <p className={cls.error}>This field is required</p>} />
                    </Row>
                </AdminButtonCard>
                <AdminButtonCard>
                    {
                        state.errors ? state.errors.map(error => {
                                return <StaffErrorItem key={uuid()} data={error} />
                            })
                            : <h4 className='text-center my-4' style={{color: '#cecece'}}>???????????? ????????</h4>
                    }
                </AdminButtonCard>
                <AdminButtonCard>
                    <h2>?????????????????????????? ???????????? ???? ????????????</h2>
                    <Row className='mb-3'>
                        <Select {...registerError('error')} classname={'admin-square'} options={errorsNames} />
                    </Row>
                    <Row className='mb-3'>
                        <AdminInput {...registerError('title')}  placeholder='?????????? ??????????????????'/>
                    </Row>
                    <Row className='mb-3'>
                        <TextArea {...registerError('text')}  classname={['dark', 'admin-square']} placeholder='?????????? ??????????'/>
                    </Row>
                    <Row className='mb-3'>
                        <Select {...registerError('button')}  classname={'admin-square'} options={btns} />
                    </Row>
                    <Row>
                        <AdminButton onClick={submitError(onChangeError)} classname={'green'}>???????????????? ????????????</AdminButton>
                    </Row>
                </AdminButtonCard>
                <AdminButtonCard title={'?????????????????? ?????? ??????????????????!'}>
                    <AdminButton classname='green'>????????????????</AdminButton>
                </AdminButtonCard>

            </Form>
            <AdminButtonCard>
                <AdminButton onClick={onDelete} classname={'red'}>??????????????</AdminButton>
            </AdminButtonCard>
        </Container>
    )
}


export default DomainsDetail