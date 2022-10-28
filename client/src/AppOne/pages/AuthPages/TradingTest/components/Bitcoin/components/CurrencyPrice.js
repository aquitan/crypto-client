import React, {useEffect, useRef, useState} from 'react';
import Preloader from '../../../../../../components/UI/Preloader/Preloader';
import {Col, Row} from 'react-bootstrap';
import {useValueContext} from '../../../../../../context/ValueContext';
import { Skeleton } from '@mui/material';

const CurrencyPrice = () => {
    const {chartValue} = useValueContext()

    return (
        <Row className='align-items-center justify-content-end flex-column'>
            <Col className='text-end' style={{fontSize: 22, fontWeight: 'bold'}}>

                <div style={{whiteSpace: 'nowrap'}}>
                  {
                    chartValue ? `$ ${chartValue}` : <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={40} />
                  }
                </div>
            </Col>
            <Col className='text-end'>
                Bitcoin Price (USD)
            </Col>
        </Row>
    )
}


export default CurrencyPrice