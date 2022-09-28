import React from 'react'
import {Col, Row} from "react-bootstrap";
import FileUpload from "../UI/FileUpload/FileUpload";
import Input from "../UI/Input/Input";
import AdminButton from "../UI/AdminButton/AdminButton";
import cls from './AdminChat.module.scss'

const AdminChat = () => {
    return (
        <div className={`${cls.chat} mb-3`}>
            <Row>
                <Col>
                    <div className={cls.chat_message_area}>

                    </div>
                </Col>
            </Row>
            <Row className='mt-3 mb-3 p-2 align-items-center'>
                <Col className='col-12 col-md-3 mb-2'><FileUpload id='file' /></Col>
                <Col className='col-12 col-md-6 mb-2'><Input placeholder='type your message'/></Col>
                <Col className='col-12 col-md-3 mb-2'><AdminButton classname='green'>Отправить</AdminButton></Col>
            </Row>
        </div>
    )
}

export default AdminChat