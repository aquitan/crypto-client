import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ChatRules from "./components/ChatRules/ChatRules";
import {supportRulesText} from "../../../utils/userConstants";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import ChatMessege from "../../../components/UI/ChatMessege/ChatMessege";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {getData, putData} from "../../../services/StaffServices";
import {store} from "../../../../index";

const Support = () => {
    const [msg, setMsg] = useState([])

    useEffect(() => {
        getSupportMessages()
    }, [])

    const onClick = async (text) => {
        let newPost = {
            type: 'user',
            text: text,
            date: getCurrentDate(dateToTimestamp(new Date()))
        }

        setMsg(prevState => {
           return [newPost, ...prevState]
        })

        const obj = {
            userId: store.user.id,
            domainName: window.location.host,
            staffId: '',
            curDate: getCurrentDate(dateToTimestamp(new Date())),
            messageBody: text,
            imageLink: 'http://s2.fotokto.ru/photo/full/702/7021158.jpg',
            chatId: null
        }

        const res = await putData('/support/send_support_message/', obj)

        console.log('res msg', res)
    }

    const getSupportMessages = async () => {
        const res = await getData(`/support/get_chat_for_user/${store.user.id}/${0}/${10}/`)
        createMessagesOnLoad(res.data)
    }

    const createMessagesOnLoad = (arr) => {
        let newArr = []
        arr.forEach(item => {
            let msg = {
                type: 'user',
                text: item.messageBody,
                date: getCurrentDate(dateToTimestamp(new Date()))
            }
            newArr.push(msg)
        })
        setMsg([...msg, ...newArr])
        console.log('new arr', newArr)
    }

    return (
        <Container>
            <ButtonCard>
                <Row>
                    <Col className='col-12 col-lg-8'>
                        <ChatWindow onClick={onClick}>
                            {
                                msg.length ?
                                    msg.map(item => {
                                        return(
                                            <ChatMessege
                                                date={item.date}
                                                type={item.type}
                                                text={item.text} />
                                        )
                                    }) : null
                            }
                        </ChatWindow>
                    </Col>
                    <Col className='col-12 col-lg-4'>
                        <ChatRules rulesDisclamer={supportRulesText} />
                    </Col>
                </Row>
            </ButtonCard>
        </Container>
    )
}

Support.propTypes = {
    
}
Support.defaultProps = {
    
}

export default Support