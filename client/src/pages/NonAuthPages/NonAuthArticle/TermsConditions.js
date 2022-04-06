import React from 'react'
import PropTypes from 'prop-types'
import {store} from "../../../index";
import {Container} from "react-bootstrap";
import Preloader from "../../../components/UI/Preloader/Preloader";

const TermsConditions = () => {
    const term = JSON.parse(JSON.stringify(store.terms.terms_body))
    const domainStore = JSON.parse(JSON.stringify(store.domain))
    let domain = store.domain.domain_name
    let domainBig = store.domain.full_domain_name
    let percent = store.domain.deposit_fee
    let str = term.replaceAll(('${domainSmall}'), domain).replaceAll(('${domainBig}'), domainBig).replaceAll('%percent%', percent+'%')
        .replaceAll('%General_Basics%', '<a href="/general-basics">General Basics</a>')

    function createMarkup() {
        return {__html: `${str}`};
    }

    console.log('createMarkup()', createMarkup().__html)

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

TermsConditions.propTypes = {

}
TermsConditions.defaultProps = {

}

export default TermsConditions