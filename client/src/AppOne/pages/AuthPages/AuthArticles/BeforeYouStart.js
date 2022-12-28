import React from 'react'
import {Container} from "react-bootstrap";
import {store} from "../../../../index";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';
import classNames from 'classnames/bind';
import cls from './AuthArticlesStyles.module.scss';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';

const BeforeYouStart = () => {
    const {theme} = useThemeContext(ThemeContext)
    const cx = classNames.bind(cls)
    const classes = cx('article', theme)
    let domain = store.domain.domainName.toUpperCase()
    return (
        <ButtonCard theme={theme}>
            <div className={classes}>
                <h1 style={{color: theme === 'light' ? '#2b3144cc' : '#fff'}} className="article-title mb-3">Before You Start</h1>
                <p className="article-text">Crypto Trading are all about making the right choice. That includes
                    predicting
                    correctly in
                    which direction the market will move. There is a number of strategies for Crypto Trading which can
                    significantly
                    increase your profit. A strategy you choose depends on your experience and knowledge, but let's look
                    at some
                    basics that every trader should know:</p>
                <h4 style={{color: theme === 'light' ? '#2b3144cc' : '#fff'}} className="article-subtitle mb-3">Money Management Strategy!</h4>
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

                <h4 style={{color: theme === 'light' ? '#2b3144cc' : '#fff'}} className="article-subtitle mb-3">Analyzing markets!</h4>
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
        </ButtonCard>
    )
}

BeforeYouStart.propTypes = {
    
}
BeforeYouStart.defaultProps = {
    
}

export default BeforeYouStart