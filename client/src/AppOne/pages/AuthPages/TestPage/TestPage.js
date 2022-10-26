import React, {useState} from 'react'
import Input from "../../../components/UI/Input/Input";
import {useForm} from "react-hook-form";
import {Container} from "react-bootstrap";

const TestPage = () => {
    const {register, handleSubmit} = useForm()
    const [img, setImg] = useState()

    const onSubmit = (data) => {
        setImg(data.file[0].name)
    }
    return (
        <Container>
            <h2>Test img</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('file')}  type='file'/>
                <button>Submit</button>
            </form>
            <img src={img} alt="img"/>
        </Container>
    )
}

export default TestPage