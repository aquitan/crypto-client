import React, {useEffect, useRef, useState} from 'react';
import Preloader from '../../../../../../components/UI/Preloader/Preloader';
import {Col, Row} from 'react-bootstrap';
import {useValueContext} from '../../../../../../context/ValueContext';

const CurrencyPrice = () => {
    const {chartValue} = useValueContext()

    return (
        <Row className='align-items-center justify-content-end flex-column'>
            <Col className='text-end' style={{fontSize: 22, fontWeight: 'bold'}}>

                <div style={{whiteSpace: 'nowrap'}}>
                  {
                    chartValue ? `$ ${chartValue}` : <Preloader/>
                  }
                </div>
            </Col>
            <Col className='text-end'>
                Bitcoin Cash Price (USD)
            </Col>
        </Row>
    )
}


export default CurrencyPrice