import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../AdminButton/AdminButton";
import '../../Table.scss'

const TableItem = () => {
    return (
        <Row className='table_item'>
            <Col>
                #001
            </Col>
            <Col>
                127.0.0.1:8000
            </Col>
            <Col>
                super
            </Col>
            <Col>
                Jan. 11, 2022, 10:21 a.m.
            </Col>
            <Col>
                <AdminButton classname='orange xs'>Редактировать</AdminButton>
            </Col>
            
        </Row>
    )
}

TableItem.propTypes = {
    
}
TableItem.defaultProps = {
    
}

export default TableItem