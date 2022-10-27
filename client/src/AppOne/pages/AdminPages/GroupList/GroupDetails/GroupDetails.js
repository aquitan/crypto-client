import React, {useEffect, useState} from 'react'
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
import CustomModal from '../../../../components/CustomModal/CustomModal';

const GroupDetails = () => {
    const {register, handleSubmit, reset} = useForm()
    const {register: regDelete, handleSubmit: handleDelete, reset: resetDelete} = useForm()
    const location = useLocation()
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [list, setList] = useState(location.state.item.groupUsers)

    const addUser = async (data) => {
        data.groupId = location.state.item.groupData._id

        try {
            const res = await patchData('/staff/groups/add_new_group_member/', data)
            reset({data: ''})
            getGroupList(location.state.index)
            setModalSuccess(true)
        } catch(e) {
            setModalError(true)
        }
    }
    const deleteUser = async (data) => {
        data.groupId = location.state.item.groupData._id
        data.staffId = store.user.id
        data.rootAccess = store.fullAccess
        data.isAdmin = store.isAdmin
        data.isStaff = store.isStaff

        try {
            const res = await deleteData('/staff/groups/delete_user_from_group/', {data: data})
            resetDelete({data: ''})
            getGroupList(location.state.index)
            setModalDelete(true)
        } catch(e) {
            setModalError(true)
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
        setList(res.data[index].groupUsers)
    }


    const {groupData, groupUsers} = location.state.item
    return (
        <Container>
            <CustomModal size={'md'} show={modalSuccess} handleClose={() => setModalSuccess(false)} themeDark={true} btnClose='Ok' title='Успешно'>
                Пользователь успешно добавлен в группу!
            </CustomModal>
            <CustomModal size={'md'} show={modalDelete} handleClose={() => setModalDelete(false)} themeDark={true} btnClose='Ok' title='Успешно'>
                Пользователь успешно удален из группы!
            </CustomModal>
            <CustomModal size={'md'} show={modalError} handleClose={() => setModalError(false)} themeDark={true} btnClose='Ok' title='Ошибка'>
                Упс! Что-то пошло не так! Попробуйте позже!
            </CustomModal>

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