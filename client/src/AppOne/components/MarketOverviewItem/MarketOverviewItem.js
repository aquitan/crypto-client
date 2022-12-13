import React from 'react'
import {Col, Row} from "react-bootstrap";

const MarketOverviewItem = ({image, name, price, symbol, volume, priceChange, theme, low, high}) => {
    return (
        <Row style={{borderBottom: '1px solid #CCCED9', color: theme === 'light' ? "#121318" : '#fff', fontSize: '12px'}} className='my-4 py-3 align-items-center'>
            <Col className='d-flex align-items-center'>
                <img height={35} src={image} alt=""/>
                <b className='mx-3 d-none d-xl-flex'>{symbol === 'TRX/USDT' ? 'Tether' : name === 'Teaser' ? 'Tether' : name}</b>
                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                  {symbol === 'USDT' ? 'ERC 20' : symbol.toUpperCase()}
                </div>
            </Col>
            
            <Col>
                ${price.toLocaleString()}
            </Col>
            <Col className='d-none d-xl-block'>
                ${volume.toLocaleString()}
            </Col>
            <Col className='d-flex align-items-center'>
                {priceChange < 0 ? (
                    <div style={{color: '#EF4444', fontWeight: 'bold'}}>{priceChange.toFixed(2)}%</div>
                ) :
                (
                    <div style={{color: '#10B981', fontWeight: 'bold'}}>{priceChange.toFixed(2)}%</div>
                )}
            </Col>
            <Col className='d-none d-sm-block'>
                {low}
            </Col>
            <Col className='d-none d-sm-block'>
                {high}
            </Col>
            <Col className='d-none d-xl-block'>
                {
                    priceChange < 0 ? <img src='/img/mini-chart-icon-red.svg' /> : <img src='/img/mini-chart-icon-blue.svg' />
                }
            </Col>
        </Row>
    )
}


export default MarketOverviewItem