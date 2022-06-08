import React from 'react'
import cls from './Modal.module.scss'
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";

const Modal = ({children, active, setActive, title}) => {
    let classes = [cls.modal]
    if (active) {
        classes.push(cls.modal_active)
    }

    return (
        <div className={classes.join(' ')}  onClick={() => setActive(false)}>
            <div className={cls.modal_content} onClick={(e) => e.stopPropagation()}>
                <Row className='mt-3 mb-3'>
                    <h4>{title}</h4>
                </Row>
                <Row className='mt-3 mb-3'>
                    {children}
                </Row>
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    setActive: PropTypes.func,
    title: PropTypes.string
}

export default Modal