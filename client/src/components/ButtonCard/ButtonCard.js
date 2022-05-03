import React from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Row} from "react-bootstrap";
import cls from './ButtonCard.module.scss'
import classNames from "classnames/bind";

const ButtonCard = ({children, title, classname}) => {
    const cx = classNames.bind(cls)
    const classes = cx('button-card')

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

ButtonCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    classname: PropTypes.string
}
ButtonCard.defaultProps = {

}

export default ButtonCard