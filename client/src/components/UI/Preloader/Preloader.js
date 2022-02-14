import React from 'react'
import {Spinner} from "react-bootstrap";

const Preloader = () => {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <Spinner animation='border' variant='success' />
        </div>
    )
}

export default Preloader