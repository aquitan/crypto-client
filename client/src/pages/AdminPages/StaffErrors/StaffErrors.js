import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {optionsButton} from "../../../utils/staffConstants";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {getData, postData, putData} from "../../../services/StaffServices";
import {store} from "../../../index";
import StaffErrorItem from "./components/StaffErrorItem/StaffErrorItem";
import {optionsCompiler} from "../../../utils/optionsCompiler";
import Preloader from "../../../components/UI/Preloader/Preloader";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import ModalDark from "../../../components/UI/ModalDark/ModalDark";

const StaffErrors = () => {
    const [modal, setModal] = useState(false)
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: 'onBlur'
    })
    const [state, setState] = useState({
        domainDetail: '',
        domain: '',
        domainOptions: '',
        allDomains: []
    })
    const [curSelect, setCurSelect] = useState('')
    const [custSelect, setCustSelect] = useState('')
    const [optionId, setOptionId] = useState('')
    const options = [
        {value: 'Вывод', text: 'Вывод'},
        {value: 'Верификация', text: 'Верификация'},
        {value: 'Мульти-акк', text: 'Мульти-акк'},
    ]
    const optionsDomain = [
        {value: 'localhost:3000', text: 'localhost:3000'},
        {value: 'localhost:3001', text: 'localhost:3001'},
        {value: 'localhost:3002', text: 'localhost:3002'},
    ]

    useEffect(() => {
        getDomainList()
    }, [])

    const getAllErrors = async () => {
        const obj = {
            domainName: curSelect
        }
        const err = await postData(`/staff/errors/get_all_errors/`, obj)
    }

    const getDomainList = async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            staffEmail: store.userEmail,
            rootAccess: store.fullAccess,
            id: store.userId
        }
        const res = await postData('/staff/domains/get_active_domains/', obj)
        console.log('getDomainList ========', res.data.domainsList)
        let arr = []
        if (typeof res.data.domainsList !== "string") {
            for (let i = 0; i <= res.data.domainsList.length - 1; i++) {
                let obj = {
                    value: res.data.domainsList[i].domainName,
                    text: res.data.domainsList[i].domainName,
                    id: res.data.domainsList[i].domainId
                }
                arr.push(obj)
                setState({...state, allDomains: arr})
                setCurSelect(arr[0].value)
                setCustSelect(arr[0].value)
                setOptionId(arr[0].id)
            }

        } else {
            let obj = {
                value: res.data.domainsList,
                text: res.data.domainsList,
                id: res.data.domainsList.domainId
            }
            arr.push(obj)
            setState({...state, allDomains: arr})
            setCurSelect(arr[0].value)
            setCustSelect(arr[0].value)
            setOptionId(arr[0].id)
        }
    }

    const onSubmit = async (data) => {
        data.domainId = optionId
        data.staffEmail = store.userEmail
        data.staffId = store.userId
        data.adminPermission = store.isAdmin
        data.staffPermission = store.isStaff
        data.rootAccess = store.fullAccess
        data.domainName = custSelect
        const res = await putData('/staff/errors/create_new_error/', data)
        if (res.status === 201) {
            setModal(true)
            reset({data: ''})
        }
    }

    const onChangeDomain = async (e) => {
        // const res = await getData('/staff/errors/get_all_errors/1/')
        // setState({...state, domain: res.data.domain_detail})
        setCurSelect(e.target.value)
    }
    const onChangeCustDomain = async (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id');
        setOptionId(option)
        setCustSelect(e.target.value)
    }

    const chooseErrorsList = async () => {
       await getAllErrors()
    }

    return (
        <Container>
            <ModalDark active={modal} setActive={setModal} singleBtn={true}>
                <h2>Ошибка создана успешно!</h2>
            </ModalDark>
            <h1 className='mt-4'>Ошибки</h1>
           <AdminButtonCard>
              <AdminForm onSubmit={handleSubmit(onSubmit)}>
                  <h2 className='text-center'>Создание новой ошибки</h2>
                  <Row className='mb-3'>
                      Название ошибки
                      <AdminInput {...register('errorName', {
                          required: true
                      })}/>
                      <ErrorMessage  name='errorName' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      Заголовок
                      <AdminInput {...register('errorTitle', {
                          required: true,
                          pattern: /^[^а-яё]+$/iu
                      })}/>
                      <ErrorMessage  name='errorTitle' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      Основной текст
                      <TextArea classnames='dark textarea_square' {...register('errorText', {
                          required: true,
                          pattern: /^[^а-яё]+$/iu
                      })} />
                      <ErrorMessage  name='errorText' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      Выбери домен
                      {state.allDomains ? <Select value={state.allDomains[0]} onChange={onChangeCustDomain} options={state.allDomains} /> : <Preloader/>}
                  </Row>
                  <Row className='mb-3'>
                      Кнопка
                      <Select {...register('errorButton')} options={optionsButton} classname='' />
                  </Row>
                  <AdminButton classname='green'>Добавить ошибку</AdminButton>
              </AdminForm>
           </AdminButtonCard>

            <AdminButtonCard>
                <h2 className='text-center'>Ошибки</h2>
                <Row>
                    <Col>
                        {
                            state.allDomains ? <Select options={state.allDomains} value={state.allDomains[0]} onChange={onChangeDomain} /> : <Preloader/>
                        }
                    </Col>
                    <Col>
                        <AdminButton onClick={chooseErrorsList} classname={'green'}>Выбрать</AdminButton>
                    </Col>
                </Row>

                {
                    state.domain ? state.domain.map(error => {
                        return <StaffErrorItem data={error} />
                    })
                        : <h4>choose domain</h4>
                }
            </AdminButtonCard>
        </Container>
    )
}

StaffErrors.propTypes = {
    
}
StaffErrors.defaultProps = {
    
}

export default StaffErrors