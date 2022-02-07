import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../AdminButton/AdminButton";
import {faCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const TableItemCreateUser = ({users}) => {
    const navigate = useNavigate()
    return (
        <>
            {
                users.map(user => {
                    return(
                        <Row className='table_item'>
                            <Col>{user.user_id}</Col>
                            <Col>{user.name}</Col>
                            <Col>{user.name}</Col>
                            <Col>0</Col>
                            <Col>{user.isStaff ? <FontAwesomeIcon color={'green'} icon={faCheck} /> : <FontAwesomeIcon color={'tomato'} icon={faTimesCircle}/>}</Col>
                            <Col>{user.date_of_entry}</Col>
                            <Col>Profit percent 75%</Col>
                            <Col>1 BTC</Col>
                            <Col>
                                <AdminButton onClick={() => navigate(`/staff/users/${user.user_id}`)} classname={'orange'} >Edit</AdminButton>
                            </Col>

                        </Row>
                    )
                })
            }
        </>
    )
}

TableItemCreateUser.propTypes = {
    
}
TableItemCreateUser.defaultProps = {
    
}

export default TableItemCreateUser