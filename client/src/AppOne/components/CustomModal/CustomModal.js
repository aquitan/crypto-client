import React from 'react'
import {Button, Modal, Row} from 'react-bootstrap';
import {useThemeContext} from '../../context/ThemeContext';
import './CustomModal.scss'

const CustomModal = ({title, fullScreen, text, show, handleClose, btnClose, children, size, themeDark}) => {
    const {theme} = useThemeContext()
    return (
        <Modal
            size={size}
            animation={true}
            fullscreen={fullScreen}
            style={{opacity: 1, zIndex: 9999999, paddingTop: '2%'}}
            dialogClassName={`modal-window ${themeDark ? 'dark' : theme}`}
            backdrop={'static'}
            show={show} onHide={handleClose}>
            <Modal.Header style={{textAlign: 'center', display: 'inline-block'}} closeButton closeVariant={themeDark ? 'white' : theme === 'dark' ? 'white' : null}>
                <Modal.Title style={{textAlign: 'center', display: 'inline-block'}}>{title}</Modal.Title>
            </Modal.Header>
            {text || children && <Modal.Body>
              <Row className='py-3 px-3'>
                  {children}
                  {text}
              </Row>
            </Modal.Body>}
            {
                btnClose ?
                  <Modal.Footer>
                      <Button variant='primary' style={{width: 150}} onClick={handleClose}>{btnClose}</Button>
                  </Modal.Footer>
                  : null
            }

        </Modal>
    )
}


export default CustomModal