import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Accordion, Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import {
    defaultErrors,
    domainSelect,
    domainsInputs,
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
import TableItem from "../../../components/UI/Table/components/TableItem/TableItem";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {postData, putData} from "../../../services/StaffServices";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {store} from "../../../index";
import cls from "../../NonAuthPages/SignIn/SignIn.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate} from "react-router-dom";

const CreateDomains = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
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
        data.errorList = errorList
        data.dateOfDomainCreate = getCurrentDate()
        data.depositFee = parseInt(data.depositFee)
        data.rateCorrectSum = parseInt(data.rateCorrectSum)
        data.minDepositSum = parseInt(data.minDepositSum)
        data.minWithdrawalSum = parseInt(data.minWithdrawalSum)
        data.internalSwapFee = parseInt(data.internalSwapFee)
        data.currencySwapFee = parseInt(data.currencySwapFee)
        data.staffId = 1
        console.log(data)
        const res = await putData('/staff/domains/create_domain/', data)
        const response = await res.data
        console.log('res', response)
    }


    useEffect(async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            staffEmail: store.userEmail
        }
        const res = await postData('/staff/domains/get_active_domains/', obj)
        console.log('get domains', res.data)
    }, [])

    const onDetail = (id) => {
        navigate(`/staff/domains/${id}`)
    }

    return (
        <Container>
            <h1 className='mt-4'>Домены</h1>
            <AdminButtonCard>
                <h2 className='mb-3 text-center'>Добавить новый домен</h2>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3'>
                        <Col>
                            <AdminInput {...register('staffEmail', {
                                required: true
                            })} placeholder='User email or name' />
                            <ErrorMessage  name='staffEmail' errors={errors} render={() => <p className={cls.error}>enter staff email or name</p>} />
                        </Col>
                        <Col>
                            <AdminInput {...register('fullDomainName', {
                                required: true,
                            })} placeholder='bitdomain.com' />
                            <ErrorMessage  name='fullDomainName' errors={errors} render={() => <p className={cls.error}>enter domain name</p>} />
                        </Col>
                    </Row>
                    {
                        domainsInputs.map(input => {
                            return (
                                <Row key={uuid()} className='mb-3'>
                                    {input.text}
                                    <AdminInput type={input.inp} {...register(input.name, {
                                        required: true
                                    })} placeholder={input.text}/>
                                    <ErrorMessage  name={input.name} errors={errors} render={() => <p className={cls.error}>This field is required</p>} />
                                </Row>
                            )
                        })
                    }
                    {
                        domainSelect.map(select => {
                            return (
                                <Row key={uuid()} className='mb-3'>
                                    {select.text}
                                    <Select {...register(select.name)} placeholder={select.text} options={select.options} />
                                    <ErrorMessage  name={select.name} errors={errors} render={() => <p className={cls.error}>This field is required</p>} />
                                </Row>
                            )
                        })
                    }
                    <AdminButton type='submit' classname='green'>Создать</AdminButton>
                </AdminForm>

            </AdminButtonCard>
            <AdminButtonCard>
                <h2 className='mb-3'>Дефолтные ошибки</h2>
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item className='bg-dark' eventKey='0'>
                        <Accordion.Header className='bg-dark'>{errorList.verif_address.title}</Accordion.Header>
                        <Accordion.Body className='bg-dark'>
                            <h5>Основной текст</h5>
                            <Row className='mb-3'>
                                <TextArea
                                    onChange={
                                        (e) => setErrorList({...errorList, verif_address: {
                                                title: errorList.verif_address.title,
                                                text: e.target.value
                                            }})
                                    }
                                    classnames='dark'
                                    value={errorList.verif_address.text} />
                            </Row>
                            <Row className='mb-3'>
                                <Select options={optionsButton}/>
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
                                                text: e.target.value
                                            }})
                                    }
                                    classnames='dark'
                                    value={errorList.verif_document.text} />
                            </Row>
                            <Row className='mb-3'>
                                <Select options={optionsButton}/>
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
                                                text: e.target.value
                                            }})
                                    }
                                    classnames='dark'
                                    value={errorList.insurance.text} />
                            </Row>
                            <Row className='mb-3'>
                                <Select options={optionsButton}/>
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
                                                text: e.target.value
                                            }})
                                    }
                                    classnames='dark'
                                    value={errorList.premium.text} />
                            </Row>
                            <Row className='mb-3'>
                                <Select options={optionsButton}/>
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
                                                text: e.target.value
                                            }})
                                    }
                                    classnames='dark'
                                    value={errorList.multi_account.text} />
                            </Row>
                            <Row className='mb-3'>
                                <Select options={optionsButton}/>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </AdminButtonCard>

            <AdminButtonCard>
                <Table>
                    <TableHeader elems={tableHeaderDomains} />
                    <TableBody>
                        <TableItem elems={tableHeader} btn={'детальная'} onClick={onDetail} id={1} />
                        <TableItem elems={tableHeader} btn={'детальная'} onClick={onDetail} id={2} />
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