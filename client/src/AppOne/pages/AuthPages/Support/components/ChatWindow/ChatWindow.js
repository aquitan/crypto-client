import React, {useState} from 'react'
import './ChatWindow.scss'
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import FileUpload from "../../../../../components/UI/FileUpload/FileUpload";
import {ThemeContext, useThemeContext} from "../../../../../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../components/UI/Button/Button';
import Preloader from '../../../../../components/UI/Preloader/Preloader';

const ChatWindow = ({children, onClick, edited, onUploadImg, showRules, preloader, chatHeader}) => {
    const [state, setState] = useState('')
    const {theme} = useThemeContext(ThemeContext)

    const onChange = (e) => {
        setState(e.target.value)
    }
    const onBtnClick = (e) => {
        e.preventDefault()
        onClick(state)
        setState('')
    }

    return (
        <div className='chat'>
            <div style={{paddingBottom: '20px', fontWeight: 'bold', boxShadow: 'inset 0px -1px 0px #E5E5EA', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {chatHeader}
              {/*<Button onClick={showRules} style={{height: 30, margin: '0 20px'}} classname={'btnBlue'}>Show Rules</Button>*/}
            </div>
            <Row className='p-0'>
                <Col className='p-0'>
                    <div className="chat_message_area">
                        {children}
                    </div>
                    {
                        preloader ? <Preloader/> : null
                    }
                </Col>
            </Row>
            <div className='px-2 pt-3 align-items-center d-flex' style={{boxShadow: 'inset 0px 1px 0px #E5E5EA'}}>
                <div className='' style={{width: '100%'}}><Input style={{border: 'none', width: '100%'}} classname='inputTransparent' maxLength={350} minLength={5} value={state} onChange={(e) => onChange(e)} placeholder='Start typing...'/></div>
                <div style={{width: 'fit-content', padding: '0 20px'}} className=''><FileUpload onUploadImg={onUploadImg} id='file' /></div>
                <Button classname={['btnBlue']}>Send</Button>
            </div>
        </div>
    )
}

export default ChatWindow