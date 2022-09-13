import React from 'react'
import {store} from "../../../../index";
import {Container} from "react-bootstrap";
import Preloader from "../../../components/UI/Preloader/Preloader";
import TERMS from "../../../terms";
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../context/ThemeContext';

const TermsConditions = () => {
    const {theme} = useThemeContext()
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
        <ButtonCard style={{height: '100%', borderRadius: 0}} theme={theme}>
            {
                store.terms ?
                    <div className={'terms-style'} dangerouslySetInnerHTML={createMarkup()}/>
                    : <Preloader />
            }
        </ButtonCard>
    )
}
export default TermsConditions