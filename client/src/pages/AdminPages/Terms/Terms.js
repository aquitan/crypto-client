import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import TextArea from "../../../components/UI/TextArea/TextArea";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import {textareaTerms} from "../../../utils/staffConstants";
import ModalDark from "../../../components/UI/ModalDark/ModalDark";
import {store} from "../../../index";

const Terms = () => {
    const {register, handleSubmit} = useForm()
    const [modal, setModal] = useState({
        openModal: false,
        termsData: ''
    })
    const term = JSON.parse(JSON.stringify(store.terms.terms_body))
    const [state, setState] = useState(term)

    const onSubmit = () => {
        console.log('data', modal.termsData)
        setModal({
            ...modal, openModal: false
        })
    }
    const showModal = (data) => {
        setModal({
            openModal: true,
            termsData: data
        })
    }
    const closeModal = () => {
        setModal({
            ...modal, openModal: false
        })
    }


    const onTextAreaChange = (e) => {
        setState(e.target.value)
    }

    return (
        <Container>
            <h1 className='mt-4'>Пользовательское соглашение</h1>
            <ModalDark active={modal.openModal} onClick={() => onSubmit()} setActive={closeModal}>
                <h3>Подтвердить действие?</h3>
            </ModalDark>

            <AdminButtonCard>
                <Row>
                    <Col className='col-2'>
                        {'${domain} = Domain'}
                    </Col>
                    <Col className='col-2'>
                        {'${DOMAIN} = DOMAIN'}
                    </Col>
                </Row>
            </AdminButtonCard>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(showModal)}>
                    <Row>
                        <TextArea onChange={onTextAreaChange} rows='50' classnames='dark' value={state} />
                    </Row>
                    <AdminButton classname='green'>Оправить</AdminButton>
                </AdminForm>
            </AdminButtonCard>

        </Container>
    )
}

Terms.propTypes = {

}
Terms.defaultProps = {

}

export default Terms