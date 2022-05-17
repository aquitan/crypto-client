import React from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../components/AdminButtonCard/AdminButtonCard";
import AdminButton from "../../../../components/UI/AdminButton/AdminButton";
import './GroupDetails.scss'
import {useLocation} from "react-router-dom";
import {getCurrentDate} from "../../../../utils/getCurrentDate";
import AdminInput from "../../../../components/UI/AdminInput/AdminInput";
import {deleteData, patchData} from "../../../../services/StaffServices";
import {useForm} from "react-hook-form";
import {store} from "../../../../index";

const GroupDetails = () => {
    const {register, handleSubmit} = useForm()
    const {register: regDelete, handleSubmit: handleDelete} = useForm()
    const location = useLocation()

    const addUser = async (data) => {
        data.groupId = location.state._id
        console.log('data', data)
        const res = await patchData('/staff/groups/add_new_group_member/', data)
    }
    const deleteUser = async (data) => {
        data.groupId = location.state._id
        data.staffId = store.user.id
        data.rootAccess = store.fullAccess
        data.isAdmin = store.isAdmin
        data.isStaff = store.isStaff
        console.log('data', data)
        const res = await deleteData('/staff/groups/delete_user_from_group/', {data: data})
    }


    const {state} = location

    return (
        <Container>
            <AdminButtonCard title='Данные по группе' >
                <Row className='mb-3'>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Создатель
                            </Col>
                            <Col>
                                {state.creatorId}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Нзвание
                            </Col>
                            <Col>
                                {state.groupName}
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
                                {getCurrentDate(state.dateOfCreate)}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-12 col-lg-6'>
                        <Row className='active-group-col'>
                            <Col>
                                Видны ли все пользователи
                            </Col>
                            <Col>
                                {state.viewParams ? 'Да' : 'Нет'}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='col-12 col-lg-4 text-center mb-3'>
                        <AdminButton classname='red'>Выйти из группы</AdminButton>
                    </Col>
                    <Col className='col-12 col-lg-4 text-center mb-3'>
                        <AdminButton classname='orange'>Изменить видимость участников</AdminButton>
                    </Col>
                    <Col className='col-12 col-lg-4 text-center mb-3'>
                        <AdminButton classname='green'>Отправить заявку на участие</AdminButton>
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