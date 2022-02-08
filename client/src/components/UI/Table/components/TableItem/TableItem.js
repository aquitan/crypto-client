import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../AdminButton/AdminButton";
import '../../Table.scss'

const TableItem = ({elems, edit}) => {
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
                        {
                            !edit ? <Col>
                                        <AdminButton classname='orange xs'>Редактировать</AdminButton>
                                    </Col>
                                : null
                        }
                    </>
                    : <p className='text-center'>No data detected!</p>
            }
            
        </Row>
    )
}

TableItem.propTypes = {
    
}
TableItem.defaultProps = {
    
}

export default TableItem