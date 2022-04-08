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

const CreateUser = () => {
    const [users, setUsers] = useState([])
    const [domains, setDomains] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const tableHeader = [
        '#',
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
           domainName: store.domain.full_domain_name,
           doubleDeposit: store.domain.double_deposit,
           depositFee: store.domain.deposit_fee,
           rateCorrectSum: store.domain.rate_correct_sum,
           minDepositSum: store.domain.min_deposit_sum,
           minWithdrawalSum: store.domain.min_withdrawal_sum,
           currencySwapFee: store.domain.currency_swap_fee
       }
       const res = await postData('/staff/domains/get_active_domains/', obj)
       setDomains(optionsCompiler(res.data.domainsList))
       console.log('res.data.domainsList', res.data.domainsList)
       console.log('optionsCompiler(res.data.domainsList)', optionsCompiler(res.data.domainsList))
   }


    const onSubmit = async (data, e) => {
        e.preventDefault()
        const domain_name = window.location.host
        const timeDate = new Date()
        const currentDate = timeDate.getTime()

        data.domainName = domain_name
        data.staffId = store.userId
        data.datetime = currentDate
        data.staffEmail = store.userEmail
        data.rootAccess = store.fullAccess
        data.depositFee = store.depositFee
        data.promocode = 'empty'

        const res = await postData('/staff/create_user', data)
        const dates = await res
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
                            <Select {...register('domain')} options={domains} />
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
                    <AdminButtonCard>
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
