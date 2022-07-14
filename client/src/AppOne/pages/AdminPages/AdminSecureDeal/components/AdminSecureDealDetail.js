import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../components/AdminButtonCard/AdminButtonCard";
import TextArea from "../../../../components/UI/TextArea/TextArea";
import {useForm} from "react-hook-form";
import Select from "../../../../components/UI/Select/Select";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../../components/UI/DatePickerCustom/DatePickerCustom";
import AdminButton from "../../../../components/UI/AdminButton/AdminButton";
import AdminChat from "../../../../components/AdminChat/AdminChat";
import ChatMessege from "../../../../components/UI/ChatMessege/ChatMessege";
import ChatWindow from "../../../AuthPages/Support/components/ChatWindow/ChatWindow";
import {store} from "../../../../../index";
import {getData, patchData, postData, putData} from "../../../../services/StaffServices";
import {useParams} from "react-router-dom";
import {getCurrentDate} from "../../../../utils/getCurrentDate";
import Preloader from "../../../../components/UI/Preloader/Preloader";

const AdminSecureDealDetail = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const [msg, setMsg] = useState([])
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState('')
    const [image, setImage] = useState()
    const [dealDetail, setDealDetail] = useState()
    const [dealDetailChat, setDealDetailChat] = useState()
    const params = useParams()
    console.log('params', params)
    const status = [
        {value: 'Pending', text: 'Pending'},
        {value: 'In progress', text: 'In progress'},
        {value: 'Denied', text: 'Denied'},
        {value: 'Canceled', text: 'Canceled'},
        {value: 'Completed', text: 'Completed'},
    ]
    const styles = {
        todayBtn: {
            position: 'absolute',
            backgroundColor: '#444',
            paddingLeft: 10,
            top: 0,
            right: 20,
            height: '100%',
            borderLeft: '1px solid #fff',
            display: 'flex',
            alignItems: 'center'
        }
    }
    const messageFrom = [
        {value: 'seller', text: 'seller'},
        {value: 'buyer', text: 'buyer'},
        {value: 'support', text: 'support'},
    ]
    const onToday = () => {
        setStartDate(new Date())
    }
    const onNowTime = () => {
        let time = new Date()
        setTimeDate(time)
    }

    useEffect(() => {
        getDealDetails()
    }, [])

    const getDealDetails = async () => {
        const data = {
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            isStaff: store.isStaff,
            dealId: params.id
        }

        const res = await postData('/staff/secure_deal/detail_deal/', data)
        setDealDetail(res.data[0])
        setDealDetailChat(res.data[1][0])
        getDealChatMessages(res.data[1][0].chatId)
    }

    const getDealChatMessages = async (id) => {
        const res = await getData(`/staff/secure_deal/detail_deal/get_chat_data/${id}/0/50/`)
    }

    const onUploadImg =(img) => {
        const formData = new FormData();
        formData.append("image", img);
        console.log("formData", formData);
        fetch(
            "https://api.imgbb.com/1/upload?key=68c3edcc904ee3e28d2e63ec81876e40",
            { method: "POST", body: formData }
        )
            .then((response) => response.json())
            .then((data) => setImage(data.data.display_url));
    }

    if (!dealDetail) {
        return <AdminButtonCard>
            <Preloader/>
        </AdminButtonCard>
    }

    const onEditChatMessage = async (id, text, img) => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            messageId: id,
            messageBody: text,
            imageLink: img
        }
        console.log('disabled on')
        const res = await patchData('/staff/secure_deal/detail_deal/edit_message/', obj)
    }

    return (
        <Container>
            <h1>Защищенная сделка</h1>
            <AdminButtonCard>
                <h3 className={'mb-3'}>Инфо</h3>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Seller</Col>
                    <Col>{dealDetail.seller}</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Buyer</Col>
                    <Col>{dealDetail.buyer}</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Награда</Col>
                    <Col>{dealDetail.amountInCrypto} {dealDetail.coinName}</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Пароль</Col>
                    <Col>{dealDetail.acceptCode}</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Статус</Col>
                    <Col>{dealDetail.status}</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Дедлайн</Col>
                    <Col>{getCurrentDate(dealDetail.dealDedline)}</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Создатель</Col>
                    <Col>{dealDetail.userEmail}</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Дата создания</Col>
                    <Col>{getCurrentDate(dealDetail.dateOfCreate)}</Col>
                </Row>

                <Row className={'mb-3'}>
                    <h4 className={'mb-3 mt-3'}>Conditions</h4>
                    <TextArea {...register('Conditions')} classnames='dark textarea_square' rows='10' placeholder='Conditions'/>
                </Row>
                <Row className={'mb-3'}>
                    <h4 className={'mb-3 mt-3'}>Status</h4>
                    <Select {...register('status')} classname={'admin-square'} options={status}/>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard>
                <h3 className={'mb-3'}>Обновить даты</h3>
                <Form>
                    <Row className={'mb-3'}>
                        <Col className='col-12 col-lg-6 mb-3' style={{position: 'relative'}}>
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText={'Дата'}
                                         selected={startDate}
                                         dateFormat='yyyy/MM/dd'
                                         todayButton="Today"
                                         onChange={(date) => setStartDate(date)} />
                            <span style={styles.todayBtn} onClick={onToday}>Today</span>
                        </Col>
                        <Col className='col-12 col-lg-6 mb-3' style={{position: 'relative'}}>
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText='Время'
                                         selected={timeDate}
                                         onChange={(date) => setTimeDate(date)}
                                         showTimeSelect
                                         showTimeSelectOnly
                                         timeIntervals={1}
                                         timeCaption="Time"
                                         dateFormat="HH:mm"/>
                            <span style={styles.todayBtn} onClick={onNowTime}>Now</span>
                        </Col>
                    </Row>
                    <Row className={'justify-content-center'}>
                        <AdminButton classname={'green'}>Подтвердить</AdminButton>
                    </Row>
                </Form>
            </AdminButtonCard>

            <AdminButtonCard>
                <h3 className={'mb-3'}>Чат</h3>
                <Row className={'col-12 col-lg-3 mb-3'}>
                    <Select {...register('msgFrom')} classname={'admin-square'} options={messageFrom}/>
                </Row>
                <Row>
                    <ChatWindow onUploadImg={onUploadImg} >
                        {
                            msg.length ?
                                msg.reverse().map(item => {
                                    console.log('item item', item)
                                    return(
                                        <ChatMessege
                                            key={item._id}
                                            id={item._id}
                                            allowEdit={true}
                                            date={item.curDate}
                                            type={item.isUser}
                                            image={item.imageLink}
                                            onEditChatMessage={onEditChatMessage}
                                            text={item.messageBody} />
                                    )
                                }) : null
                        }
                    </ChatWindow>
                </Row>
            </AdminButtonCard>
            
        </Container>
    )
}

AdminSecureDealDetail.propTypes = {
    
}
AdminSecureDealDetail.defaultProps = {
    
}

export default AdminSecureDealDetail