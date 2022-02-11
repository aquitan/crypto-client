import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container} from "react-bootstrap";
import {getData} from "../../../services/StaffServices";
import {useParams} from "react-router-dom";

const DomainsDetail = () => {
    const params = useParams()
    console.log('params', params)
    useEffect(async () => {
        const res = await getData(`/staff/errors/get_all_errors/${params.id}`)
    }, [])

    return (
        <Container>
            <h1>domains detail</h1>
        </Container>
    )
}

DomainsDetail.propTypes = {

}
DomainsDetail.defaultProps = {

}

export default DomainsDetail