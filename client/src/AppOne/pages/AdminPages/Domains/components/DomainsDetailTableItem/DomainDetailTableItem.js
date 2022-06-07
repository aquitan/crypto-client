import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";

const DomainsDetailTableItem = ({data, params}) => {
    return (
        <>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    ID
                </Col>
                <Col className='col-6 col-md-2'>
                    {data._id}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Адрес компании
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.companyAddress}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Страна
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.companyCountry}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Почта
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.companyEmail}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Имя владельца
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.companyOwnerName}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Телефон
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.companyPhoneNumber}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Год создания
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.companyYear}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Дата создания
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.dateOfCreate}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Комиссия на депозите
                </Col>
                <Col className='col-6 col-md-2'>
                    {params.depositFee}%
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Создатель домена
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.domainOwner}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Удваивать депозит
                </Col>
                <Col className='col-6 col-md-2'>
                    {params.doubleDeposit ? 'Да' : 'Нет'}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Полное название домена
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.fullDomainName}
                </Col>
            </Row>

            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Минимальная сумма депозита
                </Col>
                <Col className='col-6 col-md-2'>
                    {params.minDepositSum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Минимальная сумма вывода
                </Col>
                <Col className='col-6 col-md-2'>
                    {params.minWithdrawalSum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Корректировка курса
                </Col>
                <Col className='col-6 col-md-2'>
                    {params.rateCorrectSum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Показывать новости
                </Col>
                <Col className='col-6 col-md-2'>
                    {params.showNews ? 'Да' : 'Нет'}
                </Col>
            </Row>
        </>
    )
}

DomainsDetailTableItem.propTypes = {

}
DomainsDetailTableItem.defaultProps = {

}

export default DomainsDetailTableItem