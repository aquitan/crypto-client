import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../components/UI/AdminButton/AdminButton";
import './ActiveGroups.scss'
import {useNavigate} from "react-router-dom";
import {getCurrentDate} from "../../../../utils/getCurrentDate";

const ActiveGroups = ({dateOfCreate, groupName, item, onDelete, id}) => {
    const navigate = useNavigate()
    return (
        <Row className='active-group mt-3'>
            <Col>
                {getCurrentDate(dateOfCreate)}
            </Col>
            <Col className='d-none d-sm-block'>
                {groupName}
            </Col>
            <Col>
                <AdminButton onClick={() => navigate(`/staff/group-list/group`, {state: item})} classname={['green', 'xs']}>Перейти</AdminButton>
            </Col>
            <Col>
                <AdminButton onClick={() => onDelete(id)} classname={['red', 'xs']}>Удалить</AdminButton>
            </Col>
            
        </Row>
    )
}

ActiveGroups.propTypes = {
    
}
ActiveGroups.defaultProps = {
    
}

export default ActiveGroups