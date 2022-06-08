import React from 'react'
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

const UserLayout = () => {

    return (
        <div className={'layout'}>
            <Container className='pt-5'>
                <Outlet/>
            </Container>
        </div>
    )
}

export default UserLayout