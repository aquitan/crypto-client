import {useEffect, useRef, useState} from 'react';
import Preloader from '../../../../../../components/UI/Preloader/Preloader';
import {Col, Row} from 'react-bootstrap';

const CurrencyPrice = () => {
    const [rate, setRate] = useState(0)

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
        <Row className='align-items-center justify-content-end'>
            <Col className='text-end' style={{fontSize: 28, fontWeight: 'bold'}}>

                <span>
                  {
                    rate ? `$ ${Number(rate).toFixed(5).toLocaleString('en-US')}` : <Preloader/>
                  }
                </span>
            </Col>
            <Col className='text-end'>
                Bitcoin Price (USD)
            </Col>
        </Row>
    )
}


export default CurrencyPrice