import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import ActiveGroups from "./ActiveGroups/ActiveGroups";
import {useForm} from "react-hook-form";
import {deleteData, postData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {store} from "../../../index";
import Modal from "../../../components/UI/Modal/Modal";
import {SwalSimple, SweetAlert} from "../../../utils/SweetAlert";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'


const GroupList = () => {
    const {register, handleSubmit} = useForm()
    const [list, setList] = useState([])
    const groupsOptions = [
        {value: true, text: 'Видны'},
        {value: false, text: 'Не видны'},
    ]
    const [isModal, setIsModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')

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
        console.log('group list', res.data)
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
        const res = await deleteData('/staff/groups/delete_group/', {data: obj})
        if (res.status === 200 || res.status === 201) {
            SwalSimple('Группа удалена!')
        } else {
            SwalSimple('Что то пошло не так! 8/')
        }
        getGroupList()
    }

    return (
        <Container>
            <Modal active={isModal} setActive={setIsModal} title={titleModal}>

            </Modal>
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
                    typeof list === "object" ?
                        list?.map(item => {
                            return <ActiveGroups key={item.groupData._id}
                                dateOfCreate={item.groupData.dateOfCreate}
                                groupName={item.groupData.groupName}
                                item={item}
                                onDelete={onDelete}
                                id={item.groupData._id}
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