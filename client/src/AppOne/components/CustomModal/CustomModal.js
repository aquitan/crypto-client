import React from 'react'
import {Button, Modal, Row} from 'react-bootstrap';

const CustomModal = ({title, text, show, handleClose, btnClose, children, size}) => {
    return (
        <Modal
            size={size}
            animation={false}
            style={{opacity: 1, zIndex: 9999999, paddingTop: '10%'}}
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
            <Modal.Footer>
              <Button onClick={handleClose} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default CustomModal