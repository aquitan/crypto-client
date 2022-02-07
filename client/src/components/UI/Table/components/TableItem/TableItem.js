import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../AdminButton/AdminButton";
import '../../Table.scss'

const TableItem = ({elems}) => {
    return (
        <Row className='table_item'>
            {
                elems ?
                    <>
                        {
                            elems.map(elem => {
                                return <Col>{elem}</Col>
                            })
                        }
                        <Col>
                            <AdminButton classname='orange xs'>Редактировать</AdminButton>
                        </Col>
                    </>
                    : <p className='text-center'>No users detected!</p>
            }
            
        </Row>
    )
}

TableItem.propTypes = {
    
}
TableItem.defaultProps = {
    
}

export default TableItem