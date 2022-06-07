import React, {useState} from 'react'
import PropTypes from 'prop-types'
import cls from "../../../StaffWallets/StaffWallets.module.scss";
import {Col, Row} from "react-bootstrap";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {store} from "../../../../../../index";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import {patchData} from "../../../../../services/StaffServices";

const RecruiterWallet = (props) => {
    const [state, setState] = useState(true)
    const {register, handleSubmit} = useForm({
        defaultValues: {
            currentWallet: props.address
        }
    })

    const onEdit = () => {
        setState(!state)
    }

    const onSubmit = async (data) => {
        console.log('wallet data', data)
        let id = store.fullAccess ? '1' : store.user.id


        const obj = {
            staffId: props.id,
            rootAccess: store.fullAccess,
            wallet: data.currentWallet,
            coinName: props.currency
        }
        const res = await patchData('/staff/staff_wallets/edit_staff_wallets/', obj)
    }
    return (
        <div>
            <Row className={`${cls.wallet_item} mb-3`}>
                <Col className='d-none d-md-block'>
                    {props.currency}
                </Col>
                <Col>
                    <AdminInput disabled={state}  name='currentWallet' {...register('currentWallet')} />
                </Col>
                {
                    store.fullAccess ?
                        <>
                            <Col className='d-none d-md-block'>
                                <AdminButton onClick={onEdit} classname={['orange','medium_btn']}>Редактировать</AdminButton>
                            </Col>
                            <Col className='d-none d-md-block'>
                                <AdminButton classname={['green', 'medium_btn']} onClick={handleSubmit(onSubmit)}>Сохранить</AdminButton>
                            </Col>
                        </>
                        :null
                }
            </Row>
        </div>
    )
}

RecruiterWallet.propTypes = {
    
}
RecruiterWallet.defaultProps = {
    
}

export default RecruiterWallet