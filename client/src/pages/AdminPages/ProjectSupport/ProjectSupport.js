import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {getData} from "../../../services/StaffServices";

const ProjectSupport = () => {
    const [state, setState] = useState('')

    useEffect(async () => {
        const res = await getData('/staff/project_support/')
        console.log('data', state)
        setState(res.data.message)
    }, [])

    return (
        <Container>
            <h1 className='mt-3'>Донат</h1>
            <AdminButtonCard>
                Wallet: <br/>
                {
                    state ? <p>{state}</p> : <h4>No data</h4>
                }
            </AdminButtonCard>
            <AdminButtonCard>
                <h2 className='mb-3'>Сообщить о проблеме</h2>
                <Row className='mb-3'>
                    <AdminInput placeholder='Заголовок'/>
                </Row>
                <Row className='mb-3'>
                    <TextArea classnames='dark' placeholder='Текст'/>
                </Row>
            </AdminButtonCard>
        </Container>
    )
}

ProjectSupport.propTypes = {

}
ProjectSupport.defaultProps = {

}

export default ProjectSupport