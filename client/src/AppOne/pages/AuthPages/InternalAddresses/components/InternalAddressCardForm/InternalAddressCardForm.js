import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import error from "../../../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {getData, putData} from "../../../../../services/StaffServices";
import {store} from "../../../../../../index";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import {getGeoData} from "../../../../../queries/getSendGeoData";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import {NotifContext, useNotifContext} from "../../../../../context/notifContext";
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import addressValidator from '../../../../../utils/validateAddress';

const InternalAddressCardForm = ({checkAddress, currency, setFormData, wallet, sum}) => {
    const {updateNotif} = useNotifContext(NotifContext)
    const [validateAddress, setValidateAddress] = useState(true)
    const [addressModalError, setAddressModalError] = useState(false)
    const [modalError, setModalError] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const getCurCoinName = (coin, bucs) => {

        if (coin === 'usd' || coin === 'usdt') {
            return bucs
        }
        else {
            console.log('coin', store.rates[coin] * bucs)
            return store.rates[coin] * bucs
        }
    }

    const onClick = async (data) => {
        let logs = await getGeoData()
        data.userId = store.user.id
        data.userEmail = store.userEmail
        data.domainName = window.location.host
        data.coinName = currency
        data.amountInCrypto = +data.amountInCrypto
        data.amountInUsd = getCurCoinName(data.coinName.toLowerCase(), data.amountInCrypto)
        data.currentDate = dateToTimestamp()
        data.fromAddress = wallet
        data.depositStatus = 'pending'
        data.transferType = true
        data.transferStatus = 'complete'
        data.ipAddress = logs.ipAddress
        data.city = logs.city
        data.browser = logs.browser
        data.countryName = logs.countryName
        data.coordinates = logs.coordinates
        data.logTime = getCurrentDate(dateToTimestamp())
        delete data.wallet

        setFormData(data)
        if (wallet !== data.toAddress) {
            const res = await putData('/internal_transfer/make_internal_transfer/', data)
            updateNotif()
        } else {
            setModalError(true)
        }
        // SwalSimple('Transaction sent!')
    }

    const onBlur = async (e) => {

        try {
            const res = await getData(`/internal_wallet_checker/${e.target.value}/${window.location.host}`)
            console.log('res status', res.status)
            if (res.status !== 200) {
                setAddressModalError(true)
            }
        } catch(e) {
            console.log('error', e);
            setAddressModalError(true)
        }
    }
    const onCheckAmount = async () => {
        const res = await getData(`/user_balance_checker/${store.user.id}/${currency}`)
    }

    const checkWallet = (val) => {
        console.log('val', val);
        return val === wallet || "You can't use your own address to transfer"
    }


    const checkValue = (value) => {
        if (sum < +value) {
            return false
        }
    }

    return (
        <>
            <CustomModal show={modalError} size={'md'} handleClose={() => setModalError(false)} title={'Same wallet'} btnClose={true}>
                You can't make transaction to your own wallet!
            </CustomModal>

            <CustomModal show={addressModalError} size={'md'} handleClose={() => setAddressModalError(false)} title={'Address'} btnClose={true}>
                The address is not found! Please type a correct address
            </CustomModal>


            <Row className='mb-3'>
                <Col className='col mb-3'>
                    <Input {...register('toAddress', {
                        required: 'Invalid wallet',
                        validate: (val) => checkWallet(val),
                        onBlur: e => onBlur(e)
                    })} classname='inputTransparent' placeholder='Address' />
                    <ErrorMessage  name='toAddress' errors={errors} render={({message}) => <p className={error.error}>{message}</p>} />
                </Col>
                <Col className='col'>
                    <Input {...register('amountInCrypto', {
                        required: true,
                        pattern: /(\d+(?:\.\d+)?)/,
                        onBlur: () => onCheckAmount(),
                        validate: value => checkValue(value)
                    })} classname='inputTransparent' placeholder='Amount' />
                    <ErrorMessage  name='amountInCrypto' errors={errors} render={() => <p className={error.error}>Check the value</p>} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={handleSubmit(onClick)} classname='btnBlue'>Send</Button>
                </Col>
            </Row>
        </>
    )
}

InternalAddressCardForm.propTypes = {
    
}
InternalAddressCardForm.defaultProps = {
    
}

export default InternalAddressCardForm