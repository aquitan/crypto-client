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
import AdminButton from '../../../components/UI/AdminButton/AdminButton';

const Support = () => {
    const [msg, setMsg] = useState([])
    const [image, setImage] = useState()
    const navigate = useNavigate()
    const {theme} = useThemeContext(ThemeContext)
    const [limit, setLimit] = useState(0)

    const onClick = async (text) => {
        const obj = {
            userEmail: store.user.email,
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
            navigate('error-500')
        }
    }

    const getSupportMessages = async () => {
        const res = await getData(`/support/get_chat_for_user/${store.user.id}/${limit}/${50}/`)
        setMsg(res.data.reverse())
        // createMessagesOnLoad(res.data)
    }


    const onUploadImg =(img) => {
        const formData = new FormData();
        formData.append("image", img);
        fetch(
            "https://api.imgbb.com/1/upload?key=68c3edcc904ee3e28d2e63ec81876e40",
            { method: "POST", body: formData }
        )
            .then((response) => response.json())
            .then((data) => setImage(data.data.display_url));
    }

    useEffect(() => {
        getSupportMessages()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
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
                        {
                                msg.length ? 
                                <Row className={'mb-3 mt-3'}>
                                    {
                                        msg.length >= 50 ?
                                        <AdminButton onClick={onMore} classname={['xs', 'green']}>Load older messages</AdminButton>
                                        : null
                                    }
                                    {
                                        limit > 0 ?
                                        <AdminButton onClick={onLess} classname={['xs', 'green']}>Back</AdminButton>
                                        : null
                                    }
                                </Row> : null
                            }
                    </Col>
                    <Col className='col-12 col-lg-3'>
                        <ChatRules rulesDisclamer={supportRulesText} />
                    </Col>
                </Row>
            </ButtonCard>
        </>
    )
}

export default Support