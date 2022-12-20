import React from 'react'
import {Col, Row} from "react-bootstrap";

const MarketOverviewItem = ({image, name, price, symbol, volume, priceChange, theme, low, high}) => {
    return (
        <Row style={{borderBottom: '1px solid #CCCED9', color: theme === 'light' ? "#121318" : '#fff', fontSize: '12px'}} className='my-4 py-3 align-items-center justify-content-center'>
            <Col className='d-flex align-items-center justify-content-center col-4 col-md-2'>
                <img height={35} src={image} alt=""/>
                <b style={{color: theme === 'light' ? '#2b3144cc' : '#fff'}} className='mx-3 d-none d-xl-flex'>{symbol === 'TRX/USDT' ? 'Tether' : name === 'Teaser' ? 'Tether' : name}</b>
                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                  {symbol === 'USDT' ? 'ERC 20' : symbol.toUpperCase()}
                </div>
            </Col>
            
            <Col className='col-4 col-md-2 text-center'>
                ${price.toLocaleString()}
            </Col>
            <Col className='d-none d-xl-block col-4 col-md-2 text-center'>
                ${volume.toLocaleString()}
            </Col>
            <Col className='d-flex align-items-center col-4 justify-content-center col-md-1 text-center'>
                {priceChange < 0 ? (
                    <div style={{color: '#EF4444', fontWeight: 'bold'}}>{priceChange.toFixed(2)}%</div>
                ) :
                (
                    <div style={{color: '#10B981', fontWeight: 'bold'}}>{priceChange.toFixed(2)}%</div>
                )}
            </Col>
            <Col className='d-none d-sm-block col-4 col-md-2 text-center'>
                {low}
            </Col>
            <Col className='d-none d-sm-block col-4 col-md-1 text-center'>
                {high}
            </Col>
            <Col className='d-none d-md-block col-4 col-md-2 text-center'>
                {
                    priceChange < 0 ? <img src='/img/mini-chart-icon-red.svg' /> : <img src='/img/mini-chart-icon-blue.svg' />
                }
            </Col>
        </Row>
    )
}


export default MarketOverviewItem