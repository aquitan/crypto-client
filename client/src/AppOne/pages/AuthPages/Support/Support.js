import React, {useEffect, useState} from 'react'
import {Col, Row} from "react-bootstrap";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ChatRules from "./components/ChatRules/ChatRules";
import {supportRulesText} from "../../../utils/userConstants";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import ChatMessege from "../../../components/UI/ChatMessege/ChatMessege";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {getData, putData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import {useNavigate} from 'react-router-dom';

const Support = () => {
    const [msg, setMsg] = useState([])
    const [image, setImage] = useState()
    const navigate = useNavigate()
    const {theme} = useThemeContext(ThemeContext)

    useEffect(() => {
        getSupportMessages()
    }, [])

    const onClick = async (text) => {
        const obj = {
            userId: store.user.id,
            domainName: window.location.host,
            staffId: '',
            curDate: dateToTimestamp(new Date()),
            messageBody: text,
            imageLink: image ? image : null,
            chatId: msg.length > 0 ? msg[0].chatId : null,
            isUser: true,
            supportName: store.domain.supportName
        }

        try {
            const res = await putData('/support/send_support_message/', obj)
            getSupportMessages()
        } catch(e) {
            console.log('error', e)
            navigate('error-500')
        }
    }

    const getSupportMessages = async () => {
        const res = await getData(`/support/get_chat_for_user/${store.user.id}/${0}/${50}/`)
        setMsg(res.data.reverse())
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
        <>
            <ButtonCard style={{padding: 0}} theme={theme}>
                <Row className='py-3 px-3'>
                    <Col className='col-12 col-lg-9'>
                        <ChatWindow onUploadImg={onUploadImg} onClick={onClick}>
                            {
                                msg.length ?
                                  msg.map(item => {
                                      console.log('item support', item)
                                      return(
                                        <ChatMessege
                                          key={item._id}
                                          userId={item.userId}
                                          date={item.curDate}
                                          type={item.isUser}
                                          image={item.imageLink}
                                          text={item.messageBody} />
                                      )
                                  }) : null
                            }
                        </ChatWindow>
                    </Col>
                    <Col className='col-12 col-lg-3'>
                        <ChatRules rulesDisclamer={supportRulesText} />
                    </Col>
                </Row>
            </ButtonCard>
        </>
    )
}

Support.propTypes = {
    
}
Support.defaultProps = {
    
}

export default Support