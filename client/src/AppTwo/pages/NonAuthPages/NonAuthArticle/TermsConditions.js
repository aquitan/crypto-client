import React from 'react'
import PropTypes from 'prop-types'
import {store} from "../../../../index";
import {Container} from "react-bootstrap";
import Preloader from "../../../components/UI/Preloader/Preloader";
import TERMS from "../../../terms";

const TermsConditions = () => {

    let domain = store.domain.domainName
    let domainBig = store.domain.fullDomainName
    let domainSupport = store.domain.companyEmail
    let generalBasics = '<a href="/general-basics">General Basics</a>'
    let percent = store.domain.domainParams.depositFee
    const str = TERMS(domain, domainBig, domainSupport, percent, generalBasics)

    function createMarkup() {
        return {__html: `${str}`};
    }

    return (
        <Container>
            {
                store.terms ?
                    <div className={'terms-style'} dangerouslySetInnerHTML={createMarkup()}/>
                    : <Preloader />
            }
        </Container>
    )
}

TermsConditions.propTypes = {

}
TermsConditions.defaultProps = {

}

export default TermsConditions