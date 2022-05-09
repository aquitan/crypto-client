import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Accordion, Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import {
    defaultErrors,
    domainSelect,
    domainsInputs, domainsInputsNums,
    optionsButton,
    tableHeaderDomains
} from "../../../utils/staffConstants";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import './Domains.scss'
import {useForm} from "react-hook-form";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {v4 as uuid} from 'uuid'
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import Table from '../../../components/UI/Table/Table'
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {postData, putData} from "../../../services/StaffServices";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {store} from "../../../index";
import cls from "../../NonAuthPages/SignIn/SignIn.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate} from "react-router-dom";
import ModalDark from "../../../components/UI/ModalDark/ModalDark";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";

const CreateDomains = () => {
    const [modal, setModal] = useState(false)
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: "onBlur"
    })
    const [activeDomains, setActiveDomains] = useState()
    const navigate = useNavigate()
    const [errorList, setErrorList] = useState({
        verif_document: {
            errorName: defaultErrors[0].errorName,
            title: defaultErrors[0].name,
            text: defaultErrors[0].text,
            button: 'ОК'
        },
        verif_address: {
            errorName: defaultErrors[1].errorName,
            title: defaultErrors[1].name,
            text: defaultErrors[1].text,
            button: 'OK'
        },
        insurance: {
            errorName: defaultErrors[2].errorName,
            title: defaultErrors[2].name,
            text: defaultErrors[2].text,
            button: 'OK'
        },
        premium: {
            errorName: defaultErrors[3].errorName,
            title: defaultErrors[3].name,
            text: defaultErrors[3].text,
            button: 'OK'
        },
        multi_account: {
            errorName: defaultErrors[4].errorName,
            title: defaultErrors[4].name,
            text: defaultErrors[4].text,
            button: 'OK'
        },
    })
    const tableHeader = ['#001', '127.0.0.1:8000', 'super', 'Jan. 11, 2022, 10:21 a.m.']

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
        // data.internalSwapFee = parseInt(data.internalSwapFee)
        data.currencySwapFee = parseInt(data.currencySwapFee)
        data.companyPhoneNumber = parseInt(data.companyPhoneNumber)
        data.companyYear = parseInt(data.companyYear)
        if (store.fullAccess) {
            data.staffId = 'dsfsdf'
        } else {
            data.staffId = store.userId
        }
        data.rootAccess = store.fullAccess
        const res = await postData('/staff/domains/create_domain/', data)
        console.log('domains-data', data)
        const response = await res.data
        if (res.status === 201) {
            setModal(true)
            reset({data: ''})
        }
    }


    useEffect(async () => {
        // getActiveDomains()
    }, [])

    const onDetail = (id) => {
        navigate(`/staff/domains/${id}`)
    }

    // const getActiveDomains = async () => {
    //     const obj = {
    //         isAdmin: store.isAdmin,
    //         isStaff: store.isStaff,
    //         staffId: store.userId
    //     }
    //     const res = await postData('/staff/domains/get_active_domains/', obj)
    //     setActiveDomains(res.data.domainsList)
    //     console.log('get domains', res.data)
    // }

    return (
        <Container>
            <ModalDark active={modal} setActive={setModal} singleBtn={true}>
                <h2>Домен создан успешно!</h2>
            </ModalDark>
            <h1 className='mt-4'>Домены</h1>
            <AdminButtonCard>
                <h2 className='mb-3 text-center'>Добавить новый домен</h2>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
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
                    <h2 className='mb-3'>Дефолтные ошибки</h2>
                    <Accordion className='mb-3' defaultActiveKey="0" flush>
                        <Accordion.Item className='bg-dark' eventKey='0'>
                            <Accordion.Header className='bg-dark'>{errorList.verif_address.title}</Accordion.Header>
                            <Accordion.Body className='bg-dark'>
                                <h5>Основной текст</h5>
                                <Row className='mb-3 relative'>
                                    <TextArea
                                        onChange={
                                            (e) => setErrorList({...errorList, verif_address: {
                                                    title: errorList.verif_address.title,
                                                    text: e.target.value,
                                                    domainName: window.location.host,
                                                    errorName: errorList.verif_address.errorName,
                                                    button: errorList.verif_address.button
                                                }})
                                        }
                                        classnames='dark admin-square'
                                    />
                                    <div>
                                        <b>Пример текста:</b><br/> {defaultErrors[0].text}
                                    </div>
                                </Row>
                                <Row className='mb-3'>
                                    <Select options={optionsButton} classname={'admin-square'}/>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item className='bg-dark' eventKey='1'>
                            <Accordion.Header className='bg-dark'>{errorList.verif_document.title}</Accordion.Header>
                            <Accordion.Body className='bg-dark'>
                                <h5>Основной текст</h5>
                                <Row className='mb-3'>
                                    <TextArea
                                        onChange={
                                            (e) => setErrorList({...errorList, verif_document: {
                                                    title: errorList.verif_document.title,
                                                    text: e.target.value,
                                                    domainName: window.location.host,
                                                    errorName: errorList.verif_document.errorName,
                                                    button: errorList.verif_document.button
                                                }})
                                        }
                                        classnames='dark admin-square'
                                    />
                                    <b>Пример текста:</b> {defaultErrors[1].text}
                                </Row>
                                <Row className='mb-3'>
                                    <Select options={optionsButton} classname={'admin-square'}/>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item className='bg-dark' eventKey='2'>
                            <Accordion.Header className='bg-dark'>{errorList.insurance.title}</Accordion.Header>
                            <Accordion.Body className='bg-dark'>
                                <h5>Основной текст</h5>
                                <Row className='mb-3'>
                                    <TextArea
                                        onChange={
                                            (e) => setErrorList({...errorList, insurance: {
                                                    title: errorList.insurance.title,
                                                    text: e.target.value,
                                                    domainName: window.location.host,
                                                    errorName: errorList.insurance.errorName,
                                                    button: errorList.insurance.button
                                                }})
                                        }
                                        classnames='dark admin-square'
                                    />
                                    <b>Пример текста:</b> {defaultErrors[2].text}
                                </Row>
                                <Row className='mb-3'>
                                    <Select options={optionsButton} classname={'admin-square'}/>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item className='bg-dark' eventKey='3'>
                            <Accordion.Header className='bg-dark'>{errorList.premium.title}</Accordion.Header>
                            <Accordion.Body className='bg-dark'>
                                <h5>Основной текст</h5>
                                <Row className='mb-3'>
                                    <TextArea
                                        onChange={
                                            (e) => setErrorList({...errorList, premium: {
                                                    title: errorList.premium.title,
                                                    text: e.target.value,
                                                    domainName: window.location.host,
                                                    errorName: errorList.premium.errorName,
                                                    button: errorList.premium.button
                                                }})
                                        }
                                        classnames='dark admin-square'
                                    />
                                    <b>Пример текста:</b> {defaultErrors[3].text}
                                </Row>
                                <Row className='mb-3'>
                                    <Select options={optionsButton} classname={'admin-square'}/>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item className='bg-dark' eventKey='4'>
                            <Accordion.Header className='bg-dark'>{errorList.multi_account.title}</Accordion.Header>
                            <Accordion.Body className='bg-dark'>
                                <h5>Основной текст</h5>
                                <Row className='mb-3'>
                                    <TextArea
                                        onChange={
                                            (e) => setErrorList({...errorList, multi_account: {
                                                    title: errorList.multi_account.title,
                                                    text: e.target.value,
                                                    domainName: window.location.host,
                                                    errorName: errorList.multi_account.errorName,
                                                    button: errorList.multi_account.button
                                                }})
                                        }
                                        classnames='dark admin-square'
                                    />
                                    <b>Пример текста:</b> {defaultErrors[4].text}
                                </Row>
                                <Row className='mb-3'>
                                    <Select options={optionsButton} classname={'admin-square'}/>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <AdminButton type='submit' classname='green'>Создать</AdminButton>
                </AdminForm>

            </AdminButtonCard>

            <AdminButtonCard>
                <Table>
                    <TableHeader classname='d-none col-md-block' elems={tableHeaderDomains} />
                    <TableBody>
                        {
                            activeDomains
                                ? activeDomains.map(domain => {
                                    return(
                                        <Row className='mb-3 mt-3 domains-list-row'>
                                            <Col className='d-none d-md-block'>
                                                {domain.ID}
                                            </Col>
                                            <Col onClick={() => navigate(`/staff/domains/${domain.ID}`)}>
                                                {domain.full_domain_name}
                                            </Col>
                                            <Col>
                                                {domain.domain_owner}
                                            </Col>
                                            <Col className='d-none d-md-block'>
                                                {domain.date_of_create}
                                            </Col>
                                            <Col className='d-none d-md-block'>
                                                <AdminButton classname='orange' onClick={() => navigate(`/staff/domains/${domain.ID}`)}>Детальная</AdminButton>
                                            </Col>
                                        </Row>
                                    )
                                })
                                : <h5>No data!</h5>
                        }

                    </TableBody>
                </Table>
            </AdminButtonCard>
        </Container>
    )
}

CreateDomains.propTypes = {
    
}
CreateDomains.defaultProps = {
    
}

export default CreateDomains