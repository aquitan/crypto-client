import React from 'react'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import cls from '../../Promocodes.module.scss'

const PromocodesItem = (props) => {
    return (
        <div>
            <Row className={cls.promocode_item}>
                <Col>{props.id}</Col>
                <Col>{props.code}</Col>
                <Col>{props.reward}</Col>
                <Col>{props.cuurrency}</Col>
                <Col>
                    <AdminButton classname='red xs' onClick={() => props.onClick(props.id)}>Удалить</AdminButton>
                </Col>
            </Row>
        </div>
    )
}

export default PromocodesItem