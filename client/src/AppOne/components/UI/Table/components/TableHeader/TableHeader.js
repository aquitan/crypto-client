import React from 'react'
import {Col, Row} from "react-bootstrap";
import '../../Table.scss'
import {v4 as uuid} from 'uuid'
import classNames from "classnames";

const TableHeader = ({elems, classname, theme}) => {
    let classes = classNames(
        'table_header',
        classname, theme
    )
    return (
        <Row className={classes}>
            {elems.map(element => {
                return(
                    <Col className='table_header_item text-center' key={uuid()}>{element}</Col>
                )
            })}
        </Row>
    )
}

export default TableHeader