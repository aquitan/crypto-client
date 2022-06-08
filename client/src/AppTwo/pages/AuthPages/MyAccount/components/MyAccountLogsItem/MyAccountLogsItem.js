import React from 'react'
import {Col, Row} from "react-bootstrap";

const MyAccountLogsItem = (props) => {
    return (
        <div>
            <Row>
                <Col>
                    {props.ip}
                </Col>
                <Col>
                    {props.time}
                </Col>
            </Row>
        </div>
    )
}

export default MyAccountLogsItem