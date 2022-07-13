import React, {useEffect, useRef, useState} from 'react'
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
import {reverseArray} from "../../../utils/reverseArray";

const Support = () => {
    const [msg, setMsg] = useState([])
    const [image, setImage] = useState()

    useEffect(() => {
        getSupportMessages()
    }, [])

    const onClick = async (text) => {
        // let newPost = {
        //     type: 'user',
        //     text: text,
        //     date: getCurrentDate(dateToTimestamp(new Date()))
        // }
        //
        // setMsg(prevState => {
        //     console.log('prevState', prevState)
        //     console.log('newPost', newPost)
        //    return [newPost, ...prevState]
        // })

        const obj = {
            userId: store.user.id,
            domainName: window.location.host,
            staffId: '',
            curDate: dateToTimestamp(new Date()),
            messageBody: text,
            imageLink: image,
            chatId: msg.length > 0 ? msg[0].chatId : null,
            isUser: true
        }

        const res = await putData('/support/send_support_message/', obj)
        if (res.status === 202) {
            getSupportMessages()
        }
        console.log('res msg', res)
    }

    const getSupportMessages = async () => {
        const res = await getData(`/support/get_chat_for_user/${store.user.id}/${0}/${10}/`)
        setMsg(res.data)
        // createMessagesOnLoad(res.data)
    }

    const createMessagesOnLoad = (arr) => {
        let newArr = []
        arr.forEach(item => {
            let msg = {
                type: 'user',
                text: item.messageBody,
                date: dateToTimestamp(new Date())
            }
            newArr.push(msg)
        })
        setMsg([...msg, ...newArr])
        console.log('new arr', newArr)
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
            <ButtonCard>
                <Row>
                    <Col className='col-12 col-lg-8'>
                        <ChatWindow onUploadImg={onUploadImg} onClick={onClick}>
                            {
                                msg.length ?
                                    msg.reverse().map(item => {
                                        console.log('item support', item)
                                        return(
                                            <ChatMessege
                                                key={item._id}
                                                date={item.curDate}
                                                type={item.isUser}
                                                image={item.imageLink}
                                                text={item.messageBody} />
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