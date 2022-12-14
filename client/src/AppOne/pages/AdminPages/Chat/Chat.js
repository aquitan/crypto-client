import React, {useEffect, useState} from 'react'
import {Container, Row} from "react-bootstrap";
import ChatWindow from "../../AuthPages/Support/components/ChatWindow/ChatWindow";
import ChatMessege from "../../../components/UI/ChatMessege/ChatMessege";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {getData, patchData, postData, putData} from '../../../services/StaffServices';
import {store} from "../../../../index";
import CustomModal from '../../../components/CustomModal/CustomModal';

const Chat = () => {
    const [msg, setMsg] = useState([])
    const [limit, setLimit] = useState(0)
    const [chats, setChats] = useState([])
    const [msgError, setMsgError] = useState(false)
    const [currentChat, setCurrentChat] = useState('')
    const [currentEmail, setCurrentEmail] = useState('')
    const [image, setImage] = useState()

    useEffect(() => {
        getBaseChatData()
    }, [])

    const onClick = async (text) => {
        const obj = {
            domainName: window.location.host,
            staffId: store.user.id,
            curDate: dateToTimestamp(new Date()),
            messageBody: text,
            imageLink: image ? image : null,
            chatId: msg.length > 0 ? msg[0].chatId : null,
            isUser: true,
            supportName: store.domain.supportName,
            isStaff: store.user.isStaff,
            isAdmin: store.user.isAdmin,
            rootAccess: store.fullAccess,
            userEmail: 'aquitan@mail.ru'
        }
        try {
            const res = await putData('staff/support/send_message_to_user/', obj)
            if (res.status === 202) {
                const res = await getData(`/staff/support/chat_item/get_chat_data/${currentChat}/${limit}/50/`)
                setMsg(res.data)
            }
        } catch(e) {
            console.log(e);
        }


    }

    const getBaseChatData = async () => {
        const data = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            staffId: store.fullAccess ? 'root' : store.user.id

        }
        const res = await postData('staff/support/', data)
        let arr = []
        res.data.forEach((item) => {
            let obj = {
                value: item.chatId,
                text: item.userEmail
            }
            arr.push(obj)
        })
        setChats(arr)
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

    const chooseChat = async (e) => {
        setCurrentChat(e.target.value)
        const res = await getData(`/staff/support/chat_item/get_chat_data/${e.target.value}/0/50/`)
        setMsg(res.data)
    }

    const onEditChatMessage = async (id, text, img) => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            messageId: id,
            messageBody: text,
            imageLink: img,
            curDate: dateToTimestamp(new Date())
        }
        const res = await patchData('/staff/support/edit_message/', obj)
    }

    const getSupportMessages = async () => {
        const res = await getData(`/staff/support/chat_item/get_chat_data/${currentChat}/${limit}/50/`)
        setMsg(res.data.reverse())
        // createMessagesOnLoad(res.data)
    }

    useEffect(() => {
        if (currentChat) {
            getSupportMessages()
        }
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    return (
        <Container>

            <CustomModal show={msgError} handleClose={() => setMsgError(false)} size='md' themeDark={true} title={'????????????'} btnClose='Ok'>
                ???????????? ?????????????? ??????????????????!
            </CustomModal>

            <AdminButtonCard>
                <h1>??????</h1>
            </AdminButtonCard>
            <AdminButtonCard title={'???????????? ??????'}>
                <Row>
                    <select style={{backgroundColor: 'transparent', color: '#fff', padding: 10, width: '100%'}} value={currentChat} 
                    onChange={(e) => chooseChat(e)}>
                        <option>???????????? ??????</option>
                        {
                            chats.map(item => <option key={item.text} value={item.value}>{item.text}</option>)
                        }
                    </select>
                </Row>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row>
                    <ChatWindow onUploadImg={onUploadImg} onClick={onClick}>
                        {
                            msg.length ?
                                msg.map(item => {
                                    return(
                                        <ChatMessege
                                            key={item._id}
                                            inSupport={true}
                                            id={item._id}
                                            allowEdit={true}
                                            date={item.curDate}
                                            type={item.isUser}
                                            image={item.imageLink}
                                            onEditChatMessage={onEditChatMessage}
                                            text={item.messageBody} />
                                    )
                                }) : <h3>???????????? ??????</h3>
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
                </Row>
            </AdminButtonCard>
            
        </Container>
    )
}

export default Chat