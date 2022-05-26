import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {useNavigate} from "react-router-dom";

const RecruiterList = () => {
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    return (
        <Container>
            <AdminButtonCard>
                <h1>Список рекрутеров</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row style={{borderBottom: '1px solid #fff', paddingBottom: 10}}>
                    <Col className={'text-center'}>Username</Col>
                    <Col className={'text-center'}>User count</Col>
                    <Col className={'text-center'}>Registration time</Col>
                    <Col className={'text-center'}>Action</Col>
                </Row>
                <Row style={{padding: '20px 0', borderBottom: '1px solid #fff'}}>
                    <Col className={'text-center'}><span style={{cursor: 'pointer'}} onClick={() => navigate('/staff/recruiter-detail')}>tetraprotons</span></Col>
                    <Col className={'text-center'}>42</Col>
                    <Col className={'text-center'}>Feb. 26, 2021, 3:22 p.m.</Col>
                    <Col className={'text-center'}>
                        <Row>
                            <Col><AdminButton classname={['orange', 'xs']}>Ban</AdminButton></Col>
                            <Col><AdminButton classname={['red', 'xs']}>Delete</AdminButton></Col>
                            <Col><AdminButton classname={['green', 'xs']}>Unbind</AdminButton></Col>
                        </Row>
                    </Col>
                </Row>
            </AdminButtonCard>
            
        </Container>
    )
}

RecruiterList.propTypes = {
    
}
RecruiterList.defaultProps = {
    
}

export default RecruiterList