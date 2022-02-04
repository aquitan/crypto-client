import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import '../../Table.scss'

const TableHeader = ({elems}) => {
    return (
        <Row className='table_header'>
            {elems.map(element => {
                return(
                    <Col>{element}</Col>
                )
            })}
        </Row>
    )
}

TableHeader.propTypes = {
    
}
TableHeader.defaultProps = {
    
}

export default TableHeader