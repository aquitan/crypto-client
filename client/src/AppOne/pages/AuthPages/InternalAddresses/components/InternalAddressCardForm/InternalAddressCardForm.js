import React from 'react'
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

const InternalAddressCardForm = ({checkAddress, currency, setFormData, wallet, sum}) => {
    const {updateNotif} = useNotifContext(NotifContext)
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
        const res = await putData('/internal_transfer/make_internal_transfer/', data)
        updateNotif()
        // SwalSimple('Transaction sent!')
    }

    const onBlur = async (e) => {
        console.log('value', e.target.value)
        const res = await getData(`/internal_wallet_checker/${e.target.value}/${window.location.host}`)
        // try {
        //
        // } catch(e) {
        //     if (e.response.status === 500) navigate('/error-500')
        // }

    }
    const onCheckAmount = async () => {
        const res = await getData(`/user_balance_checker/${store.user.id}/${currency}`)
    }


    const checkValue = (value) => {
        if (sum < +value) {
            return false
        }
    }

    return (
        <>
            <Row className='mb-3'>
                <Col className='col mb-3'>
                    <Input {...register('toAddress', {
                        required: 'Invalid wallet',

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