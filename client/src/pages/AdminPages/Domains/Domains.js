import React from 'react'
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

const CreateDomains = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Container>
            <AdminButtonCard>
                <h2 className='mb-3 text-center'>Добавить новый домен</h2>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3'>
                        <Col>
                            <AdminInput placeholder='User email or name' />
                        </Col>
                        <Col>
                            <AdminInput placeholder='bitdomain.com' />
                        </Col>
                    </Row>
                    {
                        domainsInputs.map(input => {
                            return (
                                <Row className='mb-3'>
                                    {input.text}
                                    <AdminInput {...register(input.name, {
                                        required: true
                                    })} placeholder={input.text}/>
                                </Row>
                            )
                        })
                    }
                    {
                        domainSelect.map(select => {
                            return (
                                <Row className='mb-3'>
                                    {select.text}
                                    <Select placeholder={select.text} options={select.options} />
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
                    {
                        defaultErrors.map((error, index) => {
                            return(
                                <Accordion.Item key={uuid} className='bg-dark' eventKey={`${index}`}>
                                    <Accordion.Header className='bg-dark'>{error.name}</Accordion.Header>
                                    <Accordion.Body className='bg-dark'>
                                        <h5>Основной текст</h5>
                                        <Row className='mb-3'>
                                            {error.text}
                                        </Row>
                                        <Row className='mb-3'>
                                            <Select options={optionsButton}/>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })
                    }
                </Accordion>
            </AdminButtonCard>

            <AdminButtonCard>
                <Table>
                    <TableHeader elems={tableHeaderDomains} />
                    <TableBody>
                        <TableItem />
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