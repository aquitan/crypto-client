import React from 'react'
import {Col, Row} from "react-bootstrap";

const MarketOverviewItem = ({image, name, price, symbol, volume, priceChange, theme}) => {
    return (
        <Row style={{borderBottom: '1px solid #CCCED9', color: theme === 'light' ? "#121318" : '#fff'}} className='my-4 py-3 align-items-center'>
            <Col className='d-flex align-items-center'>
                <img height={35} src={image} alt=""/>
                <div style={{fontSize: 16, fontWeight: 'bold'}} className='d-none d-md-block px-3'>{symbol.toUpperCase()}</div>
            </Col>
            <Col className='d-none d-md-block'>
                {name}
            </Col>
            <Col>
                ${price.toLocaleString()}
            </Col>
            <Col className='d-none d-md-block'>
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
        </Row>
    )
}


export default MarketOverviewItem