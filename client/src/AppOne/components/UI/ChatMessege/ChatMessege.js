import React, {useState} from 'react'
import cls from './ChatMessage.module.scss'
import classNames from "classnames/bind";
import {Row} from "react-bootstrap";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {store} from '../../../../index';

const ChatMessege = ({text, date, type, allowEdit, onEditChatMessage, id, image, userId}) => {
    const [textVal, setTextVal] = useState(text)
    const [disabled, setDisabled] = useState(true)
    let cx = classNames.bind(cls)
    let classes = ''
    if (!allowEdit) {
        classes = cx('chat-message', type && store.user.id === userId ? 'user' : 'support')
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
                {
                    image ? <img style={{width: 250}} src={image} alt=""/> : null
                }
                <span id={id} style={{fontWeight: 'bold', padding: 0}}>
                    {
                        disabled ?
                            <div
                                style={{resize: 'none', wordBreak: 'break-all'}}
                                className={cls.chatInput}
                            >{textVal}</div>
                            : <textarea
                                rows={10}
                                style={{backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000'}}
                                onChange={onTextChange}
                                value={textVal}/>
                    }
                    {
                        allowEdit ? <div onClick={() => onEdit(id)} style={{fontSize: 10, cursor: 'pointer'}}>Edit</div> : null
                    }
                </span>
            </Row>
            <Row className='mt-2'>
                <span className={cls.time} style={{fontSize: 10}}>
                    {getCurrentDate(date)}
                </span>
            </Row>
        </div>
    )
}

export default ChatMessege