import React from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import InputRadio from "../../../components/UI/InputRadio/InputRadio";
import './SecureDeal.scss'
import Input from "../../../components/UI/Input/Input";
import TextArea from "../../../components/UI/TextArea/TextArea";

const SecureDeal = () => {
    return (
        <Container>
            <h1 className='mb-4 mt-4'>Create new secure deal</h1>
            <Card className='p-4'>

                <Row className='mb-3 pb-2 secure_deal_row'>
                    <h4 className='mb-3'>Step 1: Choose your role</h4>
                    <p>You can buy or sell anything securely via our platform.</p>
                    <Row>
                        <Col className='secure_deal_col'>
                            <label htmlFor='seller'>Seller</label>
                            <InputRadio id='seller' name='role' />
                        </Col>
                        <Col className='secure_deal_col'>
                            <label htmlFor='buyer'>Buyer</label>
                            <InputRadio id='buyer' name='role' />
                        </Col>
                    </Row>
                </Row>
                <Row className='mb-3 pb-2'>
                    <h4 className='mb-3'>Step 2: Participant</h4>
                    <p>Please enter username or email of another participant. User should have account at localhost</p>
                    <Col>
                        <Input placeholder='Second party name' />
                    </Col>
                </Row>
                <Row className='mb-3 pb-2'>
                    <h4 className='mb-3'>Step 3: Deal conditions</h4>
                    <p>Please describe all aspects of the deal as accurately as possible.
                        Do not use special professional vocabulary,
                        they must be clear to the third party, a Guarantor.
                        The resolution of possible disputes will depend on this.</p>
                    <Col>
                        <TextArea classnames='textarea_bordered' placeholder='Deal conditions' />
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

SecureDeal.propTypes = {
    
}
SecureDeal.defaultProps = {
    
}

export default SecureDeal