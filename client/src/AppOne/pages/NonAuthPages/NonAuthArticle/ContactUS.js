import React from 'react'
import {Container} from "react-bootstrap";
import {store} from "../../../../index";
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../context/ThemeContext';

const ContactUS = () => {
  const {theme} = useThemeContext()

  return (
        <ButtonCard style={{height: '100%', borderRadius: 0}} theme={theme}>

            <div className="article footer_links_page">
                <h4 className="article-title">Technical Support Department:</h4>
                <p className="article-text">{store.domain.domainName}@support.com</p>
                <h4 className="article-subtitle">Support Service during COVID-19: </h4>
                <p className="article-text">As we work to ensure the security of our customers’ accounts and to keep
                        our employees
                        safe,
                        we may experience degraded performance and availability for some of our services.</p>
                <h4 className="article-subtitle">Send us a message: </h4>
                <p className="article-text">We’re here to help and answer any question you might have. We look
                            forward to hearing
                            from
                            you. Feel free to contact us via email.</p>
            </div>

        </ButtonCard>
    )
}

ContactUS.propTypes = {

}
ContactUS.defaultProps = {

}

export default ContactUS