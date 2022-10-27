import React from 'react'
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {Col, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../context/ThemeContext';

const ContactUsDonate = () => {
    const {theme} = useThemeContext()
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        console.log('contact us', data)
    }

    return (
        <ButtonCard theme={theme}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className={'mb-3'}>
                    <Input classname='inputTransparent' {...register('name')} name='name' placeholder='your name' />
                </Row>
                <Row className={'mb-3'}>
                    <Input classname='inputTransparent' {...register('email')} name='email' placeholder='your email' />
                </Row>
                <Row className={'mb-3'}>
                    <TextArea classname='textareaTransparent' {...register('comment')} name='comment' placeholder='type your comment'/>
                </Row>
                <Row className={'mb-3'}>
                    <Input classname='inputTransparent' placeholder='donation address'/>
                </Row>
                <Row className={'mb-3'}>
                    <Button classname='btnBlue'>Submit</Button>
                </Row>
            </Form>
        </ButtonCard>
    )
}

export default ContactUsDonate