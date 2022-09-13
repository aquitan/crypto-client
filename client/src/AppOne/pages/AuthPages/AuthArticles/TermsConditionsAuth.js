import React from 'react'
import {store} from "../../../../index";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {Container} from "react-bootstrap";
import TERMS from '../../../terms'
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';
import classNames from 'classnames/bind';
import cls from './AuthArticlesStyles.module.scss';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';

const TermsConditionsAuth = () => {
    const {theme} = useThemeContext(ThemeContext)
    const cx = classNames.bind(cls)
    const classes = cx('article', theme)
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
        <ButtonCard theme={theme}>
            {
                store.terms ?
                    <div dangerouslySetInnerHTML={createMarkup()}/>
                    : <Preloader />
            }
        </ButtonCard>
    )
}

TermsConditionsAuth.propTypes = {
    
}
TermsConditionsAuth.defaultProps = {
    
}

export default TermsConditionsAuth