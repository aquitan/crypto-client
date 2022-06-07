import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ChatRules from "./components/ChatRules/ChatRules";
import {supportRulesText} from "../../../utils/userConstants";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import ChatMessege from "../../../components/UI/ChatMessege/ChatMessege";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";

const Support = () => {
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
                                    }) : <h2>empty</h2>
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