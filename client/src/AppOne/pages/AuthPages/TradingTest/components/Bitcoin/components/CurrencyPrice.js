import {useEffect, useRef, useState} from 'react';
import Preloader from '../../../../../../components/UI/Preloader/Preloader';
import {Col, Row} from 'react-bootstrap';
import {useValueContext} from '../../../../../../context/ValueContext';

const CurrencyPrice = () => {
    const [rate, setRate] = useState(0)
    const {chartValue} = useValueContext()

    useEffect(() => {
        getRate()
        setInterval(() => {
            getRate()
        }, 3000)
    }, [])

    const getRate = async () => {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT`)
        const datas = await res.json()
        setRate(datas.lastPrice)
    }


    return (
        <Row className='align-items-center justify-content-end flex-column'>
            <Col className='text-end' style={{fontSize: 22, fontWeight: 'bold'}}>

                <div style={{whiteSpace: 'nowrap'}}>
                  {
                    rate ? `$ ${chartValue}` : <Preloader/>
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