import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../components/UI/AdminButton/AdminButton";
import './ActiveGroups.scss'
import {useNavigate} from "react-router-dom";

const ActiveGroups = () => {
    const navigate = useNavigate()
    return (
        <Row className='active-group mt-3'>
            <Col>
                10: NY, owner: Ozzy
            </Col>
            <Col>
                Создана: Jan. 30, 2021, 12:27 a.m.; Видны ли все True
            </Col>
            <Col>
                <AdminButton onClick={() => navigate('/staff/group-list/1')} classname='green xs'>Перейти</AdminButton>
            </Col>
            
        </Row>
    )
}

ActiveGroups.propTypes = {
    
}
ActiveGroups.defaultProps = {
    
}

export default ActiveGroups