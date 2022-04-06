import React from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Row} from "react-bootstrap";
import './AdminButtonCard.scss'

const AdminButtonCard = ({children, title}) => {
    return (
        <Card className='bg_black admin-black-card mt-3 mb-3'>
            <Row className='pt-3 pb-3 align-items-center'>
                <Row className='mb-1'>
                    <Col className='col-12'>
                        <h2>{title}</h2>
                    </Col>
                </Row>
                <Row className='p-3 mt-1'>
                    {children}
                </Row>
            </Row>
        </Card>
    )
}

AdminButtonCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}
AdminButtonCard.defaultProps = {

}

export default AdminButtonCard