import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import TableItem from "../../../components/UI/Table/components/TableItem/TableItem";
import ActiveGroups from "./ActiveGroups/ActiveGroups";
import {useForm} from "react-hook-form";
import {deleteData, postData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {store} from "../../../index";

const GroupList = () => {
    const {register, handleSubmit} = useForm()
    const [list, setList] = useState([])
    const groupsOptions = [
        {value: true, text: 'Видны'},
        {value: false, text: 'Не видны'},
    ]
    const headerData = ['Информация', 'Дата', 'Действие']

    const onSubmit = async (data) => {
        data.currentDate = dateToTimestamp()
        data.creatorId = store.user.id
        data.staffEmail = store.user.email
        data.viewParams = data.viewParams === 'true' ? true : false
        const res = await postData('/staff/groups/create_new_group/', data)
    }

    useEffect(() => {
        getGroupList()
    }, [])

    const getGroupList = async () => {
        const obj = {
            staffEmail: store.user.email,
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess
        }
        const res = await postData('/staff/groups/get_group_list/', obj)
        setList(res.data)

    }
    const onDelete = async (id) => {
        const obj = {
            staffEmail: store.user.email,
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            groupId: id
        }
        const res = await deleteData('/staff/groups/delete_group/', {data: obj})
        console.log('id', id)
        getGroupList()
    }

    return (
        <Container>
            <h1 className='m-4'>Создать группы</h1>
            <AdminButtonCard>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3'>
                        <Col className='col-12 col-md-6 mb-3'>
                            <AdminInput {...register('groupName')} placeholder='Название группы'/>
                        </Col>
                        <Col className='col-12 col-md-6 mb-3'>
                            <Select {...register('viewParams')} getAvalue={true} classname={'admin-square'} options={groupsOptions}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AdminButton classname='green'>Создать</AdminButton>
                        </Col>
                    </Row>
                </Form>
            </AdminButtonCard>

            <AdminButtonCard>
                <h2>Список групп</h2>
                {
                    list.length ?
                        list.map(item => {
                            return <ActiveGroups
                                dateOfCreate={item.dateOfCreate}
                                groupName={item.groupName}
                                item={item}
                                onDelete={onDelete}
                                id={item._id}
                            />
                        })
                        : <h3>No groups!</h3>
                }

            </AdminButtonCard>

        </Container>
    )
}

GroupList.propTypes = {

}
GroupList.defaultProps = {

}

export default GroupList