import React from 'react'
import PropTypes from 'prop-types'
import cls from './ChatMessage.module.scss'
import classNames from "classnames/bind";
import {Row} from "react-bootstrap";

const ChatMessege = ({text, date, type}) => {
    let cx = classNames.bind(cls)
    let classes = cx('chat-message', type)


    return (
        <div className={classes}>
            <Row>
                <span style={{fontWeight: 'bold'}}>
                    {text}
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