import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../StaffWallets.module.scss'
import {useNavigate} from "react-router-dom";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";


const StaffWalletsItem = (props) => {
    const [state, setState] = useState(true)
    const {register, handleSubmit} = useForm({
        defaultValues: {
            currentWallet: props.address
        }
    })

    const onEdit = () => {
        setState(!state)
    }

    const onSubmit = (data) => {
        console.log('wallet data', data)
    }

    return (
        <div>
            <Row className={`${cls.wallet_item} mb-3`}>
                <Col>
                    {props.name}
                </Col>
                <Col className='d-none d-md-block'>
                    {props.currency}
                </Col>
                <Col>
                    <AdminInput disabled={state}  name='currentWallet' {...register('currentWallet')} />
                </Col>
                <Col className='d-none d-md-block'>
                    <AdminButton onClick={onEdit} classname={'orange'}>Редактировать</AdminButton>
                </Col>
                <Col className='d-none d-md-block'>
                    <AdminButton classname={'green'} onClick={handleSubmit(onSubmit)}>Редактировать</AdminButton>
                </Col>
            </Row>
        </div>
    )
}

export default StaffWalletsItem