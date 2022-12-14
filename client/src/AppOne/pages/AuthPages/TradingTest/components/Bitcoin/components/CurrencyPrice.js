import React, {useEffect, useRef, useState} from 'react';
import Preloader from '../../../../../../components/UI/Preloader/Preloader';
import {Col, Row} from 'react-bootstrap';
import {useValueContext} from '../../../../../../context/ValueContext';
import { Skeleton } from '@mui/material';
import { useThemeContext } from '../../../../../../context/ThemeContext';

const CurrencyPrice = () => {
    const {chartValue} = useValueContext()
    const {theme} = useThemeContext()

    return (
        <Row className='align-items-center justify-content-end flex-column'>
            <Col className='text-end' style={{fontSize: 22, fontWeight: 'bold'}}>

                <div className='trade-changing-value' style={{whiteSpace: 'nowrap'}}>
                  {
                    chartValue ? `$ ${chartValue}` : <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                  }
                </div>
            </Col>
            <Col className='text-end'>
                Price (USD)
            </Col>
        </Row>
    )
}


export default CurrencyPrice