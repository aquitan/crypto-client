import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import ActiveGroups from "./ActiveGroups/ActiveGroups";
import {useForm} from "react-hook-form";
import {deleteData, postData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {store} from "../../../../index";
import CustomModal from '../../../components/CustomModal/CustomModal';


const GroupList = () => {
    const {register, handleSubmit} = useForm()
    const [list, setList] = useState([])
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const groupsOptions = [
        {value: true, text: 'Видны'},
        {value: false, text: 'Не видны'},
    ]
    const [limit, setLimit] = useState(0)

    const onSubmit = async (data) => {
        data.currentDate = dateToTimestamp()
        data.creatorId = store.user.id
        data.staffEmail = store.user.email
        data.viewParams = data.viewParams === 'true' ? true : false
        data.creatorId = store.fullAccess ? 'root' : store.user.id
        data.staffEmail = store.fullAccess ? 'root' : store.user.email

        try {
            const res = await postData('/staff/groups/create_new_group/', data)
            setModalSuccess(true)
            getGroupList()
        } catch(e) {
            setModalError(false)
        }
    }

    const getGroupList = async () => {
        const obj = {
            staffEmail: store.user.email,
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            skipValue: limit,
            limitValue: 10

        }
        const res = await postData('/staff/groups/get_group_list/', obj)
        setList(res.data)
    }
    const onDelete = async (id) => {
        const obj = {
            staffId: store.user.id,
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            groupId: id
        }
        try {
            const res = await deleteData('/staff/groups/delete_group/', {data: obj})
            setModalDelete(true)
            getGroupList()
        } catch(e) {
            setModalError(true)
        }
        
    }

    useEffect(() => {
        getGroupList()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    return (
        <Container>

            <CustomModal size={'md'} show={modalSuccess} handleClose={() => setModalSuccess(false)} themeDark={true} btnClose='Ok' title='Успешно'>
                Группа создана успешно!
            </CustomModal>
            <CustomModal size={'md'} show={modalDelete} handleClose={() => setModalDelete(false)} themeDark={true} btnClose='Ok' title='Успешно'>
                Группа удалена успешно!
            </CustomModal>
            <CustomModal size={'md'} show={modalError} handleClose={() => setModalError(false)} themeDark={true} btnClose='Ok' title='Ошибка'>
                Упс! Что-то пошло не так! Попробуйте позже!
            </CustomModal>
            
            <AdminButtonCard>
                <h1 className='text-center'>Создать группы</h1>
            </AdminButtonCard>
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
                        <Col className='text-center'>
                            <AdminButton classname='green'>Создать</AdminButton>
                        </Col>
                    </Row>
                </Form>
            </AdminButtonCard>

            <AdminButtonCard>
                <h2>Список групп</h2>
                {
                    typeof list === "object" ?
                        list?.map((item, index) => {
                            return <ActiveGroups
                                index={index}
                                key={item.groupData._id}
                                dateOfCreate={item.groupData.dateOfCreate}
                                groupName={item.groupData.groupName}
                                item={item}
                                onDelete={onDelete}
                                id={item.groupData._id}
                            />
                        })
                        : <h3>No groups!</h3>
                }
                <Row className={'mb-3 mt-3'}>
                    {
                        list.length >= 10 ?
                            <AdminButton onClick={onMore} classname={['xs', 'green']}>Еще</AdminButton>
                            : null
                    }
                    {
                        limit > 0 ?
                            <AdminButton onClick={onLess} classname={['xs', 'green']}>Назад</AdminButton>
                            : null
                    }
                </Row>

            </AdminButtonCard>

        </Container>
    )
}

export default GroupList