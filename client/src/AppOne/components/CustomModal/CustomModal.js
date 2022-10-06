import React from 'react'
import {Button, Modal, Row} from 'react-bootstrap';
import {useThemeContext} from '../../context/ThemeContext';

const CustomModal = ({title, text, show, handleClose, btnClose, children, size}) => {
    const {theme} = useThemeContext()
    return (
        <Modal
            size={size}
            animation={false}
            fullscreen={'md-down'}
            style={{opacity: 1, zIndex: 9999999, paddingTop: '2%'}}
            dialogClassName={`modal-window ${theme}`}
            show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
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
                      <Button variant='danger' style={{width: 150}} onClick={handleClose}>{btnClose}</Button>
                  </Modal.Footer>
                  : null
            }

        </Modal>
    )
}


export default CustomModal