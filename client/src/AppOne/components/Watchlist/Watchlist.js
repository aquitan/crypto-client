import { Col, Row } from "react-bootstrap";

const Watchlist = ({symbol, name, priceChange, image, theme, price}) => {

    return(
        <Row style={{borderBottom: '1px solid #CCCED9', color: theme === 'light' ? "#121318" : '#fff', fontSize: '12px'}} className='my-1 py-2 px-0 align-items-center'>
            <Col className='d-flex align-items-center'>
                <img height={35} src={image} alt=""/>
            </Col>
            
            <Col>
                ${price.toLocaleString()}
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

export default Watchlist;