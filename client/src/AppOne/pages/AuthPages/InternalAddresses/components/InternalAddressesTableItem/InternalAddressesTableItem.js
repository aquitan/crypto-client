import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";

const InternalAddressesTableItem = ({date, id, amount, currency, status, onClick, cryptoAmount}) => {
    const obj = {
        date,
        amount,
        currency,
        id
    }
    return (
        <Row className='mt-3 mb-3'>
            <Col className={'d-none d-md-block text-center'}>
                {date}
            </Col>
            <Col className={'text-center align-items-center d-flex justify-content-center'}>
                <Button style={{height: 40}} onClick={() => onClick(obj)} classname={[`${status === 'complete' ? 'btnBlue' : 'btnRed'}`, 'btnOrange'] }>Show address</Button>
            </Col>
            <Col className={'text-center'}>
                {amount.toFixed(3)} USD <br/> {cryptoAmount.toFixed(5)} {currency}
            </Col>
        </Row>
    )
}

export default InternalAddressesTableItem