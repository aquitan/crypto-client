import React from 'react'
import PropTypes from 'prop-types'
import {Container} from "react-bootstrap";
import {store} from "../../../../index";

const AboutUS = () => {
    let domain = store.domain.domainName.toUpperCase()
    return (
        <Container>
            <div className="article footer_links_page">
                <h1 className="article-title">ABOUT US</h1>
                <h4 className="article-subtitle">ABOUT {domain}</h4>
                <p className="article-text">
                    Founded in 2015 by cybersecurity engineers, {domain} is the premier exchange and trading
                    platform, providing lightning-fast trade and exchange execution, dependable digital wallets and
                    industry-leading
                    security practices. Our mission is to help advance the exchange and trading industry by fostering
                    innovation,
                    incubating new and emerging technology, and driving transformative change.
                </p>

                <h4 className="article-subtitle">WHAT MAKES {domain} DIFFERENT? </h4>
                <p className="article-text">
                    Secure platform – {domain} employs the most reliable, effective security technologies available. We
                    leverage
                    an elastic, multi-stage wallet strategy to ensure that the majority of funds are kept in cold
                    storage for
                    additional
                    safety. Also, {domain} enables two-factor authentication for all users and provides a host of
                    additional
                    security features to provide multiple layers of protection. At {domain}, security will always be a
                    top
                    priority in every decision we make.
                </p>

                <p className="article-text">
                    Custom-built trading engine – Our custom trading engine was designed to be scalable and to ensure
                    that
                    orders are
                    executed in real-time.
                </p>

                <p className="article-text">
                    Fast deposits and withdrawals – Our highly efficient and automated monitoring platform allows us to
                    provide
                    users
                    the fastest transactions available today. This includes updates on balance, trade, and wallet
                    information.
                </p>

                <p className="article-text">
                    Driving Innovation – To help drive innovation in the exchange industry, {domain} is committed to
                    supporting
                    both new and established engines. {domain} seeks to provide its users with best of technologies.
                </p>

                <p className="article-text">
                    Commitment to compliance – {domain} is committed to complying with all current .
                    regulations that
                    help prevent, detect and remediate unlawful behavior by customers when using the {domain} Trading
                    Platform or
                    any of the company’s other services.
                </p>

                <p className="article-text">
                    {domain} has been also established by trading professionals possessing solid practical experience of
                    trading
                    on financial markets. The service provides a mass user with the opportunity to start working on the
                    market
                    of Crypto
                    Trading with the help of the {domain} leading Trading Platform. Today, the {domain} Platform
                    is
                    regarded as the most advanced platform and is optimized for simultaneous use by a large number of
                    traders
                    and
                    investors.
                </p>

                <p className="article-text">
                    The special feature of Crypto Trading is the possibility to know possible profit/loss amounts
                    beforehand,
                    which
                    means that they can be used for hedging exchange risks on the spot market. You don’t need to apply
                    leverage
                    either,
                    so you aren’t exposed to the risks associated with the margin trading. The Platform of the {domain}
                    is
                    realized in a web-interface and doesn't require installing any special software onto a user's
                    computer. It's
                    quite
                    simple, as compared with trading platforms used on the spot market, therefore it perfectly suits for
                    studying
                    peculiarities of financial markets. Crypto Trading is transparent and convenient way to invest any
                    volume,
                    especially when you are a beginner investor in the financial markets.
                </p>

                <p className="article-text">
                    Thank you for having chosen our service!
                </p>

                <h4 className="article-subtitle">Our Founder: </h4>
                <p className="article-text">
                    Shultz David is Co-Founder and CEO of {domain}.
                </p>
            </div>

        </Container>
    )
}

AboutUS.propTypes = {
    
}
AboutUS.defaultProps = {
    
}

export default AboutUS