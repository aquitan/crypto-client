import React, {useContext} from 'react'
import {Button} from "react-bootstrap";
import {AuthContext} from "../../index";

const Dashboard = () => {
    const {store} = useContext(AuthContext)
    const onLogOut = () => {
        store.logout()
    }
    return (
        <div>
            <Button onClick={onLogOut}>Logout</Button>
            <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard