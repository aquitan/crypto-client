import React, {useState} from 'react'
import PropTypes from 'prop-types'
import cls from './ChatMessage.module.scss'
import classNames from "classnames/bind";
import {Row} from "react-bootstrap";
import {getCurrentDate} from "../../../utils/getCurrentDate";

const ChatMessege = ({text, date, type, allowEdit, onEditChatMessage, id, image}) => {
    const [textVal, setTextVal] = useState(text)
    const [disabled, setDisabled] = useState(true)
    let cx = classNames.bind(cls)
    let classes = ''
    if (!allowEdit) {
        classes  = cx('chat-message', type ? 'user' : 'support')
    } else {
        classes  = cx('chat-message', !type ? 'user' : 'support')
    }

    const onTextChange = (e) => {
        setTextVal(e.target.value)
    }

    const onEdit = async (id) => {
        console.log('id', id)
        setDisabled(!disabled)
        if (!disabled) {
            onEditChatMessage(id, textVal, image)
        }
    }

    return (
        <div className={classes}>
            <Row>
                <img style={{width: 250}} src={image} alt=""/>
                <span id={id} style={{fontWeight: 'bold'}}>
                    {
                        disabled ?
                            <div
                                style={{resize: 'none', width: '100%'}}
                                className={cls.chatInput}
                            >{textVal}</div>
                            : <textarea
                                rows={10}
                                style={{backgroundColor: 'transparent', width: '100%', border: 'none', borderBottom: '1px solid #000'}}
                                onChange={onTextChange}
                                value={textVal}/>
                    }
                    {
                        allowEdit ? <div onClick={() => onEdit(id)} style={{fontSize: 10, cursor: 'pointer'}}>Edit</div> : null
                    }
                </span>
            </Row>
            <Row>
                <span style={{fontSize: 10}}>
                    {getCurrentDate(date)}
                </span>
            </Row>
        </div>
    )
}

ChatMessege.propTypes = {
    
}
ChatMessege.defaultProps = {
    
}

export default ChatMessege