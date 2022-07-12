import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../components/AdminButtonCard/AdminButtonCard";
import AdminButton from "../../../../components/UI/AdminButton/AdminButton";
import './GroupDetails.scss'
import {useLocation} from "react-router-dom";
import {getCurrentDate} from "../../../../utils/getCurrentDate";
import AdminInput from "../../../../components/UI/AdminInput/AdminInput";
import {deleteData, patchData, postData} from "../../../../services/StaffServices";
import {useForm} from "react-hook-form";
import {store} from "../../../../../index";
import Modal from "../../../../components/UI/Modal/Modal";
import {log} from "util";
import {SwalSimple} from "../../../../utils/SweetAlert";

const GroupDetails = () => {
    const {register, handleSubmit, reset} = useForm()
    const {register: regDelete, handleSubmit: handleDelete, reset: resetDelete} = useForm()
    const [isModal, setIsModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const location = useLocation()
    const [list, setList] = useState(location.state.item.groupUsers)

    const addUser = async (data) => {
        data.groupId = location.state.item.groupData._id
        const res = await patchData('/staff/groups/add_new_group_member/', data)
        if (res.status === 200 || res.status === 201) {
            SwalSimple('Пользователь добавлен')
            reset({data: ''})
            getGroupList(location.state.index)
        } else {
            SwalSimple('Что-то пошло не так!')
        }
    }
    const deleteUser = async (data) => {
        data.groupId = location.state.item.groupData._id
        data.staffId = store.user.id
        data.rootAccess = store.fullAccess
        data.isAdmin = store.isAdmin
        data.isStaff = store.isStaff
        const res = await deleteData('/staff/groups/delete_user_from_group/', {data: data})
        if (res.status === 202) {
            SwalSimple('Пользователь удален')
            resetDelete({data: ''})
            getGroupList(location.state.index)
        } else if (res.status === 200) {
            SwalSimple('Если вы не создатель группы, вы не можете удалить пользователя!')
        }
    }

    useEffect(() => {
        getGroupList(location.state.index)
    }, [])

    const getGroupList = async (index) => {
        const obj = {
            staffEmail: store.user.email,
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess
        }
        const res = await postData('/staff/groups/get_group_list/', obj)
        console.log('group list', res.data.groupUsers)
        setList(res.data[index].groupUsers)
    }

    console.log('location', location)

    const {groupData, groupUsers} = location.state.item
    console.log('groupData', groupData.groupName)
    return (
        <Container>
            <Modal active={isModal} setActive={setIsModal} title={titleModal}>

            </Modal>

            <AdminButtonCard title='Данные по группе' >
                <Row className='mb-3'>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Создатель
                            </Col>
                            <Col>
                                {location.state.item.ownerEmail}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Нзвание
                            </Col>
                            <Col>
                                {groupData.groupName}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Дата создания
                            </Col>
                            <Col>
                                {getCurrentDate(groupData.dateOfCreate)}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Видны ли все пользователи
                            </Col>
                            <Col>
                                {groupData.viewParams ? 'Да' : 'Нет'}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Список пользователей
                    </Col>
                    <Col>
                        {
                            list ?
                                list?.map(user => {
                                    return(
                                        <Row className='active-group-col' >
                                            {user}
                                        </Row>
                                    )
                                })
                                : null
                        }
                    </Col>
                </Row>

            </AdminButtonCard>
            <AdminButtonCard title={'Добавить в группу'}>
                <Row>
                    <Col>
                        <AdminInput {...register('staffEmail')} />
                    </Col>
                    <Col>
                        <AdminButton classname={'green'} onClick={handleSubmit(addUser)}>Добавить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard title={"Удалить из группы"}>
                <Row>
                    <Col>
                        <AdminInput {...regDelete('staffEmail')} />
                    </Col>
                    <Col>
                        <AdminButton classname={'red'} onClick={handleDelete(deleteUser)}>Удалить</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

GroupDetails.propTypes = {
    
}
GroupDetails.defaultProps = {
    
}

export default GroupDetails