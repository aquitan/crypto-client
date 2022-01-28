import React, {useEffect} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import StaffWalletsItem from "./components/StaffWalletsItem/StaffWalletsItem";
import UserService from "../../../services/UserService";
import cls from './StaffWallets.module.scss'
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";

const StaffWallets = () => {
    const wallets = [
        {currency: 'BTC', id: 1},
        {currency: 'ETH', id: 2},
        {currency: 'USDT', id: 3},
        {currency: 'BCH', id: 4},
    ]

    const onGetWallets = async () => {
        const obj = {

        }
        const res = await UserService.getWallets(obj)
        const data = await res
        console.log('wallets', data)
    }
    useEffect(() => {
        onGetWallets()
    }, [])

    return (
        <Container>
            <h2 className='mt-4 mb-4'>Staff Wallets</h2>
            <Card className={`${cls.bg_black} mb-3 p-3`}>
                <AdminForm>
                    {
                        wallets.map(currency => {
                            return(
                                <Row className='mb-3'>
                                    <AdminInput key={currency.id} placeholder={currency.currency}/>
                                </Row>
                            )
                        })
                    }
                    <Row className='mb-3'>
                        <Col className='col-3'>
                            <AdminButton color='green'>Подтвердить</AdminButton>
                        </Col>
                        <Col className='col-3'>
                            <AdminButton color='blue'>Подтвердить с 2FA</AdminButton>
                        </Col>
                    </Row>
                </AdminForm>
            </Card>


            <Card className={`${cls.bg_black} mb-3 p-3`}>
                <Row className='mb-3'>
                    <Col className='col-lg-3'>
                        <select name="currency" id="">
                            <option value='BTC'>BTC</option>
                            <option value='ETH'>ETH</option>
                            <option value='USDT'>USDT</option>
                            <option value='BCH'>BCH</option>
                        </select>
                    </Col>
                </Row>
                <Row style={{borderBottom: '1px solid #cecece'}} className={'mb-3'}>
                    <Col>ID</Col>
                    <Col>Name</Col>
                    <Col>Currency</Col>
                    <Col>Address</Col>
                    <Col>Total</Col>
                    <Col>last</Col>
                </Row>
                <StaffWalletsItem id={1} name={'sadas'} currency={'BTC'} address={'ljsdfjsdkjfskjdfsdfsdfsdf'} total={0.0} last={0.0}/>
                <StaffWalletsItem id={1} name={'sadas'} currency={'BTC'} address={'ljsdfjsdkjfskjdfsdfsdfsdf'} total={0.0} last={0.0}/>
                <StaffWalletsItem id={1} name={'sadas'} currency={'BTC'} address={'ljsdfjsdkjfskjdfsdfsdfsdf'} total={0.0} last={0.0}/>
                <StaffWalletsItem id={1} name={'sadas'} currency={'BTC'} address={'ljsdfjsdkjfskjdfsdfsdfsdf'} total={0.0} last={0.0}/>
            </Card>
        </Container>
    )
}

export default StaffWallets