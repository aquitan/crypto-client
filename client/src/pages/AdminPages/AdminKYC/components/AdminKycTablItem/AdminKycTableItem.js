import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../AdminKYC.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import Modal from "../../../../../components/UI/Modal/Modal";
import {store} from "../../../../../index";

const AdminKycTableItem = (props) => {
    const [kycStatus, setKycStatus] = useState(props.kycStatus)
    const [modal, setModal] = useState(false)

    const onClick = () => {
        setModal(true)
    }
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
            staffId: store.userId
        }

        const res = await fetch('/api/staff/kyc/update_kyc_status/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(statusData)
        })
        const data = await res.json()
        setModal(false)
    }

    return (
        <>
            <Modal active={modal} setActive={setModal}>
                <Row><h2 style={{color: 'black'}}>Подтвердить действие</h2></Row>
                <Row>
                    <AdminButton onClick={onSendStatus} color='green'>Подтвердить</AdminButton>
                </Row>
            </Modal>
            <div className={cls.table_item}>
                <Row>
                    <Col className={cls.id_col}>{props.id}</Col>
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
                        <select value={kycStatus} onChange={onSelectChange}>
                            <option value='pending'>pending</option>
                            <option value='approved'>approved</option>
                            <option value='rejected'>rejected</option>
                        </select>
                        <AdminButton onClick={onClick} color={'green'}>Изменить</AdminButton>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AdminKycTableItem