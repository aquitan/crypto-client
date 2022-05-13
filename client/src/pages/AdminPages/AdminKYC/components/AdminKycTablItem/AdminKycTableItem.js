import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../AdminKYC.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import Modal from "../../../../../components/UI/Modal/Modal";
import {store} from "../../../../../index";
import ModalDark from "../../../../../components/UI/ModalDark/ModalDark";
import Select from '../../../../../components/UI/Select/Select';
import { useForm } from 'react-hook-form';
import {deleteData, patchData} from "../../../../../services/StaffServices";

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
            status: kycStatus,
            staffEmail: store.userEmail,
            userEmail: props.email,
            kycId: props.id,
            domainName: window.location.host,
            staffId: store.user.id
        }

        const res = await patchData('/staff/kyc/update_kyc_status/', statusData)
        const data = await res.data
        handleCloseModal()
    }

    const onSendDelete = async () => {
        const statusData = {
            status: kycStatus,
            staffEmail: store.userEmail,
            userEmail: props.email,
            kycId: props.id,
            domainName: window.location.host,
            staffId: store.user.id
        }
        const res = await deleteData('/staff/kyc/delete_kyc/', statusData)
        const data = await res.data
        handleCloseModal()
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

    return (
        <>

            <ModalDark active={state.isOpen} onClick={state.onClickConfirm} setActive={handleCloseModal}>
                <h3>Подтвердить действие?</h3>
            </ModalDark>


            <div className={`${cls.table_item} scrollable-table`}>
                <Row>
                    <Col className={cls.default_col}>{props.registerDate}</Col>
                    <Col className={cls.default_col}>{props.name ? props.name : <FontAwesomeIcon icon={faTimesCircle} color='tomato' />}</Col>
                    <Col className={cls.default_col}>{props.email}</Col>
                    <Col className={cls.default_col}>
                        {props.city + ' '}
                        {props.zip}<br/>
                        {props.state},<br/>
                        Документ: {props.docType}
                    </Col>
                    <Col className={cls.default_col}>Фото</Col>
                    <Col className={cls.default_col}>{props.kycStatus}</Col>
                    <Col className={cls.default_col}>
                        <Row>
                            <Col>
                                <Select {...register('status', {
                                    onChange: (value) => handleOpenModal('edit')
                                })} classname='small' options={kusStatuses} />
                            </Col>
                            <Col>
                                <AdminButton onClick={() => handleOpenModal('delete')} classname='red xs' >Удалить</AdminButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AdminKycTableItem