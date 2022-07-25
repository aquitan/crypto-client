import React, {useEffect, useState} from 'react'
import {Container, Modal, Row} from "react-bootstrap";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import {store} from "../../../../index";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {emailValidate} from "../../../utils/checkEmail";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {postData} from "../../../services/StaffServices";
import Select from "../../../components/UI/Select/Select";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {SwalSimple} from "../../../utils/SweetAlert";

const CreateUser = () => {
    const [domains, setDomains] = useState()
    const [isModal, setIsModal] = useState(false)
    const [isModalError, setIsModalError] = useState(false)
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: "onBlur"
    })

    useEffect(() => {
        getDomains()
    }, [])

    const getDomains = async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            staffId: store.user.id

        }
        const res = await postData('/staff/domains/get_active_domains/', obj)
        if (res.status === 200 && typeof res.data === "object") {
            let arr = []
            res.data.forEach(item => {
                let obj = {
                    value: item.domainName,
                    text: item.domainName
                }
                arr.push(obj)
            })
            setDomains(arr)
        }
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()
        data.staffId = store.user.id
        data.currentDate = dateToTimestamp()
        data.staffEmail = store.user.email
        data.rootAccess = store.fullAccess

        const res = await postData('/staff/create_user', data)
        if (res.status === 200) {
            SwalSimple('Пользователь создан!')
        } else {
            SwalSimple('Что то пошло не так!')
        }
    }

    return (
        <Container>
            <Modal active={isModal} setActive={setIsModal}>
                Пользователь добавлен!
            </Modal>
            <Modal active={isModalError} setActive={setIsModalError}>
                Упс! Что-то пошло не так!
            </Modal>
            <AdminButtonCard>
                <h1 className='text-center'>Создать пользователя</h1>
            </AdminButtonCard>
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
                            <Select {...register('domainName')} classname={'admin-square'} options={domains} />
                        </Row>
                            : <h4>No domains!</h4>
                    }
                    <Row className='mb-3 justify-content-center'>
                        <AdminButton classname='green'>Создать пользователя</AdminButton>
                    </Row>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}
export default CreateUser;
