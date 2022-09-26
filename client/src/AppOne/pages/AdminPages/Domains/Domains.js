import React, {useEffect, useState} from 'react'
import {Accordion, Col, Container, Modal, Row} from 'react-bootstrap';
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import {
    defaultErrors,
    domainSelect,
    domainsInputs, domainsInputsNums,
    optionsButton,
} from "../../../utils/staffConstants";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import './Domains.scss'
import {useForm} from "react-hook-form";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {v4 as uuid} from 'uuid'
import TextArea from "../../../components/UI/TextArea/TextArea";
import {postData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import cls from "../../NonAuthPages/SignIn/SignIn.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate} from "react-router-dom";
import ModalDark from "../../../components/UI/ModalDark/ModalDark";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";

const CreateDomains = () => {
    const [showDomain, setShowDomain] = useState(false)
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: "onBlur"
    })
    const [activeDomains, setActiveDomains] = useState([])
    const navigate = useNavigate()
    const [limit, setLimit] = useState(0)

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

    const designs = [
        {value: 'one', text: 'one'},
        {value: 'two', text: 'two'},
    ]
    const landings = [
        {value: 'one', text: 'one'},
        {value: 'two', text: 'two'},
    ]
    const list = ['BTC', 'ETH', 'USDT', 'TRX', 'TRX/USDT', 'SOL', 'BCH']

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
        data.minDepositSum = parseInt(data.minDepositSum)
        data.minWithdrawalSum = parseInt(data.minWithdrawalSum)
        // data.internalSwapFee = parseInt(data.internalSwapFee)
        data.currencySwapFee = parseInt(data.currencySwapFee)
        data.companyPhoneNumber = parseInt(data.companyPhoneNumber)
        data.companyYear = parseInt(data.companyYear)
        data.coinList = list
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
        const res = await postData('/staff/domains/create_domain/', data)
        const response = await res.data
        if (res.status === 201) {
            setShowDomain(true)
            reset({data: ''})
        }
    }

    const tableHeader = ['#001', '127.0.0.1:8000', 'super', 'Jan. 11, 2022, 10:21 a.m.']

    useEffect(async () => {
        // getActiveDomains()
        getDomains()
    }, [])

    const onDetail = (id) => {
        navigate(`/staff/domains/${id}`)
    }

    const getDomains = async () => {
        let obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            staffId: store.user.id,
            staffEmail: store.user.email,
            rootAccess: store.fullAccess
        }
        const res = await postData('/staff/domains/get_domain_list/', obj)
        setActiveDomains(res.data)
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

    useEffect(() => {
        getDomains()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    return (
        <Container>
            <Modal
              size='md'
              animation={false}
              style={{opacity: 1, zIndex: 9999}}
              show={showDomain}
              onHide={() => setShowDomain(false)}
              dialogClassName={`modal-window dark`}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Domain
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Domain was created successfully!
                </Modal.Body>
            </Modal>



            <AdminButtonCard>
                <h1 className='text-center'>Домены</h1>
            </AdminButtonCard>
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
                        Дизайн
                        <Select {...register('designName')} classname={'admin-square'} options={designs}/>
                        <ErrorMessage  name={'designName'} errors={errors} render={() => <p className={cls.error}>This field is required</p>} />
                    </Row>
                    <Row className={'mb-3 relative'}>
                        Лендинг
                        <Select {...register('landingName')} classname={'admin-square'} options={landings}/>
                        <ErrorMessage  name={'landingName'} errors={errors} render={() => <p className={cls.error}>This field is required</p>} />
                    </Row>
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
                <Row>
                    <Col className={'text-center'}>Domain</Col>
                    <Col className={'text-center'}>Action</Col>
                </Row>
                {
                    typeof activeDomains !== 'string'
                        ? activeDomains.map(domain => {
                            return(
                                <Row key={uuid()} className='mb-3 mt-3 domains-list-row'>
                                    <Col className={'text-center'} onClick={() => navigate(`/staff/domains/${domain.domainId}`)}>
                                        {domain.domainName}
                                    </Col>
                                    <Col className='d-none d-md-block text-center'>
                                        <AdminButton classname='orange' onClick={() => navigate(`/staff/domains/${domain.domainId}`)}>Детальная</AdminButton>
                                    </Col>
                                </Row>
                            )
                        })
                        : <h5>No data!</h5>
                }
                <Row className={'mb-3 mt-3'}>
                    {
                        activeDomains.length >= 10 ?
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

CreateDomains.propTypes = {
    
}
CreateDomains.defaultProps = {
    
}

export default CreateDomains