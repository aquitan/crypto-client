import React, {useState} from 'react'
import PropTypes from 'prop-types'
import cls from './ChatMessage.module.scss'
import classNames from "classnames/bind";
import {Row} from "react-bootstrap";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {patchData} from "../../../services/StaffServices";
import {store} from "../../../../index";

const ChatMessege = ({text, date, type, allowEdit, id, image}) => {
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
            const obj = {
                isAdmin: store.isAdmin,
                isStaff: store.isStaff,
                rootAccess: store.fullAccess,
                messageId: id
            }
            console.log('disabled on')
            const res = await patchData('/staff/support/edit_message/', obj)
        }
    }

    return (
        <div className={classes}>
            <Row>
                <img style={{width: 250}} src={image} alt=""/>
                <span id={id} style={{fontWeight: 'bold'}}>
                    <input
                        className={cls.chatInput}
                        type="text"
                        disabled={disabled}
                        onChange={onTextChange}
                        value={textVal}/>
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