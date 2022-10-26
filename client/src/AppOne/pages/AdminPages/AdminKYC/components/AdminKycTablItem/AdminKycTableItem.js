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

const AdminKycTableItem = (props) => {
    const [kycStatus, setKycStatus] = useState(props.kycStatus)
    const [modalDelete, setModalDelete] = useState(false)
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

        const res = await patchData('/staff/kyc/update_kyc_status/', statusData)
        const data = await res.data
        handleCloseModal()
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
        // if (store.fullAccess) {
        //     delete data.staffEmail
        //     delete data.staffId
        // }
        const res = await deleteData('/staff/kyc/delete_kyc/', {data})
        if (res.status === 202) {
            // SwalSimple('KYC удален!')
            handleCloseModal()
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
        console.log('front')
       await getData(`/staff/kyc/get_kyc_image/${props.userId}/1/`)
    }
    const onClickBack = async () => {
        await getData(`/staff/kyc/get_kyc_image/${props.userId}/2/`)
     }
     const onClickSelfie = async () => {
        await getData(`/staff/kyc/get_kyc_image/${props.userId}/3/`)
     }

    return (
        <>

            <Modal active={state.isOpen} title={'Подтвердить действие'} setActive={handleCloseModal}>
                <Row>
                    <Col className={'col-6'}>
                        <AdminButton classname={'green'} onClick={state.onClickConfirm} >Подтвердить</AdminButton>
                    </Col>
                    <Col className={'col-6'}>
                        <AdminButton classname={'red'} onClick={handleCloseModal} >Отмена</AdminButton>
                    </Col>
                </Row>
            </Modal>


            <div className={'mt-3 mb-3'}>
                <Row>
                    {/*<Col className={'col-1'}>{props.registerDate}</Col>*/}
                    <Col className={'col-1'}>{props.name ? props.name : <FontAwesomeIcon icon={faTimesCircle} color='tomato' />}</Col>
                    <Col className={'col-2'}>{props.email}</Col>
                    <Col className={'col-2'}>
                        {props.city + ' '}
                        {props.zip}<br/>
                        {props.state},<br/>
                        Документ: {props.docType}
                    </Col>
                    <Col className={'col-2'}>
                        <div onClick={onClickFront}>Front</div>
                        <div onClick={onClickBack}>Back</div>
                        <div onClick={onClickSelfie}>Front</div>

                    </Col>
                    <Col className={'col-2'}>{props.kycStatus}</Col>
                    <Col className={'col-3 d-flex flex-column'}>
                        <Select style={{marginBottom: 10}} {...register('status', {
                            onChange: (value) => handleOpenModal('edit')
                        })} classname='' options={kusStatuses} />
                        <AdminButton style={{width: '100%', maxWidth: '100%', margin: 0}} onClick={() => handleOpenModal('delete')} classname={'red'} >Удалить</AdminButton>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default AdminKycTableItem