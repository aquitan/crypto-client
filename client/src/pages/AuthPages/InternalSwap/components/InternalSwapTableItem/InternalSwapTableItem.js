import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";

const InternalSwapTableItem = ({date, operation}) => {
    return (
        <Row>
            <Col>{date}</Col>
            <Col>{operation}</Col>
        </Row>
    )
}

InternalSwapTableItem.propTypes = {
    data: PropTypes.string,
    operation: PropTypes.string
    
}
InternalSwapTableItem.defaultProps = {
    
}

export default InternalSwapTableItem