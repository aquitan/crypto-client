import React from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Row} from "react-bootstrap";
import './AdminButtonCard.scss'
import classNames from "classnames";

const AdminButtonCard = ({children, title, classname}) => {
    const classes = classNames(
        ['bg_black', 'admin-black-card', 'mt-3', 'mb-3'],
        classname
    )

    return (
        <Card className={classes}>
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
    children: PropTypes.node,
    classname: PropTypes.string
}
AdminButtonCard.defaultProps = {

}

export default AdminButtonCard