import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import ChatWindow from "../../AuthPages/Support/components/ChatWindow/ChatWindow";
import ChatMessege from "../../../components/UI/ChatMessege/ChatMessege";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import {v4 as uuid} from 'uuid'
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import Select from "../../../components/UI/Select/Select";

const Chat = () => {
    const [msg, setMsg] = useState([])
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState('')
    const [image, setImage] = useState()

    useEffect(() => {
        getBaseChatData()
    }, [])

    const onClick = async (text) => {
        // let newPost = {
        //     id: uuid(),
        //     type: 'user',
        //     text: text,
        //     date: dateToTimestamp(new Date())
        // }
        //
        // setMsg(prevState => {
        //     return [newPost, ...prevState]
        // })

        await chooseChat()

    }

    const getBaseChatData = async () => {
        const data = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            staffId: store.fullAccess ? 'root' : store.user.id

        }
        const res = await postData('/staff/support/', data)
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
        console.log("formData", formData);
        fetch(
            "https://api.imgbb.com/1/upload?key=68c3edcc904ee3e28d2e63ec81876e40",
            { method: "POST", body: formData }
        )
            .then((response) => response.json())
            .then((data) => setImage(data.data.display_url));
    }

    const chooseChat = async (e) => {
        setCurrentChat(e.target.value)
        const res = await getData(`/staff/support/chat_item/get_chat_data/${e.target.value}/0/20/`)
        setMsg(res.data)
    }


    return (
        <Container>
            <AdminButtonCard>
                <h1>Чат</h1>
            </AdminButtonCard>
            <AdminButtonCard title={'Выбери чат'}>
                <select value={currentChat} onChange={chooseChat}>
                    <option>Выбери чат</option>
                    {
                        chats.map(item => <option key={item.text} value={item.value}>{item.text}</option>)
                    }
                </select>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row>
                    <ChatWindow onUploadImg={onUploadImg} onClick={onClick}>
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

Chat.propTypes = {
    
}
Chat.defaultProps = {
    
}

export default Chat