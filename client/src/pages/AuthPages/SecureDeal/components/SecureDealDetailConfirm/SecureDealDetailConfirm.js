import React from 'react'
import PropTypes from 'prop-types'
import cls from './SecureDealDetailConfirm.module.scss'
import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";

const SecureDealDetailConfirm = ({onClick, onDecline}) => {
    return (
        <div className={cls.golden_plate} >
            <Row className='align-items-center'>
                <Col>
                    To accept participation please click 'Accept' button
                </Col>
                <Col>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button onClick={onClick} classname={['small_btn', 'green_btn']}>Accept</Button>
                        </Col>
                        <Col><Button onClick={() => onDecline(false)} classname={['small_btn', 'red_btn']}>Decline</Button></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

SecureDealDetailConfirm.propTypes = {

}
SecureDealDetailConfirm.defaultProps = {

}

export default SecureDealDetailConfirm