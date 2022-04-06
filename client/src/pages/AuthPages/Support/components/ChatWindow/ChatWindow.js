import React from 'react'
import PropTypes from 'prop-types'
import './ChatWindow.scss'
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";

const ChatWindow = () => {
    return (
        <div className='chat'>
            <h5 className='ps-3 pe-3 pt-3'>Support 24/7</h5>
            <Row>
                <Col>
                    <div className="chat_message_area">

                    </div>
                </Col>
            </Row>
            <div className="chat_btns_block">
                <Row className='mt-3 mb-3'>
                    <Col><input type="file"/></Col>
                    <Col><Input classname='input_small' placeholder='type your message'/></Col>
                    <Col><Button classname='small'>Send</Button></Col>
                </Row>
            </div>
        </div>
    )
}

ChatWindow.propTypes = {

}
ChatWindow.defaultProps = {

}

export default ChatWindow