import React, {useState} from 'react'
import './ChatWindow.scss'
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import FileUpload from "../../../../../components/UI/FileUpload/FileUpload";
import {ThemeContext, useThemeContext} from "../../../../../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../components/UI/Button/Button';

const ChatWindow = ({children, onClick, edited, onUploadImg, showRules}) => {
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
            <div style={{height: 68, fontWeight: 'bold', boxShadow: 'inset 0px -1px 0px #E5E5EA', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Chat support 24/7
              <Button onClick={showRules} style={{height: 30, margin: '0 20px'}} classname={'btnBlue'}>Show Rules</Button>
            </div>
            <Row>
                <Col>
                    <div className="chat_message_area">
                        {children}
                    </div>
                </Col>
            </Row>
            <div className='px-2 mt-2 align-items-center d-flex' style={{boxShadow: 'inset 0px 1px 0px #E5E5EA'}}>
              <div className='' style={{width: '100%'}}><Input style={{border: 'none', width: '100%'}} classname='inputTransparent' maxLength={350} minLength={5} value={state} onChange={(e) => onChange(e)} placeholder='Start typing...'/></div>
              <div style={{width: 'fit-content', padding: '0 20px'}} className=''><FileUpload onUploadImg={onUploadImg} id='file' /></div>
              <div className='' style={{width: 'fit-content', padding: '0 20px', cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faPaperPlane} onClick={onBtnClick} color={'grey'} />
                </div>
            </div>
        </div>
    )
}

export default ChatWindow