import React from 'react'
import {Modal, Row} from 'react-bootstrap';
import {useThemeContext} from '../../context/ThemeContext';
import './CustomModal.scss'
import Button from '../UI/Button/Button';

const CustomModal = ({title, fullScreen, text, show, handleClose, btnClose, children, size, themeDark}) => {
    const {theme} = useThemeContext()
    return (
        <Modal
            size={size}
            fullscreen={fullScreen}
            dialogClassName={`modal-window ${themeDark ? 'dark' : theme}`}
            show={show} onHide={handleClose}>
            <Modal.Header style={{textAlign: 'center', display: 'inline-block'}} closeButton closeVariant={themeDark ? 'white' : theme === 'dark' ? 'white' : null}>
                <Modal.Title style={{textAlign: 'center', display: 'inline-block'}}>
                <img width={50} src='/img/exclamation-icon.svg' />

                    {title}
                </Modal.Title>
            </Modal.Header>
            {text || children && <Modal.Body>
              <Row className='py-0 px-3'>
                  {children}
                  {text}
              </Row>
            </Modal.Body>}
            {
                btnClose ?
                  <Modal.Footer style={{display: 'flex', justifyContent: 'center'}}>
                      <Button classname='btnBlue' style={{width: 150}} onClick={handleClose}>{btnClose}</Button>
                  </Modal.Footer>
                  : null
            }

        </Modal>
    )
}


export default CustomModal