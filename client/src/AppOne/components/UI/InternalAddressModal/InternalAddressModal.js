import React from 'react'
import cls from "../Modal/Modal.module.scss";
import {Col, Row} from "react-bootstrap";
import Button from "../Button/Button";

const InternalAddressModal = ({active, setActive, from, to, amount, currency}) => {
    let classes = [cls.modal]
    if (active) {
        classes.push(cls.modal_active)
    }
    return (
        <div className={classes.join(' ')} onClick={() => setActive(false)}>
            <div className={cls.modal_content} onClick={(e) => e.stopPropagation()}>
                <Row className='text-center mb-3'>
                    <h4>Transfer</h4>
                    <Row>
                        <Row className='text-center'><b>From:</b> <span>{from}</span></Row>
                        <Row className='text-center'><b>To:</b> <span>{to}</span></Row>
                    </Row>
                    <Row>
                        <Col>Amount: {amount} {currency}</Col>
                    </Row>
                </Row>
                <Row className='justify-content-center'>
                    <Button onClick={() => setActive(false)} classname={['small_btn']}>Ok</Button>
                </Row>
            </div>
        </div>
    )
}

export default InternalAddressModal