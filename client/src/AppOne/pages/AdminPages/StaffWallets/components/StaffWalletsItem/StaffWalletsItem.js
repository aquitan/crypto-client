import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../StaffWallets.module.scss'
import {useNavigate} from "react-router-dom";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {patchData} from "../../../../../services/StaffServices";
import {store} from "../../../../../../index";


const StaffWalletsItem = ({currency, address, onClick, }) => {
    const [state, setState] = useState(true)
    const [wallet, setWallet] = useState(address)

    const onEdit = () => {
        setState(!state)
    }

    const onChange = (e) => {
        setWallet(e.target.value)
    }

    return (
        <div>
            <Row className={`${cls.wallet_item} mb-3`}>
                <Col className='d-none d-md-block'>
                    {currency}
                </Col>
                <Col>
                    <AdminInput onChange={onChange} disabled={state}  name='currentWallet' value={wallet} />
                </Col>
                {
                    store.fullAccess || store.isAdmin ?
                        <>
                            <Col className='d-none d-md-block'>
                                <AdminButton onClick={onEdit} classname={['orange','medium_btn']}>Редактировать</AdminButton>
                            </Col>
                            <Col className='d-none d-md-block'>
                                <AdminButton classname={['green', 'medium_btn']} onClick={() => onClick(currency, wallet)}>Сохранить</AdminButton>
                            </Col>
                        </>
                    :null
                }
            </Row>
        </div>
    )
}

export default StaffWalletsItem