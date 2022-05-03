import React from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row, Table} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import TableItem from "../../../components/UI/Table/components/TableItem/TableItem";
import ActiveGroups from "./ActiveGroups/ActiveGroups";

const GroupList = () => {
    const groupsOptions = [
        {value: 'All', text: 'Видны все'},
        {value: 'Visible', text: 'Видны после создания'},
    ]
    const headerData = ['Информация', 'Дата', 'Действие']
    return (
        <Container>
            <h1 className='m-4'>Создать группы</h1>
            <AdminButtonCard>
                <Row className='mb-3'>
                    <Col className='col-12 col-md-6 mb-3'>
                        <AdminInput placeholder='input'/>
                    </Col>
                    <Col className='col-12 col-md-6 mb-3'>
                        <Select classname='' options={groupsOptions}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AdminButton classname='green'>Создать</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard>
                <h2>Список групп</h2>
                <ActiveGroups />
                <ActiveGroups />
                <ActiveGroups />
            </AdminButtonCard>

        </Container>
    )
}

GroupList.propTypes = {

}
GroupList.defaultProps = {

}

export default GroupList