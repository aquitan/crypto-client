import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../AdminButton/AdminButton";
import '../../Table.scss'
import {v4 as uuid} from 'uuid'

const TableItem = ({elems, btn, id, onClick}) => {

    const onBtnClick = (e) => {
        if (btn === 'детальная') {
            return onClick(id)
        }
        onClick(e)
    }

    return (
        <Row className='table_item'>
            {
                elems ?
                    <>
                        {
                            elems.map(elem => {
                                return <Col key={uuid()}>{elem}</Col>
                            })
                        }
                        {
                            btn ? <Col>
                                        <AdminButton onClick={onBtnClick} classname='orange xs'>{btn}</AdminButton>
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
    elems: PropTypes.array,
    edit: PropTypes.string
}
TableItem.defaultProps = {
    
}

export default TableItem