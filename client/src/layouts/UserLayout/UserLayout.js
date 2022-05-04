import React from 'react'
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import CurrencyRates from "../../components/CurrencyRates/CurrencyRates";

const UserLayout = () => {

    return (
        <div className={'layout'}>
            <Container className='pt-5'>
                <CurrencyRates/>
                <Outlet/>
            </Container>
        </div>
    )
}

export default UserLayout