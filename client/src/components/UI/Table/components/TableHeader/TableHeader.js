import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import '../../Table.scss'
import {v4 as uuid} from 'uuid'
import classNames from "classnames";

const TableHeader = ({elems, classname}) => {
    let classes = classNames(
        'table_header',
        classname
    )
    return (
        <Row className={classes}>
            {elems.map(element => {
                return(
                    <Col className='table_header_item' key={uuid()}>{element}</Col>
                )
            })}
        </Row>
    )
}

TableHeader.propTypes = {
    elems: PropTypes.array,
    classname: PropTypes.string
}
TableHeader.defaultProps = {
    
}

export default TableHeader