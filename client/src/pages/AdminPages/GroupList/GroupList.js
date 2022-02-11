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

const GroupList = () => {
    const groupsOptions = [
        {value: 'All', text: 'Видны все'},
        {value: 'Visible', text: 'Видны после создания'},
    ]
    const headerData = ['Информация', 'Дата', 'Действие']
    return (
        <Container>
            <h1 className='mt-4'>Создать группы</h1>
            <AdminButtonCard>
                <Row className='mb-3'>
                    <Col className='col-6'>
                        <AdminInput placeholder='input'/>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col className='col-6'>
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
                <Table>
                    <TableHeader elems={headerData} />
                    <TableBody>
                        <TableItem />
                    </TableBody>
                </Table>
            </AdminButtonCard>

        </Container>
    )
}

GroupList.propTypes = {

}
GroupList.defaultProps = {

}

export default GroupList