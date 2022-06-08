import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {store} from "../../../../../../index";
import '../../StaffErrors.scss'
import {useNavigate} from "react-router-dom";

const StaffErrorItem = ({data}) => {
    const navigate = useNavigate()

    const onEditClick = () => {
        navigate(`/staff/staff-errors/${data.ID}`)
    }

    return (
        <Row className='errors_error_item'>
            <Row className='mb-2'>
                <Col className='col-2'>ID</Col>
                <Col>{data._id}</Col>
            </Row>
            <Row className='mb-2'>
                <Col className='col-2'>Error name</Col>
                <Col>{data.errorName}</Col>
            </Row>
            <Row className='mb-2'>
                <Col className='col-2'>Error title</Col>
                <Col>{data.errorTitle}</Col>
            </Row>
            <Row className='mb-2'>
                <Col className='col-2'>Error text</Col>
                <Col>{data.errorText}</Col>
            </Row>
            <Row className='mb-2'>
                <Col className='col-2'>Button type</Col>

                <Col>
                    <p>{`"${data.errorButton}"`}</p>
                    {/*<AdminButton onClick={onEditClick} classname={['orange', 'small']}>Edit</AdminButton>*/}
                </Col>
            </Row>
        </Row>
    )
}

StaffErrorItem.propTypes = {
    
}
StaffErrorItem.defaultProps = {
    
}

export default StaffErrorItem