import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../AdminKYC.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import Modal from "../../../../../components/UI/Modal/Modal";
import {store} from "../../../../../../index";
import ModalDark from "../../../../../components/UI/ModalDark/ModalDark";
import Select from '../../../../../components/UI/Select/Select';
import { useForm } from 'react-hook-form';
import {deleteData, getData, patchData} from "../../../../../services/StaffServices";
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import axios from 'axios';

const AdminKycTableItem = (props) => {
    const [kycStatus, setKycStatus] = useState(props.kycStatus)
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [img, setImg] = useState('')
    const [state, setState] = useState({
        isOpen: false,
        onClickConfirm: null,
    })
    const {register, handleSubmit} = useForm({
        mode: 'onChange'
    })
    const kusStatuses = [
        {value: 'pending', text: 'pending'},
        {value: 'approved', text: 'approved'},
        {value: 'rejected', text: 'rejected'}
    ]

    const onSelectChange = (e) => {
        setKycStatus(e.target.value)
    }

    const onSendStatus = async () => {
        const statusData = {
            status: 'approved',
            staffEmail: store.user.email,
            userEmail: props.email,
            kycId: props.id,
            userId: props.userId,
            domainName: window.location.host,
            staffId: store.user.id,
            rootAccess: store.fullAccess
        }
        if (store.fullAccess) {
            delete statusData.staffEmail
            delete statusData.staffId
        }


        try {
            const res = await patchData('/staff/kyc/update_kyc_status/', statusData)
            const data = await res.data
            handleCloseModal()
            setModalSuccess(true)
        } catch(e) {
            setModalError(true)
        }

        
    }

    const onSendDelete = async () => {
        const data = {
            staffEmail: store.fullAccess ? 'root' : store.user.email,
            userEmail: props.email,
            domainName: window.location.host,
            staffId: store.fullAccess ? 'root' : store.user.id,
            userId: props.userId,
            rootAccess: store.fullAccess
        }
       
        try {
            const res = await deleteData('/staff/kyc/delete_kyc/', {data})
            handleCloseModal()
            setModalDelete(true)
        } catch(e) {
            setModalDelete(true)
        }
    }

    const handleCloseModal = () => {
        setState({
            isOpen: false,
            onClickConfirm: null
        })
    }

    const handleFindType = (findType) => {
        switch(findType) {
            case 'edit':
                return onSendStatus;
            case 'delete':
                return onSendDelete;
            default:
                return console.log('default')
        }
    }

    const handleOpenModal = (requestType) => {
        const onClickConfirm = handleFindType(requestType)
        setState({
            isOpen: true,
            onClickConfirm
        })
    }


    const onClickFront = async () => {
        console.log('props---', props.userId);
       try {
            axios.get(`https://fujitutti.art/api/staff/kyc/get_kyc_image/${props.userId}/1/`, { responseType: "blob" }).then(resp => {
                const url = URL.createObjectURL(resp.data);
                console.log('src', url)
                setImg(url)
              });
            
            setTimeout(() => {
                setShowImg(true)
            }, 1000)
       } catch(e) {}

       
    }
    const onClickBack = async () => {
        console.log('props---', props.userId);
        try {
            axios.get(`https://fujitutti.art/api/staff/kyc/get_kyc_image/${props.userId}/2/`, { responseType: "blob" }).then(resp => {
                const url = URL.createObjectURL(resp.data);
                console.log('src', url)
                setImg(url)
              });
            
            setTimeout(() => {
                setShowImg(true)
            }, 1000)
       } catch(e) {}
     }
     const onClickSelfie = async () => {
        try {
            axios.get(`https://fujitutti.art/api/staff/kyc/get_kyc_image/${props.userId}/3/`, { responseType: "blob" }).then(resp => {
                const url = URL.createObjectURL(resp.data);
                console.log('src', url)
                setImg(url)
              });
            
            setTimeout(() => {
                setShowImg(true)
            }, 1000)
       } catch(e) {}
     }

     console.log('props---', props);

    return (
        <>

            <CustomModal size={'md'} show={modalSuccess} handleClose={() => setModalSuccess(false)} themeDark={true} btnClose='Ok' title='??????????????'>
                ???????????? KYC ?????????????? ??????????????!
            </CustomModal>
            <CustomModal size={'md'} show={modalDelete} handleClose={() => setModalDelete(false)} themeDark={true} btnClose='Ok' title='??????????????'>
                KYC ???????????? ??????????????!
            </CustomModal>
            <CustomModal size={'md'} show={modalError} handleClose={() => setModalError(false)} themeDark={true} btnClose='Ok' title='????????????'>
                ??????! ??????-???? ?????????? ???? ??????! ???????????????????? ??????????!
            </CustomModal>

            <CustomModal size={'md'} show={showImg} handleClose={() => setShowImg(false)} themeDark={true} btnClose='Ok' title='????????????????'>
                <a style={{width: '100%', boxSizing: 'border-box'}} href='#' target="_blank" rel="noopener noreferrer">
                    <img style={{width: '100%'}} src={img} alt='doc' />
                </a>
            </CustomModal>

            <CustomModal size={'md'} show={state.isOpen} handleClose={handleCloseModal} themeDark={true} title='?????????????????????? ????????????????'>
                <Row>
                    <Col className={'col-6'}>
                        <AdminButton classname={'green'} onClick={state.onClickConfirm} >??????????????????????</AdminButton>
                    </Col>
                    <Col className={'col-6'}>
                        <AdminButton classname={'red'} onClick={handleCloseModal} >????????????</AdminButton>
                    </Col>
                </Row>
            </CustomModal>


            <div className={'mt-3 mb-3'}>
                <Row>
                    {/*<Col className={'col-1'}>{props.registerDate}</Col>*/}
                    <Col style={{width: '190px'}} className={'text-center'}>{props.name ? props.name : <FontAwesomeIcon icon={faTimesCircle} color='tomato' />}</Col>
                    <Col style={{width: '190px'}} className={'text-center'}>{props.email}</Col>
                    <Col style={{width: '190px'}} className={'text-center'}>
                        {props.city + ' '}
                        {props.zip}<br/>
                        {props.state},<br/>
                    </Col>
                    <Col style={{width: '190px'}} className='text-center'>
                        ????????????????: {props.docType}
                    </Col>
                    <Col style={{width: '190px'}} className={'text-center'}>
                        <div style={{cursor: 'pointer'}} className={'text-center'} onClick={onClickFront}>Front</div>
                        <div style={{cursor: 'pointer'}} className={'text-center'} onClick={onClickBack}>Back</div>
                        <div style={{cursor: 'pointer'}} className={'text-center'} onClick={onClickSelfie}>Selfie</div>
                    </Col>
                    <Col style={{width: '190px'}} className={'text-center d-flex align-items-center flex-column'}>
                        <Select style={{marginBottom: 10}} {...register('status', {
                            onChange: (value) => handleOpenModal('edit')
                        })} classname={['admin-square']} options={kusStatuses} />
                    </Col>
                    <Col style={{width: '190px'}} className={'text-center d-flex align-items-center flex-column'}>
                        <AdminButton style={{width: '100%', maxWidth: '100%', margin: 0, height: '20px'}} onClick={() => handleOpenModal('delete')} classname={'red'} >??????????????</AdminButton>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default AdminKycTableItem