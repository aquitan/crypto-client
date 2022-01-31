import React from 'react'
import './ModalDark.scss'
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import AdminButton from "../AdminButton/AdminButton";

const ModalDark = ({children, active, setActive, onClick}) => {

    let classes = ['modal']

    if (active) {
        classes.push('active')
    }


    return (
        <>
            {
                active &&
                <div className={classes.join(' ')} onClick={setActive}>
                    <div className='modal_content' onClick={(e) => e.stopPropagation()}>
                        <Row>
                            {children}
                        </Row>
                        <Row>
                            <Col>
                                <AdminButton className='green' onClick={onClick}>Подтвердить</AdminButton>
                            </Col>
                            <Col>
                                <AdminButton onClick={setActive} className='red'>Отмена</AdminButton>
                            </Col>
                        </Row>
                    </div>
                </div>
            }
        </>
    )
}

ModalDark.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    setActive: PropTypes.bool,
    onClick: PropTypes.func
}
ModalDark.defaultProps = {

}

export default ModalDark