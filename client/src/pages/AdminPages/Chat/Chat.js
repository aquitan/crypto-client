import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import ChatWindow from "../../AuthPages/Support/components/ChatWindow/ChatWindow";
import ChatMessege from "../../../components/UI/ChatMessege/ChatMessege";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";

const Chat = () => {
    const messeges = [
        {type: 'user', text: 'hello support', date: getCurrentDate(dateToTimestamp(new Date()))},
        {type: 'user', text: 'hello support', date: getCurrentDate(dateToTimestamp(new Date()))},
        {type: 'support', text: 'hello user', date: getCurrentDate(dateToTimestamp(new Date()))},
        {type: 'support', text: 'hello user', date: getCurrentDate(dateToTimestamp(new Date()))},
        {type: 'user', text: 'hello support', date: getCurrentDate(dateToTimestamp(new Date()))},
        {type: 'support', text: 'hello user', date: getCurrentDate(dateToTimestamp(new Date()))},
    ]
    const [msg, setMsg] = useState(messeges)

    const onClick = (text) => {
        let newPost = {
            type: 'user',
            text: text,
            date: getCurrentDate(dateToTimestamp(new Date()))
        }

        setMsg(prevState => {
            return [newPost, ...prevState]
        })
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
                                    return(
                                        <ChatMessege
                                            date={item.date}
                                            type={item.type}
                                            text={item.text} />
                                    )
                                }) : <h2>empty</h2>
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