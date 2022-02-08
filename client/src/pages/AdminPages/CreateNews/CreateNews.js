import React from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";

const CreateNews = () => {
    return (
        <Container>
            <h1>Новости</h1>
            <AdminButtonCard>
                <Row className='mb-3'>
                    <Col>
                        <AdminInput placeholder='Заголовок' />
                    </Col>
                    <Col>
                        <AdminInput placeholder='Дата' />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <TextArea classnames='dark' rows='10' placeholder='Основной текст'/>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <AdminInput type='file' placeholder='Добавить фото'/>
                    </Col>
                    <Col>
                        <AdminInput placeholder='Ссылка на Youtube' />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        {/*<Select />*/}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AdminButton classname='green'>Создать</AdminButton>
                    </Col>
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

CreateNews.propTypes = {

}
CreateNews.defaultProps = {

}

export default CreateNews