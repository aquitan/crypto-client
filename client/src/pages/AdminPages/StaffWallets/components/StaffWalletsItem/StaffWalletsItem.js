import React from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../StaffWallets.module.scss'


const StaffWalletsItem = (props) => {
    return (
        <div>
            <Row className={`${cls.wallet_item} mb-3`}>
                <Col>
                    {props.id}
                </Col>
                <Col>
                    {props.name}
                </Col>
                <Col>
                    {props.currency}
                </Col>
                <Col>
                    {props.address}
                </Col>
                <Col>
                    {props.total}
                </Col>
                <Col>
                    {props.last}
                </Col>
            </Row>
        </div>
    )
}

export default StaffWalletsItem