import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";

const DomainsDetailTableItem = ({data}) => {
    return (
        <>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    ID
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.ID}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Адрес компании
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.company_address}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Страна
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.company_country}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Почта
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.company_email}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Имя владельца
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.company_owner_name}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Телефон
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.company_phone_number}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Год создания
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.company_year}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Комиссия на свапе
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.currency_swap_fee}%
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Дата создания
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.date_of_create}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Комиссия на депозите
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.deposit_fee}%
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Создатель домена
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.domain_owner}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Удваивать депозит
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.double_deposit === 1 ? 'Да' : 'Нет'}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Полное название домена
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.full_domain_name}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Комиссия на свапе
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.internal_swap_fee}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Минимальная сумма депозита
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.min_deposit_sum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Минимальная сумма вывода
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.min_withdrawal_sum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Корректировка курса
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.rate_correct_sum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-6 col-md-2'>
                    Показывать новости
                </Col>
                <Col className='col-6 col-md-2'>
                    {data.show_news === 1 ? 'Да' : 'Нет'}
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