import React from 'react'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import cls from '../../Promocodes.module.scss'

const PromocodesItem = ({id, code, reward, currency, onClick}) => {
    return (
        <div>
            <Row className={cls.promocode_item}>
                <Col className='col-4 col-sm-2'>{code}</Col>
                <Col className='col-4 col-sm-2'>{reward}</Col>
                <Col className='col-2 d-none d-md-block'>{currency}</Col>
                <Col className='col-4 col-sm-4'>
                    <AdminButton classname={['red', 'xs']} onClick={() => onClick(id)}>Удалить</AdminButton>
                </Col>
            </Row>
        </div>
    )
}

export default PromocodesItem