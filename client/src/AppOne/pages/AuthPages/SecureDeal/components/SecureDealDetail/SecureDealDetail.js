import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import classNames from "classnames/bind";
import cls from './SecureDealDetail.module.scss'
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import ChatWindow from "../../../Support/components/ChatWindow/ChatWindow";
import ChatRules from "../../../Support/components/ChatRules/ChatRules";
import {secureDealRulesText} from "../../../../../utils/userConstants";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import {getData, patchData, postData, putData} from "../../../../../services/StaffServices";
import SecureDealDetailConfirm from "../SecureDealDetailConfirm/SecureDealDetailConfirm";
import {useForm} from "react-hook-form";
import Modal from "../../../../../components/UI/Modal/Modal";
import ButtonCard from "../../../../../components/ButtonCard/ButtonCard";
import {useParams} from "react-router-dom";
import {store} from "../../../../../../index";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import ChatMessege from "../../../../../components/UI/ChatMessege/ChatMessege";

const SecureDealDetail = () => {
    const params = useParams()
    const cx = classNames.bind(cls)
    let classes = cx()
    const {register, handleSubmit} = useForm()
    const [modal, setModal] = useState(false)
    const [dealData, setDealData] = useState()
    const [state, setState] = useState({
        seller: false,
        sellerbuyer: false,
        completed: false
    })
    const [acception, setAcception] = useState(true)
    const [result, setResult] = useState('')
    useEffect(() => {
        getSecureDealData()
        getSupportMessages()
    }, [])

    const [msg, setMsg] = useState([])
    const [image, setImage] = useState()

    const getSecureDealData = async () => {
        const res = await getData(`/personal_area/secure_deal/secure_deal_detail/${params.id}/${store.user.email}`)
        setDealData(res.data.dealDetail)
    }
    const sendRewardData = async (data) => {
        data.dealId = dealData._id
        const res = await patchData('/personal_area/secure_deal/secure_deal_detail/accept_deal/', data)
        checkResponse(201)
        setModal(true)
        if (res.status === 201) {
            setState({
                ...state, completed: true
            })
        }
    }

    const checkResponse = (response) => {
        console.log('resp---', response)
        switch (response) {
            case 201:
                return setResult('Deal successfully completed')
            case !201:
                return setResult('Wrong password!')
            default:
                return console.log('something went wrong')
        }
    }

    const onAccept = () => {
        setAcception(false)
        setState({
            ...state, seller: true
        })
    }

    const onClick = async (text) => {
        const obj = {
            userId: store.user.id,
            domainName: window.location.host,
            staffId: store.user.id,
            curDate: dateToTimestamp(new Date()),
            messageBody: text,
            imageLink: image ? image : null,
            chatId: msg.length > 0 ? msg[0].chatId : null,
            isUser: true,
            supportName: store.domain.supportName,
            dealId: dealData._id
        }

        const res = await putData('/secure_deal/deal_detail/send_message_to_secure_deal_chat', obj)
        if (res.status === 202) {
            getSupportMessages()
        }
        console.log('res msg', res)
    }

    const getSupportMessages = async () => {
        const res = await getData(`/secure_deal/deal_detail/get_chat_for_user/${store.user.id}/0/50/`)
        setMsg(res.data)
        // createMessagesOnLoad(res.data)
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

    return (
        <Container>
            <Modal active={modal} setActive={setModal}>
                <h2>{result}</h2>
            </Modal>

            <h1>Deal #15</h1>
            <p>Full info about current secure deal</p>
            {/*{*/}
            {/*    acception ? <SecureDealDetailConfirm onClick={onAccept} onDecline={() => setAcception(false)}/> : null*/}
            {/*}*/}
            {
                dealData ?
                    <>
                        <ButtonCard>
                            <h5 className={cls.card_header}>Base info</h5>
                            <Row className='mb-3 mt-3'>
                                <Col>Seller</Col>
                                <Col>{dealData.seller}</Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>Buyer</Col>
                                <Col>{dealData.buyer}</Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>Price</Col>
                                <Col>{dealData.amountInCrypto} {dealData.coinName}</Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>Deadline</Col>
                                <Col>{getCurrentDate(dealData.dealDedline)}</Col>
                            </Row>
                            {
                                dealData.acceptCode ?
                                    <Row className='mb-3'>
                                        <Col>Password (shown only for buyer)</Col>
                                        <Col>{dealData.acceptCode}</Col>
                                    </Row>
                                    : null
                            }
                            {
                                !dealData.acceptCode ?
                                    <Row className='mb-3'>
                                        <Col>Enter password</Col>
                                        <Col>
                                            <Row className='align-items-center'>
                                                <Col className='col-4'><Input {...register('acceptCode')} classname='input_small' placeholder='password' /></Col>
                                                <Col><Button onClick={handleSubmit(sendRewardData)} classname='small'>Get reward</Button></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    : null
                            }
                        </ButtonCard>

                        <ButtonCard className='mt-4 p-3'>
                            <h5 className={cls.card_header}>Detailed info</h5>
                            <Row className='mt-3'>
                                <TextArea classnames='textarea_bordered' value={dealData.dealCondition}/>
                            </Row>
                        </ButtonCard>

                        <ButtonCard className='mt-4 p-3 mb-4'>
                            <h5 className={cls.card_header}>Chat</h5>
                            <Row className='mt-3'>
                                <Col className='col-12 col-lg-8 mb-3'>
                                    <ChatWindow onUploadImg={onUploadImg} onClick={onClick}>
                                        {
                                            msg.length ?
                                                msg.map(item => {
                                                    return(
                                                        <ChatMessege
                                                            key={item._id}
                                                            date={item.curDate}
                                                            type={item.isUser}
                                                            image={item.imageLink}
                                                            text={item.messageBody} />
                                                    )
                                                }) : <h2>empty</h2>
                                        }
                                    </ChatWindow>
                                </Col>
                                <Col className='col-12 col-lg-4 mb-3'>
                                    <ChatRules rulesDisclamer={secureDealRulesText} />
                                </Col>
                            </Row>
                        </ButtonCard>
                    </>
                    : <Preloader />
            }
        </Container>
    )
}

SecureDealDetail.propTypes = {
    
}
SecureDealDetail.defaultProps = {
    
}

export default SecureDealDetail