import React from 'react'
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {Col, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";

const ContactUs = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        console.log('contact us', data)
    }

    return (
        <div>
            <h1>Contact Us</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Input {...register('name')} name='name' placeholder='your name' />
                    </Col>
                    <Col>
                        <Input {...register('email')} name='email' placeholder='your email' />
                    </Col>
                </Row>
                <Row>
                    <TextArea {...register('comment')} name='comment' placeholder='type your comment'/>
                </Row>
                <Row>
                    <Button>Submit</Button>
                </Row>
            </Form>
        </div>
    )
}

export default ContactUs