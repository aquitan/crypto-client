import React from 'react'
import PropTypes from 'prop-types'
import './ChatWindow.scss'
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import FileUpload from "../../../../../components/UI/FileUpload/FileUpload";

const ChatWindow = () => {
    return (
        <div className='chat mb-3'>
            <h5 className='ps-3 pe-3 pt-3'>Support 24/7</h5>
            <Row>
                <Col>
                    <div className="chat_message_area">

                    </div>
                </Col>
            </Row>
            <Row className='mt-3 mb-3 p-2 align-items-center'>
                <Col className='col-12 col-md-3 mb-2'><FileUpload id='file' /></Col>
                <Col className='col-12 col-md-6 mb-2'><Input placeholder='type your message'/></Col>
                <Col className='col-12 col-md-3 mb-2'><Button classname='small'>Send</Button></Col>
            </Row>
        </div>
    )
}

ChatWindow.propTypes = {

}
ChatWindow.defaultProps = {

}

export default ChatWindow