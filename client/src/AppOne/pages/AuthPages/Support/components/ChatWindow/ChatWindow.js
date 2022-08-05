import React, {useState} from 'react'
import './ChatWindow.scss'
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import FileUpload from "../../../../../components/UI/FileUpload/FileUpload";
import {ThemeContext, useThemeContext} from "../../../../../context/ThemeContext";

const ChatWindow = ({children, onClick, edited, onUploadImg}) => {
    const [state, setState] = useState('')
    const {theme} = useThemeContext(ThemeContext)

    const onChange = (e) => {
        setState(e.target.value)
    }
    const onBtnClick = () => {
        onClick(state)
        setState('')
    }

    return (
        <div className='chat mb-3'>
            <h5 style={{color: '#CCCED9', fontWeight: 'bold'}} className='ps-3 pe-3 pt-3'>Support 24/7</h5>
            <Row>
                <Col>
                    <div className="chat_message_area">
                        {children}
                    </div>
                </Col>
            </Row>
            <Row className='mt-3 mb-3 p-2 align-items-center'>
                <Col className='col-12 col-md-3 mb-2'><FileUpload classnames='fileBlue' onUploadImg={onUploadImg} id='file' /></Col>
                <Col className='col-12 col-md-6 mb-2'><Input classname='inputTransparent' maxLength={350} minLength={5} value={state} onChange={(e) => onChange(e)} placeholder='Type your message'/></Col>
                <Col className='col-12 col-md-3 mb-2'><Button style={{height: 50}} onClick={onBtnClick} classname='btnBlue'>Send</Button></Col>
            </Row>
        </div>
    )
}

export default ChatWindow