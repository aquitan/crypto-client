import React from 'react'
import {Container} from "react-bootstrap";
import {store} from "../../../../index";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';
import classNames from 'classnames/bind';
import cls from './AuthArticlesStyles.module.scss';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';

const ContactUsAuth = () => {
    const {theme} = useThemeContext(ThemeContext)
    const cx = classNames.bind(cls)
    const classes = cx('article', theme)
    return (
        <ButtonCard theme={theme}>
            <div className={classes}>
                <h1 className="article-title">Contact Us</h1>
                <h4 className="article-subtitle">Technical Support Department:</h4>
                <p className="article-text">
                    <span className="article-text__email">{store.domain.domainName}@support.com</span>
                </p>
                <h4 className="article-subtitle">Support Service during COVID-19:</h4>
                <p className="article-text">
                    As we work to ensure the security of our customers’ accounts and to keep our employees safe, we may
                    experience
                    degraded performance and availability for some of our services.
                </p>
                <h4 className="article-subtitle">Send us a message: </h4>
                <p className="article-text">
                    We’re here to help and answer any question you might have. We look forward to hearing from you. Feel
                    free to
                    contact
                    us via email or Support Desk.
                </p>
            </div>
        </ButtonCard>
    )
}

ContactUsAuth.propTypes = {
    
}
ContactUsAuth.defaultProps = {
    
}

export default ContactUsAuth