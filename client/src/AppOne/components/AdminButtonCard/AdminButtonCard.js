import React from 'react'
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
            <Row className='pt-3 pb-3 px-2 align-items-center'>
                <Row className='mb-1 py-0'>
                    <Col className='col-12'>
                        <h2>{title}</h2>
                    </Col>
                </Row>
                <Row className='py-0 p-md-3 mt-1'>
                    {children}
                </Row>
            </Row>
        </Card>
    )
}

export default AdminButtonCard