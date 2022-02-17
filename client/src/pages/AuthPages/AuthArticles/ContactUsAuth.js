import React from 'react'
import PropTypes from 'prop-types'
import {Container} from "react-bootstrap";
import {store} from "../../../index";

const ContactUsAuth = () => {
    let domain = store.domain.full_domain_name
    return (
        <Container>
            <div className="article footer_links_page">
                <h1 className="article-title">Contact Us</h1>
                <h4 className="article-subtitle">Technical Support Department:</h4>
                <p className="article-text">
                    <span className="article-text__email">support@{domain}</span>
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
        </Container>
    )
}

ContactUsAuth.propTypes = {
    
}
ContactUsAuth.defaultProps = {
    
}

export default ContactUsAuth