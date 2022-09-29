import React from 'react'
import { Container } from 'react-bootstrap';
import ButtonCard from '../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../context/ThemeContext';

const Error500 = () => {
    const {theme} = useThemeContext()
    return (

        <Container style={{maxWidth: '100%', backgroundColor: theme === 'light' ? '#fff' : '#121318'}} className='h-100 m-0 p-0'>
            <ButtonCard style={{boxShadow: '0 0 15px 0px rgba(0, 0, 0, .5)', maxWidth: 800, margin: '5% auto'}} theme={theme}>
                <h1 style={{fontWeight: 'bold'}}>Error 500</h1>
                <h2>Internal server error...</h2>
            </ButtonCard>
        </Container>
    )
}

export default Error500