import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import {getData, putData} from "../../../../../services/StaffServices";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import DomainsDetailTableItem from "../DomainsDetailTableItem/DomainDetailTableItem";
import {useForm} from "react-hook-form";
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {ErrorMessage} from "@hookform/error-message";
import cls from "../../../../NonAuthPages/SignIn/SignIn.module.scss";
import {domainSelect, domainsInputs} from "../../../../../utils/staffConstants";
import Select from "../../../../../components/UI/Select/Select";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import {v4 as uuid} from 'uuid'
import StaffErrorItem from "../../../StaffErrors/components/StaffErrorItem/StaffErrorItem";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";


const DomainsDetail = () => {
    const [state, setState] = useState({
        domain: '',
        errors: '',
        options: ''
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    useEffect(() => {
        getDomainData()
    }, [])

    const getDomainData = async () => {
        const res = await getData(`/staff/domains/domain_detail/${1}/`)
        const resErrors = await getData(`/staff/errors/get_all_errors/${1}`)
        setState({domain: res.data.domain_detail, errors: resErrors.data.domain_detail})
        console.log('detail data', res.data)
    }

    console.log('state', state.domain)

    const onSubmit = async (data) => {
        data.dateOfDomainCreate = dateToTimestamp()
        data.depositFee = parseInt(data.depositFee)
        data.rateCorrectSum = parseInt(data.rateCorrectSum)
        data.minDepositSum = parseInt(data.minDepositSum)
        data.minWithdrawalSum = parseInt(data.minWithdrawalSum)
        data.internalSwapFee = parseInt(data.internalSwapFee)
        data.currencySwapFee = parseInt(data.currencySwapFee)
        data.staffId = 1
        const res = await putData('/staff/domains/create_domain/', data)
        const response = await res.data
    }


    return (
        <Container>
            <h1 className='mb-4 mt-4'>Детальная информация о LocalHost</h1>
            <AdminButtonCard>
                {
                    state.domain ? <DomainsDetailTableItem data={state.domain} /> : <Preloader />
                }
            </AdminButtonCard>
            <AdminButtonCard>
                <h2 className='mb-3 text-center'>Редактировать домен LocalHost</h2>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
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
                    <AdminButton type='submit' classname='green'>Подтвердить</AdminButton>
                </AdminForm>
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
                <AdminForm>
                    <Row className='mb-3'>
                        <Select options={['1', '2', '3']} />
                    </Row>
                    <Row className='mb-3'>
                        <AdminInput placeholder='Новый заголовок'/>
                    </Row>
                    <Row className='mb-3'>
                        <TextArea classnames='dark' placeholder='Новый текст'/>
                    </Row>
                    <Row className='mb-3'>
                        <Select options={['1', '2', '3']} />
                    </Row>
                    <AdminButton classname='green'>Изменить</AdminButton>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}

DomainsDetail.propTypes = {

}
DomainsDetail.defaultProps = {

}

export default DomainsDetail