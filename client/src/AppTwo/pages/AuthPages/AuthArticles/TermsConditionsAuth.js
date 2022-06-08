import React from 'react'
import PropTypes from 'prop-types'
import {store} from "../../../../index";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {Container} from "react-bootstrap";
import TERMS from '../../../terms'

const TermsConditionsAuth = () => {

    let domain = store.domain.domainName
    let domainBig = store.domain.fullDomainName
    let domainSupport = store.domain.companyEmail
    let generalBasics = '<a href="/general-basics">General Basics</a>'
    let percent = store.domain.domainParams.depositFee
    const str = TERMS(domain, domainBig, domainSupport, percent, generalBasics)


    // let str = term.replaceAll(('${domainSmall}'), domain).replaceAll(('${domainBig}'), domainBig)
    //     .replaceAll('${userFee}', percent+'%')
    //     .replaceAll('${generalBasics}', '<a href="/general-basics">General Basics</a>')

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