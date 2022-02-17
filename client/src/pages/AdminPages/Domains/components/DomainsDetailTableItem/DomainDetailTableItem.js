import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";

const DomainsDetailTableItem = ({data}) => {
    console.log('asfasfasfaf', data)
    return (
        <>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    ID
                </Col>
                <Col>
                    {data.ID}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Адрес компании
                </Col>
                <Col>
                    {data.company_address}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Страна
                </Col>
                <Col>
                    {data.company_country}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Почта
                </Col>
                <Col>
                    {data.company_email}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Имя владельца
                </Col>
                <Col>
                    {data.company_owner_name}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Телефон
                </Col>
                <Col>
                    {data.company_phone_number}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Год создания
                </Col>
                <Col>
                    {data.company_year}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Комиссия на свапе
                </Col>
                <Col>
                    {data.currency_swap_fee}%
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Дата создания
                </Col>
                <Col>
                    {data.date_of_create}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Комиссия на депозите
                </Col>
                <Col>
                    {data.deposit_fee}%
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Создатель домена
                </Col>
                <Col>
                    {data.domain_owner}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Удваивать депозит
                </Col>
                <Col>
                    {data.double_deposit === 1 ? 'Да' : 'Нет'}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Полное название домена
                </Col>
                <Col>
                    {data.full_domain_name}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Комиссия на свапе
                </Col>
                <Col>
                    {data.internal_swap_fee}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Минимальная сумма депозита
                </Col>
                <Col>
                    {data.min_deposit_sum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Минимальная сумма вывода
                </Col>
                <Col>
                    {data.min_withdrawal_sum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Корректировка курса
                </Col>
                <Col>
                    {data.rate_correct_sum}
                </Col>
            </Row>
            <Row className='mb-3 domain_table_item'>
                <Col className='col-2'>
                    Показывать новости
                </Col>
                <Col>
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