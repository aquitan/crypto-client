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
import CustomModal from '../../../components/CustomModal/CustomModal';

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
            staffId: store.fullAccess ? 'root' : store.user.id

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
        data.staffId = store.fullAccess ? 'root' : store.user.id
        data.currentDate = dateToTimestamp()
        data.staffEmail = store.fullAccess ? 'root' : store.user.email
        data.rootAccess = store.fullAccess


        try {
            const res = await postData('/staff/create_user', data)
            setIsModal(true)
        } catch (e) {
            setIsModalError(true)
        }
        
        if (res.status === 201) {
            // SwalSimple('???????????????????????? ????????????!')
        } else {
            // SwalSimple('?????? ???? ?????????? ???? ??????!')
        }
    }

    return (
        <Container>
            <CustomModal show={isModal} handleClose={() => setIsModal(false)} btnClose="OK" title='???????????????????????? ????????????????' size={'md'} themeDark={true} >
                ???????????????????????? ?????????????? ????????????????!
            </CustomModal>
            <CustomModal show={isModalError} handleClose={() => setIsModalError(false)} btnClose="OK" title='????????????' size={'md'} themeDark={true} >
                ??????! ??????-???? ?????????? ???? ??????!
            </CustomModal>

            <AdminButtonCard>
                <h1 className='text-center'>?????????????? ????????????????????????</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='mb-3'>??????????????</h2>
                    <Row className='mb-3'>
                        <AdminInput {...register('name', {
                            required: true,
                            pattern: /^[^??-????]+$/iu
                        })} placeholder='??????'/>
                        <ErrorMessage  name='name' errors={errors} render={() => <p className={error.error}>???????????? ???????????????????? ??????????</p>} />
                    </Row>
                    <Row className='mb-3'>
                        <AdminInput {...register('userEmail', {
                            required: true,
                            validate: emailValidate,
                        })} placeholder='??????????'/>
                        <ErrorMessage  name='userEmail' errors={errors} render={() => <p className={error.error}>?????????? ???? ??????????</p>} />
                    </Row>
                    <Row className='mb-3'>
                        <AdminInput {...register('password', {
                            required: true,
                        })} placeholder='????????????'/>
                        <ErrorMessage  name='password' errors={errors} render={() => <p className={error.error}>???????????????????? ???????????? ????????????</p>} />
                    </Row>
                    {
                        domains ? <Row className='mb-3'>
                            <Select {...register('domainName')} classname={'admin-square'} options={domains} />
                        </Row>
                            : <h4>No domains!</h4>
                    }
                    <Row className='mb-3 justify-content-center'>
                        <AdminButton classname='green'>?????????????? ????????????????????????</AdminButton>
                    </Row>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}
export default CreateUser;
