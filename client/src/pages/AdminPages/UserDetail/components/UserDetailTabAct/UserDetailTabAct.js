import React, {useState} from 'react'
import {Card, Col, Form, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import cls from '../../UserDetail.module.scss'
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import UserService from "../../../../../services/UserService";
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import {v4 as uuid} from 'uuid'
import ModalDark from "../../../../../components/UI/ModalDark/ModalDark";

const UserDetailTabAct = (props) => {
    const [isModal, setIsModal] = useState()


    const {register: balanceRegister, handleSubmit: balanceHandleSubmit} = useForm()
    const {register: registerNotif, handleSubmit: handleNotifSubmit} = useForm()
    const {register: registerPercent, handleSubmit: handlePercentSubmit} = useForm()
    const {register: registerRecruiter, handleSubmit: handleRecruiterSubmit} = useForm()
    const {register: registerSupport, handleSubmit: handleSupportSubmit} = useForm()
    const [fullBan, setFullBan] = useState(false)
    const [isStaff, setIsStaff] = useState(false)
    const [isPremium, setIsPremium] = useState(false)
    const [doubleDep, setDoubleDep] = useState(false)
    const [transactionBan, setTransactionBan] = useState(false)
    const [swapBan, setSwapBan] = useState(false)
    const [premium, setPremium] = useState(false)
    console.log('ipData', props.ipData)

    const changeBalance = async (data) => {
        const response = await UserService.postUserDetailData('/123', data)
    }
    const changeNotif = async (data) => {
        const response = await UserService.postUserDetailData('/123', data)
    }
    const changePercent = async (data) => {
        const response = await UserService.postUserDetailData('/123', data)
    }
    const changeReqruiterName = async (data) => {
        const response = await UserService.postUserDetailData('/123', data)
    }
    const changeSupportName = async (data) => {
        const response = await UserService.postUserDetailData('/123', data)
    }


    const makeStaff = async () => {
        setIsStaff(!isStaff)
        const response = await UserService.postUserDetailData('/123',{isStaff: !isStaff})
    }
    const makePremium = () => {
        setIsModal(true)
    }
    const makeDouble = async () => {
        setDoubleDep(!doubleDep)
        const response = await UserService.postUserDetailData('/123',{doubleDep: !doubleDep})
    }
    const clickFullBan = async () => {
        setFullBan(!fullBan)
        const response = await UserService.postUserDetailData('/123',{isBan: !fullBan})
    }
    const makeTransactionBan = async () => {
        setTransactionBan(!transactionBan)
        const response = await UserService.postUserDetailData('/123',{transactionBan: !transactionBan})
    }
    const makeSwapBan = async () => {
        setSwapBan(!swapBan)
        const response = await UserService.postUserDetailData('/123',{swapBan: !swapBan})
    }

    const sendPremStatus = async () => {
        setIsModal(false)
        const response = await UserService.postUserDetailData('/personal_area/profile/update_premium_status/',{
            status: !isPremium
        })
        setIsPremium(!isPremium)
    }




    return (
        <div>

            <ModalDark active={isModal} setActive={setIsModal}>
                <Row>Вы уверены?</Row>
                <Row>
                    <Col>
                        <AdminButton color={'green'} onClick={sendPremStatus}>Да</AdminButton>
                    </Col>
                    <Col>
                        <AdminButton color={'red'} onClick={() => setIsModal(false)}>Нет</AdminButton>
                    </Col>
                </Row>
            </ModalDark>


            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Col className='col-4'>
                        <h3>Сделать Работником</h3>
                    </Col>
                    <Col className='col-3'>
                        {isStaff ? <AdminButton onClick={makeStaff} color={'red'} >Убрать</AdminButton> : <AdminButton onClick={makeStaff} color={'green'} >Сделать</AdminButton>}
                    </Col>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Изменение баланса</h3>
                        </Col>
                    </Row>
                    <AdminForm onSubmit={balanceHandleSubmit(changeBalance)}>
                        <Row>
                            <Col>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Счёт пользователя:</h5></Col>
                                    <Col>
                                        <Form.Select {...balanceRegister('wallet')} aria-label="Default select example">
                                            <option value="BTC">BTC</option>
                                            <option value="ETH">ETH</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Баланс кошелька:</h5></Col>
                                    <Col>
                                        <AdminInput {...balanceRegister('balance')} name='balance' placeholder='balance' value='2.0'/>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Нотификация:</h5></Col>
                                    <Col>
                                        <AdminInput {...balanceRegister('notification')} name='notification' placeholder='balance' value='This your notif text'/>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Направление:</h5></Col>
                                    <Col>
                                        <Form.Select {...balanceRegister('type')} aria-label="Default select example">
                                            <option value="deposit">Пополнение</option>
                                            <option value="withdraw">Снятие</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Сумма:</h5></Col>
                                    <Col>
                                        <AdminInput {...balanceRegister('sum')} name='sum' placeholder='0' />
                                    </Col>
                                </Row>
                            </Col>
                            <Row className={`${cls.bg_black} mt-3`}>
                                <Col className='col-3'>
                                    <AdminButton color={'green'} >Изменить</AdminButton>
                                </Col>
                            </Row>
                        </Row>

                    </AdminForm>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <AdminForm onSubmit={handleNotifSubmit(changeNotif)}>
                    <Row className='pt-3 pb-3 align-items-center'>
                        <Row>
                            <Col className='col-4'>
                                <h3>Нотификации</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Текст нотификации:</h5></Col>
                                    <Col>
                                        <AdminInput {...registerNotif('notificationText')} name='notificationText' />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col className='col-3'>
                                <AdminButton color={'green'} >Сделать</AdminButton>
                            </Col>
                        </Row>
                    </Row>
                </AdminForm>
            </Card>
            <Card className={`${cls.bg_black} mb-3`}>
                <AdminForm onSubmit={handlePercentSubmit(changePercent)}>
                    <Row className='pt-3 pb-3 align-items-center'>
                        <Row>
                            <Col className='col-4'>
                                <h3>Комиссия депозита:</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Текущий процент:</h5></Col>
                                    <Col>
                                        <AdminInput name='currentPercent' value={80} placeholder='Текущий процент'/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Новый процент</h5></Col>
                                    <Col>
                                        <AdminInput {...registerPercent('newPercent')} name='newPercent' placeholder='Новый процент'/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col className='col-3'>
                                <AdminButton color={'green'} >Установить</AdminButton>
                            </Col>
                        </Row>
                    </Row>
                </AdminForm>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <AdminForm onSubmit={handleRecruiterSubmit(changeReqruiterName)}>
                    <Row className='pt-3 pb-3 align-items-center'>
                        <Row>
                            <Col className='col-4'>
                                <h3>Новый стафф рекрутер:</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Изменить рекрутера:</h5></Col>
                                    <Col>
                                        <AdminInput {...registerRecruiter('recruiterName')} name='recruiterName' />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col className='col-3'>
                                <AdminButton color={'green'} >Изменить</AdminButton>
                            </Col>
                        </Row>
                    </Row>
                </AdminForm>
            </Card>



            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Премиум статус:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {isPremium ? <AdminButton onClick={makePremium} color={'green'}>Вкл</AdminButton> : <AdminButton onClick={makePremium} color={'red'}>Выкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <AdminForm onSubmit={handleSupportSubmit(changeSupportName)}>
                    <Row className='pt-3 pb-3 align-items-center'>
                        <Row>
                            <Col className='col-4'>
                                <h3>Изменить имя в саппорте</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='mt-3'>
                                    <Col className='col-lg-3'><h5>Изменить имя:</h5></Col>
                                    <Col>
                                        <AdminInput {...registerSupport('supportName')} name='supportName' />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col className='col-3'>
                                <AdminButton color={'green'} >Изменить</AdminButton>
                            </Col>
                        </Row>
                    </Row>
                </AdminForm>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Дабл депов:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {doubleDep ? <AdminButton onClick={makePremium} color={'red'}>Выкл</AdminButton>  :  <AdminButton onClick={makePremium} color={'green'}>Вкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Премиум статус:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {doubleDep ? <AdminButton onClick={makePremium} color={'red'}>Выкл</AdminButton>  :  <AdminButton onClick={makePremium} color={'green'}>Вкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Полный бан:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {fullBan ? <AdminButton onClick={clickFullBan} color={'red'}>Выкл</AdminButton> : <AdminButton onClick={clickFullBan} color={'green'}>Вкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Бан внутренних транзакций:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {transactionBan ? <AdminButton onClick={makeTransactionBan} color={'green'}>Вкл</AdminButton> : <AdminButton onClick={makeTransactionBan} color={'green'}>Выкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>

            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>Бан свапов:</h3>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            {swapBan ? <AdminButton onClick={makeSwapBan} color={'green'}>Вкл</AdminButton> : <AdminButton onClick={makeSwapBan} color={'green'}>Выкл</AdminButton>}
                        </Col>
                    </Row>
                </Row>
            </Card>
            <Card className={`${cls.bg_black} mb-3`}>
                <Row className='pt-3 pb-3 align-items-center'>
                    <Row>
                        <Col className='col-4'>
                            <h3>IP адреса:</h3>
                        </Col>
                    </Row>
                    <Row className={cls.ip_list}>
                        {
                            props.ipData.map(ip => {
                                return (
                                    <Row key={uuid()}>
                                        <Col className='col-3'>{ip.ip_address}</Col>
                                        <Col className='col-3'>{ip.email}</Col>
                                    </Row>
                                )
                            })
                        }
                    </Row>
                    <Row className='mt-3'>
                        <Col className='col-3'>
                            <AdminButton color={'green'}>Очистить IP</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </Card>

        </div>
    )
}

export default UserDetailTabAct