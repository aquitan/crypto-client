import React, {useState} from 'react'
import PropTypes from 'prop-types'
import cls from './ChatMessage.module.scss'
import classNames from "classnames/bind";
import {Row} from "react-bootstrap";

const ChatMessege = ({text, date, type, allowEdit, id}) => {
    const [textVal, setTextVal] = useState(text)
    const [disabled, setDisabled] = useState(true)
    let cx = classNames.bind(cls)
    let classes = cx('chat-message', type)

    const onTextChange = (e) => {
        setTextVal(e.target.value)
    }

    const onEdit = (id) => {
        console.log('id', id)
        setDisabled(!disabled)
    }

    return (
        <div className={classes}>
            <Row>
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
                    {date}
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