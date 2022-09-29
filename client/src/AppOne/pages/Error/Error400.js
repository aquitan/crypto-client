import React from 'react'
import { Container } from 'react-bootstrap';
import ButtonCard from '../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../context/ThemeContext';

const Error400 = () => {
    const {theme} = useThemeContext()
    return (

      <Container style={{maxWidth: '100%', backgroundColor: theme === 'light' ? '#fff' : '#121318'}} className='h-100 m-0 p-0'>
          <ButtonCard style={{boxShadow: '0 0 15px 0 rgba(0, 0, 0, .5)', maxWidth: 800, margin: '5% auto'}} theme={theme}>
              <h1 style={{fontWeight: 'bold'}}>Error 400</h1>
              <h2>Wrong data...</h2>
          </ButtonCard>
      </Container>
    )
}

export default Error400