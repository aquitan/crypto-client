import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {store} from "../../../../index";
import {deleteData, getData, postData} from "../../../services/StaffServices";
import {emailValidate} from "../../../utils/checkEmail";
import cls from "../../NonAuthPages/SignIn/SignIn.module.scss";
import {ErrorMessage} from "@hookform/error-message";

const RecruiterList = () => {
    const navigate = useNavigate()
    const [limit, setLimit] = useState(0)
    const [users, setUsers] = useState([])
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })


    const onCheckEmail = async (e) => {
        const res = await getData(`staff/recruiter/check_email/${e.target.value}`)
    }

    const getRecruiterList = async () => {
        let obj = {
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            limitValue: 20,
            skipValue: limit
        }
        const res = await postData('/staff/recruiter/get_recruiter_list/', obj)
        setUsers(res.data)
    }

    const onSubmit = async (data) => {
        let obj = {
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            recruiterFee: +data.recruiterFee,
            currentDate: dateToTimestamp(),
            userEmail: data.userEmail,
            adminId: store.fullAccess ? 'root' : store.user.id
        }
        const res = await postData('/staff/recruiter/add_new_recruiter', obj)
        if  (res.status === 201) {
            getRecruiterList()
            // SwalSimple('Пользователь добавлен в рекрутеры!')
        }
    }

    const deletRecruiter = async (id) => {
        let obj = {
            recruiterId: id,
            rootAccess: store.fullAccess,
            isAdmin: store.isAdmin
        }
        const res = await deleteData('/staff/recruiter/delete_recruiter_user/', {data: obj})
        getRecruiterList()
    }


    useEffect(() => {
        getRecruiterList()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }


    return (
        <Container>
            <AdminButtonCard>
                <h1>Рекрутинг</h1>
            </AdminButtonCard>
            <AdminButtonCard title={'Сделать рекрутером'}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className={'mb-3'}>
                        <AdminInput
                            {...register('userEmail', {
                                onBlur: e => onCheckEmail(e),
                                required: true,
                                validate: emailValidate,
                            })}
                            placeholder={'Почта пользователя'}
                            classname={'admin-square'}
                        />
                        <ErrorMessage  name='userEmail' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />
                    </Row>
                    <Row className={'mb-3'}>
                        <AdminInput
                            {...register('recruiterFee', {
                                required: true
                            })}
                            placeholder={'Комиссия рекрутера'}
                            classname={'admin-square'}
                        />
                        <ErrorMessage  name='recruiterFee' errors={errors} render={() => <p className={cls.error}>check the value</p>} />
                    </Row>
                    <Row>
                        <AdminButton classname={'green'}>Добавить</AdminButton>
                    </Row>
                </Form>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row style={{borderBottom: '1px solid #fff', paddingBottom: 10}}>
                    <Col className={'text-center'}>Email</Col>
                    <Col className={'text-center'}>User fee</Col>
                    <Col className={'text-center'}>Action</Col>
                </Row>

                {
                    users.length && typeof users !== 'string' ?
                        users.map(user => {
                            return(
                                <Row style={{padding: '20px 0', borderBottom: '1px solid #fff'}}>
                                    <Col className={'text-center'}>
                                        <span
                                            style={{cursor: 'pointer'}}>
                                            {user.recruiterEmail}
                                        </span>
                                    </Col>
                                    <Col className={'text-center'}>{user.currentFee}</Col>
                                    <Col className={'text-center'}>
                                        <Row>
                                            <Col><AdminButton onClick={() => deletRecruiter(user.recruiterId)} classname={['red', 'xs']}>Удалить</AdminButton></Col>
                                            <Col><AdminButton
                                                onClick={() => navigate(`/staff/recruiter-detail${user.recruiterId}`)}
                                                classname={['green', 'xs']}>Детали</AdminButton></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            )
                        })
                        : <h4 className='text-center my-4' style={{color: '#cecece'}}>Список пуст</h4>
                }

                {
                    users.length && typeof users !== 'string' ?
                        <Row className={'mb-3 mt-3'}>
                            {
                                users.length >= 10 ?
                                <AdminButton onClick={onMore} classname={['xs', 'green']}>Еще</AdminButton>
                                : null
                            }
                            {
                                limit > 0 ?
                                <AdminButton onClick={onLess} classname={['xs', 'green']}>Назад</AdminButton>
                                : null
                            }
                        </Row>
                    : null
                }

            </AdminButtonCard>
            
        </Container>
    )
}

RecruiterList.propTypes = {
    
}
RecruiterList.defaultProps = {
    
}

export default RecruiterList