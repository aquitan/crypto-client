import React from 'react'
import {Card, Col} from "react-bootstrap";
import cls from "../../Users.module.scss";

const UsersInfoCard = ({type, color, amount}) => {
    let classes = [cls.users_info_card]
    classes.push(cls[color])
    return (
        <Col>
            <Card className={classes.join(' ')}>
                {type} {amount}
            </Card>
        </Col>
    )
}

export default UsersInfoCard