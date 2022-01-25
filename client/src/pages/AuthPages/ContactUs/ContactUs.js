import React from 'react'
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";

const ContactUs = () => {
    return (
        <div>
            <h1>Contact Us</h1>
            <Form>
                <Input placeholder='your name' />
                <Input placeholder='your email' />
            </Form>
        </div>
    )
}

export default ContactUs