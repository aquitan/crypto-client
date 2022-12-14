import React, {useEffect, useState} from 'react'
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
import {store} from "../../../../index";
import StaffErrorItem from "./components/StaffErrorItem/StaffErrorItem";
import Preloader from "../../../components/UI/Preloader/Preloader";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import ModalDark from "../../../components/UI/ModalDark/ModalDark";
import CustomModal from '../../../components/CustomModal/CustomModal';

const StaffErrors = () => {
    const [modal, setModal] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [state, setState] = useState({
        domainDetail: '',
        domain: '',
        domainOptions: '',
        allDomains: []
    })
    const [domainErrors, setDomainErrors] = useState([])
    const [curSelect, setCurSelect] = useState('')
    const [custSelect, setCustSelect] = useState('')
    const [optionId, setOptionId] = useState('')
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: 'onBlur',
    })
    const {register: allErrors, handleSubmit: allErrorsSubmit} = useForm({
        mode: 'onBlur',
        defaultValues: {
            domainError: state.allDomains[0]
        }
    })

    useEffect(() => {
        getDomainList()
    }, [])

    const getAllErrors = async () => {
        const err = await getData(`/staff/errors/get_all_errors/${curSelect}`)
        setDomainErrors(err.data.errorList)
    }

    const getDomainList = async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            staffId: store.user.id
        }
        const res = await postData('/staff/domains/get_active_domains/', obj)
        let arr = []
        if (typeof res.data !== "string") {
            for (let i = 0; i <= res.data?.length - 1; i++) {
                let obj = {
                    value: res.data[i].domainName,
                    text: res.data[i].domainName,
                    id: res.data[i].domainId
                }
                arr.push(obj)
                setState({...state, allDomains: arr})
                setCurSelect(arr[0].value)
                setCustSelect(arr[0].value)
                setOptionId(arr[0].id)
            }

        } else {
            let obj = {
                value: res.data,
                text: res.data,
                id: res.data.domainId
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
        data.staffEmail = store.user.email
        data.staffId = store.user.id
        data.isAdmin = store.isAdmin
        data.isStaff = store.isStaff
        data.rootAccess = store.fullAccess
        data.domainName = custSelect

        try {
            const res = await putData('/staff/errors/create_new_error/', data)
            setModal(true)
            reset({data: ''})
        } catch(e) {
            setModalError(true)
        }
    }

    const onChangeDomain = async (e) => {
        setCurSelect(e.target.value)
        try {
            const res = await getData(`/staff/errors/get_all_errors/${e.target.value}`)
        } catch(e) {
            setModalError(true)
        }
        // setState({...state, domain: res.data.domain_detail})
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
            <CustomModal show={modal} handleClose={() => setModal(false)} size={'md'} themeDark={true} title={'?????????? ????????????'} btnClose='Ok'>
                ???????????? ?????????????? ??????????????!
            </CustomModal>

            <CustomModal show={modalError} handleClose={() => setModalError(false)} size={'md'} themeDark={true} title={'?????? ???? ?????????? ???? ??????'} btnClose='Ok'>
                ??????! ??????-???? ?????????? ???? ??????! ???????????????????? ??????????!
            </CustomModal>

            <AdminButtonCard>
                <h1 className='text-center'>????????????</h1>
            </AdminButtonCard>
           <AdminButtonCard>
              <AdminForm onSubmit={handleSubmit(onSubmit)}>
                  <h2 className='text-center'>???????????????? ?????????? ????????????</h2>
                  <Row className='mb-3'>
                      ???????????????? ????????????
                      <AdminInput {...register('errorName', {
                          required: true
                      })}/>
                      <ErrorMessage  name='errorName' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      ??????????????????
                      <AdminInput {...register('errorTitle', {
                          required: true,
                          pattern: /^[^??-????]+$/iu
                      })}/>
                      <ErrorMessage  name='errorTitle' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      ???????????????? ??????????
                      <TextArea classname={['dark', 'textarea_square']} {...register('errorText', {
                          required: true,
                          pattern: /^[^??-????]+$/iu
                      })} />
                      <ErrorMessage  name='errorText' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      ???????????? ??????????
                      {state.allDomains ?
                          <Select value={custSelect}
                                  classname={'admin-square'}
                                  onChange={onChangeCustDomain}
                                  options={state.allDomains} /> : <Preloader/>}
                  </Row>
                  <Row className='mb-3'>
                      ????????????
                      <Select {...register('errorButton')} getAvalue={true} options={optionsButton} classname={'admin-square'} />
                  </Row>
                  <Row>
                      <Col className='d-flex justify-content-center'>
                          <AdminButton classname='green'>???????????????? ????????????</AdminButton>
                      </Col>
                  </Row>
              </AdminForm>
           </AdminButtonCard>

            <AdminButtonCard>
                <h2 className='text-center mb-4'>????????????</h2>
                <Row>
                    <Col className='col-12 col-md-6 mb-3'>
                        {
                            state.allDomains.length ?
                                <Select
                                    getAvalue={true}
                                    value={curSelect}
                                    options={state.allDomains}
                                    classname={'admin-square'}
                                    onChange={onChangeDomain} />
                                : <Preloader/>
                        }
                    </Col>
                    <Col className='col-12 col-md-6 text-center text-md-start mb-3'>
                        <AdminButton onClick={chooseErrorsList} classname={'green'}>??????????????</AdminButton>
                    </Col>
                </Row>

                {
                    state.domain ? state.domain.map(error => {
                        return <StaffErrorItem key={error._id} data={error} />
                    })
                        : <Row className='mt-4 mb-4'>
                            <h4>???????????? ??????????</h4>
                        </Row>
                }
                {
                    domainErrors.length ?
                        domainErrors.map(item => {
                            return (
                                <Row key={item._id} style={{borderBottom: '1px solid #fff', paddingBottom: 20, paddingTop: 20}}>
                                    <Col>
                                        <Row className={'mb-3'}>
                                            <Col>Domain name</Col>
                                            <Col>{item.domainName}</Col>
                                        </Row>
                                        <Row className={'mb-3'}>
                                            <Col>Error Name</Col>
                                            <Col>{item.errorName}</Col>
                                        </Row>
                                        <Row className={'mb-3'}>
                                            <Col>Error Title</Col>
                                            <Col>{item.errorTitle}</Col>
                                        </Row>
                                        <Row className={'mb-3'}>
                                            <Col>Error Text</Col>
                                            <Col>{item.errorText}</Col>
                                        </Row>
                                        <Row className={'mb-3'}>
                                            <Col>Error Button</Col>
                                            <Col>{item.errorButton}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            )
                        })
                        : <h2>No data!</h2>
                }
            </AdminButtonCard>
        </Container>
    )
}

export default StaffErrors