import React from 'react'
import {Card, Col} from "react-bootstrap";
import cls from "../../Users.module.scss";

const UsersInfoCard = ({type, color, amount}) => {
    let classes = [cls.users_info_card]
    classes.push(cls[color])
    return (
        <Col className='color_card col-12 col-md-auto px-1'>
            <Card className={classes.join(' ')}>
                <b>{type}</b> {amount}
            </Card>
        </Col>
    )
}

export default UsersInfoCard