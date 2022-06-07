import React from 'react'
import './ModalDark.scss'
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import AdminButton from "../AdminButton/AdminButton";

const ModalDark = ({children, active, setActive, onClick, singleBtn}) => {

    let classes = ['modal']

    if (active) {
        classes.push('active')
    }


    return (
        <>
            {
                active &&
                <div className={classes.join(' ')} onClick={() => setActive}>
                    <div className='modal_content' onClick={(e) => e.stopPropagation()}>
                        <Row className='mb-2'>
                           <div>{children}</div>
                        </Row>
                        {
                            !singleBtn ? <Row>
                                            <Col>
                                                <AdminButton classname='green' onClick={onClick}>Подтвердить</AdminButton>
                                            </Col>
                                            <Col>
                                                <AdminButton onClick={setActive} classname='red'>Отмена</AdminButton>
                                            </Col>
                                        </Row>
                                : <Row className='justify-content-center pb-3 pt-3'>
                                    <AdminButton onClick={() => setActive(false)} classname='green'>Ок</AdminButton>
                                </Row>
                        }
                    </div>
                </div>
            }
        </>
    )
}

ModalDark.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    setActive: PropTypes.func,
}
ModalDark.defaultProps = {

}

export default ModalDark