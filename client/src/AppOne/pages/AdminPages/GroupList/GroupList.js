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


const GroupList = () => {
    const {register, handleSubmit} = useForm()
    const [list, setList] = useState([])
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

        const res = await postData('/staff/groups/create_new_group/', data)
        if (res.status === 201) {
            // SwalSimple('Группа создана!')
            getGroupList()
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
        const res = await deleteData('/staff/groups/delete_group/', {data: obj})
        if (res.status === 202) {
            // SwalSimple('Группа удалена!')
        } else {
            // SwalSimple('Что то пошло не так!')
        }
        getGroupList()
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
            {/*<Modal active={isModal} setActive={setIsModal} title={titleModal}>*/}

            {/*</Modal>*/}
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

GroupList.propTypes = {

}
GroupList.defaultProps = {

}

export default GroupList