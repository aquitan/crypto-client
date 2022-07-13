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
import {postData} from "../../../services/StaffServices";
import {store} from "../../../../index";

const Chat = () => {
    const [msg, setMsg] = useState([])

    useEffect(() => {
        getBaseChatData()
    }, [])

    const onClick = (text) => {
        let newPost = {
            id: uuid(),
            type: 'user',
            text: text,
            date: getCurrentDate(dateToTimestamp(new Date()))
        }

        setMsg(prevState => {
            return [newPost, ...prevState]
        })

    }

    const getBaseChatData = async () => {
        const data = {
            isStaff: store.isStaff,
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            staffId: store.fullAccess ? 'root' : store.user.id

        }
        const res = await postData('/staff/support/', data)
        setMsg(res.data)
    }


    return (
        <Container>
            <AdminButtonCard>
                <h1>Чат</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <Row>
                    <ChatWindow onClick={onClick}>
                        {
                            msg.length ?
                                msg.map(item => {
                                    console.log('item---', item)
                                    return(
                                        <ChatMessege
                                            key={item.id}
                                            id={item.id}
                                            allowEdit={true}
                                            date={item.date}
                                            type={item.type}
                                            text={item.text} />
                                    )
                                }) : null
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