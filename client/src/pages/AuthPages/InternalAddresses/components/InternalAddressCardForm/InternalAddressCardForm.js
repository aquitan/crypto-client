import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import error from "../../../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";

const InternalAddressCardForm = ({checkAddress, currency, setFormData}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const onClick = (data) => {
        data.currency = currency
        setFormData(data)
    }

    return (
        <div>
            <Row className='mb-5'>
                <Col className='col mb-3'>
                    <Input {...register('wallet', {
                        required: 'Invalid wallet',
                        validate: value => checkAddress(value) || 'Invalid wallet'
                    })} placeholder='address' />
                    <ErrorMessage  name='wallet' errors={errors} render={({message}) => <p className={error.error}>{message}</p>} />
                </Col>
                <Col className='col'>
                    <Input {...register('amount', {
                        required: true,
                        pattern: /(\d+(?:\.\d+)?)/
                    })} placeholder='amount' />
                    <ErrorMessage  name='amount' errors={errors} render={() => <p className={error.error}>Only numbers allowed</p>} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={handleSubmit(onClick)} classname={['small_btn']}>Send</Button>
                </Col>
            </Row>
        </div>
    )
}

InternalAddressCardForm.propTypes = {
    
}
InternalAddressCardForm.defaultProps = {
    
}

export default InternalAddressCardForm