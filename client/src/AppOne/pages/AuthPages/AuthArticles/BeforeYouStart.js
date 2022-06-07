import React from 'react'
import PropTypes from 'prop-types'
import {Container} from "react-bootstrap";
import {store} from "../../../../index";

const BeforeYouStart = () => {
    let domain = store.domain.domain_name.toUpperCase()
    return (
        <Container>
            <div className="article footer_links_page">
                <h1 className="article-title">Before You Start</h1>
                <p className="article-text">Crypto Trading are all about making the right choice. That includes
                    predicting
                    correctly in
                    which direction the market will move. There is a number of strategies for Crypto Trading which can
                    significantly
                    increase your profit. A strategy you choose depends on your experience and knowledge, but let's look
                    at some
                    basics that every trader should know:</p>
                <h4 className="article-subtitle">Money Management Strategy!</h4>
                <p className="article-text">This is not the strategy which will help you predict assets movements, yet
                    it is the
                    most
                    important strategy you should follow when trading Crypto Trading. {domain} cares about your financial
                    well
                    being and although we are here to help you profit and make your life better, we acknowledge, that
                    any
                    trading
                    carries financial risks. We recommend you develop your financial strategy and follow it at all times
                    when
                    trading.
                    Do not put all the money you have at stake - trading is an emotionless procedure and your every
                    choice
                    should be
                    well thought out. Remember that you are here to do business and make money.</p>

                <h4 className="article-subtitle">Analyzing markets!</h4>
                <p className="article-text">Financial news is a great aid to use when building your trading strategy. If
                    you
                    follow and
                    analyze news on the assets you trade, you are more likely to make consistent profit. Markets are
                    very
                    sensitive to
                    any global event and you don't have to major in economics to notice the connection.</p>

                <p className="article-text">If you want to know more about trading basics, you can easily find the rest
                    of the
                    information in open sources on the Internet.</p>

            </div>
        </Container>
    )
}

BeforeYouStart.propTypes = {
    
}
BeforeYouStart.defaultProps = {
    
}

export default BeforeYouStart