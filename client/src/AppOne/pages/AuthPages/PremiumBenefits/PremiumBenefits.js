import React from 'react'
import PropTypes from 'prop-types'
import {Card, Container} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";

const PremiumBenefits = () => {
    return (
        <Container>
            <h1>Premium benefits</h1>
            <ButtonCard>
                Here we will tell you what premium accounts benefits do we have!
            </ButtonCard>
        </Container>
    )
}

PremiumBenefits.propTypes = {

}
PremiumBenefits.defaultProps = {

}

export default PremiumBenefits