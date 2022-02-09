import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "react-select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";

const GroupList = () => {
    return (
        <Container>
            <AdminButtonCard>
                <Row>
                    <AdminInput placeholder='input'/>
                </Row>
                <Row>
                    <AdminInput placeholder='input'/>
                </Row>
                <Row>
                    <AdminButton classname='green'>Создать</AdminButton>
                </Row>
            </AdminButtonCard>

        </Container>
    )
}

GroupList.propTypes = {

}
GroupList.defaultProps = {

}

export default GroupList