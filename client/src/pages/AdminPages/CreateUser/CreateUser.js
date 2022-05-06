import React, {useEffect, useState} from 'react'
import {Container, Row} from "react-bootstrap";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {emailValidate} from "../../../utils/checkEmail";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import Table from "../../../components/UI/Table/Table";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import TableItem from "../../../components/UI/Table/components/TableItem/TableItem";
import {postData} from "../../../services/StaffServices";
import TableItemCreateUser from "../../../components/UI/Table/components/TableItemCreateUser/TableItemCreateUser";
import {optionsCompiler} from "../../../utils/optionsCompiler";
import Select from "../../../components/UI/Select/Select";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";

const CreateUser = () => {
    const [users, setUsers] = useState([])
    const [domains, setDomains] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const tableHeader = [
        'Username',
        'Recruter for',
        'Is can be recruter?',
        'Domain',
        'Date',
        'Profit Percent',
        'Profit',
        'Action'
    ]
    const getProfile = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host,
        }
        const res = await postData('/staff/users/', userData)
        const data = await res.data
        const usersReversed = data.usersList.slice(0).reverse()
        setUsers(usersReversed)
    }
    useEffect(() => {
        getProfile()
        getAllUsers()
    }, [])

   const getAllUsers = async () => {
       const obj = {
           isAdmin: store.isAdmin,
           isStaff: store.isStaff,
           staffEmail: store.userEmail,
           rootAccess: store.fullAccess,
           id: store.userId
       }
       const res = await postData('/staff/domains/get_active_domains/', obj)

       console.log('res data', res.data)
       // setDomains(optionsCompiler(res.data.domainsList))
   }


    const onSubmit = async (data, e) => {
        e.preventDefault()
        data.staffId = store.userId
        data.currentDate = dateToTimestamp()
        data.staffEmail = store.userEmail
        data.rootAccess = store.fullAccess

        console.log('create-user', data)
        const res = await postData('/staff/create_user', data)
    }

    return (
        <Container>
            <h1 className='mt-4'>Создать пользователя</h1>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='mb-3'>Создать</h2>
                    <Row className='mb-3'>
                        <AdminInput {...register('name', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='Имя'/>
                        <ErrorMessage  name='name' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Row>
                    <Row className='mb-3'>
                        <AdminInput {...register('userEmail', {
                            required: true,
                            validate: emailValidate,
                        })} placeholder='Почта'/>
                        <ErrorMessage  name='userEmail' errors={errors} render={() => <p className={error.error}>Почта не верна</p>} />
                    </Row>
                    <Row className='mb-3'>
                        <AdminInput {...register('password', {
                            required: true,
                        })} placeholder='Пароль'/>
                        <ErrorMessage  name='password' errors={errors} render={() => <p className={error.error}>Необходимо ввести пароль</p>} />
                    </Row>
                    {
                        domains ? <Row className='mb-3'>
                            <Select {...register('domainName')} options={domains} />
                        </Row>
                            : <Preloader />
                    }
                    <Row className='mb-3'>
                        <AdminButton classname='green'>Создать пользователя</AdminButton>
                    </Row>
                </AdminForm>
            </AdminButtonCard>
            {
                !store.isAdmin ?
                    <AdminButtonCard classname='scrollable-table'>
                        <h2>Редактировать пользователя</h2>
                        <Table>
                            <TableHeader elems={tableHeader} />
                        </Table>
                        <TableBody>
                            <TableItemCreateUser users={users} />
                        </TableBody>
                    </AdminButtonCard>
                    : null
            }
        </Container>
    )
}
export default CreateUser;
