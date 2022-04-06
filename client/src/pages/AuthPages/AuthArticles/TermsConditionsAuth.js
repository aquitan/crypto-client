import React from 'react'
import PropTypes from 'prop-types'
import {store} from "../../../index";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {Container} from "react-bootstrap";

const TermsConditionsAuth = () => {
    const term = JSON.parse(JSON.stringify(store.terms.terms_body))
    let domain = store.domain.domain_name
    let domainBig = store.domain.full_domain_name
    let percent = store.domain.deposit_fee
    let str = term.replaceAll(('${domainSmall}'), domain).replaceAll(('${domainBig}'), domainBig)
        .replaceAll('%percent%', percent+'%')
        .replaceAll('%General_basics%', '<a href="/general-basics">General Basics</a>')

    function createMarkup() {
        return {__html: `${str}`};
    }
    return (
        <Container>
            {
                store.terms ?
                    <div dangerouslySetInnerHTML={createMarkup()}/>
                    : <Preloader />
            }
        </Container>
    )
}

TermsConditionsAuth.propTypes = {
    
}
TermsConditionsAuth.defaultProps = {
    
}

export default TermsConditionsAuth