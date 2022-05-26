import React from 'react'
import PropTypes from 'prop-types'
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import {Container} from "react-bootstrap";

const RecruiterDetail = () => {
    return (
        <Container>
            <AdminButtonCard>
                <h1>Детальная Рекрутера</h1>
            </AdminButtonCard>
            
        </Container>
    )
}

RecruiterDetail.propTypes = {
    
}
RecruiterDetail.defaultProps = {
    
}

export default RecruiterDetail