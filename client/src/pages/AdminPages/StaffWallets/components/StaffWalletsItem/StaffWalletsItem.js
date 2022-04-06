import React from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../StaffWallets.module.scss'
import {useNavigate} from "react-router-dom";


const StaffWalletsItem = (props) => {
    const navigate = useNavigate()
    return (
        <div>
            <Row className={`${cls.wallet_item} mb-3`}>
                <Col className='d-none d-md-block'>
                    {props.id}
                </Col>
                <Col>
                    {props.name}
                </Col>
                <Col className='d-none d-md-block'>
                    {props.currency}
                </Col>
                <Col onClick={() => navigate(`/staff/users/${props.id}`)}>
                    {props.address}
                </Col>
                <Col className='d-none d-md-block'>
                    {props.total}
                </Col>
                <Col className='d-none d-md-block'>
                    {props.last}
                </Col>
            </Row>
        </div>
    )
}

export default StaffWalletsItem