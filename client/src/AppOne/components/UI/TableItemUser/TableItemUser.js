import {Col, Row} from "react-bootstrap";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import Button from "../Button/Button";
import cls from './TableItemUser.module.scss'
import classNames from "classnames/bind";

const TableitemUser = ({date, usdAmount, cryptoAmount, coinName, status, onShow, address}) => {
    const cx = classNames.bind(cls)
    const classnames = cx('complete')

    return (
        <Row className={`mt-3 mb-3 align-items-center ${cls.item}`}>
            <Col className='text-center' style={{whiteSpace: 'pre-wrap'}}>{getCurrentDate(date)}</Col>
            <Col className='text-center'>${usdAmount}<br/> ({cryptoAmount.toFixed(5)} {coinName})</Col>
            <Col className=''>
                <Button onClick={() => onShow(date, usdAmount, cryptoAmount, coinName, address)} classname={'btnOrange'}>Show</Button>
            </Col>
        </Row>
    )
}

export default TableitemUser