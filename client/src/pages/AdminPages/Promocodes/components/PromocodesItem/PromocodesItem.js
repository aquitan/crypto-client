import React from 'react'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import cls from '../../Promocodes.module.scss'

const PromocodesItem = ({id, code, reward, currency, onClick, btn}) => {
    return (
        <div>
            <Row className={cls.promocode_item}>
                <Col className='col-4 col-sm-2'>{code}</Col>
                <Col className='col-4 col-sm-2'>{reward}</Col>
                <Col className='col-2 d-none d-md-block'>{currency}</Col>
                {
                    btn ?
                        <Col className='col-4 col-sm-4'>
                            <AdminButton classname={['red', 'xs']} onClick={() => onClick(code)}>Удалить</AdminButton>
                        </Col>
                        : null
                }
            </Row>
        </div>
    )
}

export default PromocodesItem