import React, {useEffect, useState} from 'react'
import {Container, Row} from "react-bootstrap";
import ChatWindow from "../../AuthPages/Support/components/ChatWindow/ChatWindow";
import ChatMessege from "../../../components/UI/ChatMessege/ChatMessege";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {getData, patchData, postData, putData} from '../../../services/StaffServices';
import {store} from "../../../../index";
import CustomModal from '../../../components/CustomModal/CustomModal';
import Select from '../../../components/UI/Select/Select';

const Chat = () => {
    const [msg, setMsg] = useState([])
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
                await chooseChat()
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
        console.log('change chat', e.target.value)
        setCurrentChat(e.target.value)
        const res = await getData(`/staff/support/chat_item/get_chat_data/${e.target.value}/0/20/`)
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

    return (
        <Container>

            <CustomModal show={msgError} handleClose={() => setMsgError(false)} size='md' themeDark={true} title={'Ошибка'} btnClose='Ok'>
                Ошибка отпавки сообщения!
            </CustomModal>

            <AdminButtonCard>
                <h1>Чат</h1>
            </AdminButtonCard>
            <AdminButtonCard title={'Выбери чат'}>
                <Row>
                    {/* <Sele style={{backgroundColor: 'transparent', color: '#fff', padding: 10, width: '100%'}} value={currentChat} 
                    
                    >
                        <option>Выбери чат</option>
                        {
                            chats.map(item => <option key={item.text} value={item.value}>{item.text}</option>)
                        }
                    </select> */}
                    <Select value={currentChat} onChange={(e) => chooseChat(e)} classname={'admin-square'} initial={true} options={chats}/>
                </Row>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row>
                    <ChatWindow onUploadImg={onUploadImg} onClick={onClick}>
                        {
                            msg.length ?
                                msg.reverse().map(item => {
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
                                }) : <h3>Выбери чат</h3>
                        }
                    </ChatWindow>
                </Row>
            </AdminButtonCard>
            
        </Container>
    )
}

export default Chat