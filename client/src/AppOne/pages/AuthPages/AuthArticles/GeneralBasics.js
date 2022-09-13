import React from 'react'
import {Container} from "react-bootstrap";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';
import classNames from 'classnames/bind';
import cls from './AuthArticlesStyles.module.scss';
import {store} from '../../../../index';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';

const GeneralBasics = () => {
    const {theme} = useThemeContext(ThemeContext)
    const cx = classNames.bind(cls)
    const classes = cx('article', theme)
    return (
        <ButtonCard theme={theme}>
            <div className={classes}>
                <h1 className="article-title">General Basics</h1>
                <h4 className="article-subtitle">What are Crypto Trading?</h4>
                <p className="article-text">
                    What is the first thing that comes to your mind when you hear the word "trading"? - It's probably
                    numbers,
                    constantly changing indices, quotes and profit which is extremely hard to calculate. Another word
                    for it is
                    "complex". And it was until Crypto Trading came to market. You don't have to be an expert in
                    economics to
                    trade
                    profitably in Crypto Trading. As it is a form of investing, it is obviously still not a piece of
                    cake -
                    you'll need
                    to spend some time learning how it works and how to make accurate predictions in order to be able to
                    make
                    substantial profit. However, the process itself is much easier than, let's say, Forex. Most forms of
                    trading
                    imply
                    that an investor is actually buying an asset, and his profit or losses depend on the changing value
                    of the
                    asset
                    over various periods of time. In Crypto Trading, on the other hand, no real product is bought.
                    Basics of
                    Crypto
                    Trading are fairly simple: based on market tendencies and some other factors, a trader makes
                    prediction
                    about
                    movement of prices of various assets, which most commonly are currency pairs, precious metals and
                    stock.
                </p>

                <h4 className="article-subtitle">What assets can be traded at Crypto Trading?</h4>
                <p className="article-text">Crypto Trading can be traded with various types of assets. Most commonly
                    they are
                    currency
                    pairs, commodities and indices.</p>

                <h4 className="article-subtitle">How Crypto Trading work? </h4>
                <p className="article-text">
                    One of the reasons Crypto Trading have become so popular is the simplicity of the process: there are
                    just
                    two types
                    of predictions that are required: a trader should decide if the price of the chosen asset will
                    increase or
                    decrease.
                    He then chooses how much he wants to invest and the expiration time of the deal. A trader profit
                    from the
                    return
                    rate, which is stated before the option starts - that makes the outcome perfectly clear. For
                    example, a
                    trader
                    thinks that in two hours the price of EURUSD pair will be higher than at the moment and chooses to
                    invest
                    $10 with
                    80% return rate. If after two hours the price goes up, - he receives $18 to the account. If it goes
                    down the
                    loss is
                    only the initial investment which is $10.
                </p>
                <h4 className="article-subtitle">What is trading and why do we need it? </h4>
                <p className="article-text">
                    The main purpose of trading is to make a profit on trading assets. It can be money, stocks,
                    commodities,
                    cryptocurrencies, etc. You can earn on the purchase and sale of the asset. When a trader buys an
                    asset, they
                    hope
                    that the asset will rise in price and can be sold at a higher price. When a trader sells an asset,
                    they
                    expect to be
                    able to make money by redeeming the asset at an even lower price. In fact, the trader sells what
                    they do not
                    own.
                </p>
                <h4 className="article-subtitle">How to trade successfully? </h4>
                <p className="article-text">
                    To predict the future market value of assets and make money on it, traders use different strategies.
                    One of
                    the
                    possible strategies is to work with news. As a rule, it is chosen by beginners. Advanced traders
                    take into
                    account
                    many factors, use indicators, and know how to predict trends. However, even professionals have
                    losing
                    trades. Fear,
                    uncertainty, lack of patience or the desire to earn more bring losses even to experienced traders.
                    Simple
                    rules of
                    risk management help to keep emotions under control.
                </p>
                <h4 className="article-subtitle">What are assets? </h4>
                <p className="article-text">
                    Assets in the trading world are a commodity. These include money, securities, raw materials, indices
                    and
                    digital
                    currencies. The price of an asset is affected by the volume of trades that are made for the asset.
                    The more
                    often an
                    asset is bought, the higher the price becomes. If the asset starts to sell actively, the price
                    falls. The
                    fluctuation in the value of an asset per unit of time is called the rate of volatility. The main
                    trader`s
                    goal is
                    not to buy a commodity, but to make a profit due to the difference between the purchase price and
                    sale
                    price. So,
                    you can earn when the value of the asset rises and when it falls. There are 5 main types of assets:
                    currency
                    pairs,
                    stocks, indices, commodities and crypto currencies.
                </p>
                <h4 className="article-subtitle">Currency pairs? </h4>
                <p className="article-text">
                    Currency pairs are the price ratio of the currencies of two countries. This ratio shows how many
                    monetary
                    units of
                    one currency are worth a unit of another currency. Currency pairs are the most popular assets
                    because of the
                    high
                    volatility rate and as they are easier to analyze. As a rule, 75% of market operations are made in
                    pairs —
                    EUR/USD,
                    GBP/USD, USD/JPY, CHF/USD.
                </p>
                <h4 className="article-subtitle">Shares and indexes? </h4>
                <p className="article-text">
                    Features of trading stocks and indices are similar. Shares are securities that give the owner the
                    right to
                    receive
                    dividends and a part of the company's property if the company is sold. And the indices reflect the
                    state of
                    the
                    securities market. Compared to currency pairs, stocks and indices have less risk due to lower rates
                    of
                    volatility.
                    They are better suited for longer-term trades and long-term investments.
                </p>
                <h4 className="article-subtitle">Commodities? </h4>
                <p className="article-text">
                    Commodities include oil, gas and metals. As a rule, commodities show high volatility and give a
                    large number
                    of
                    signals for intraday trades.
                </p>
                <h4 className="article-subtitle">Crypto currencies? </h4>
                <p className="article-text">
                    Crypto Assets are digital financial instruments. They remain the most unpredictable and are high
                    risk
                    assets. They
                    have an extremely high volatility rating and can move in one direction for an extended period of
                    time.
                </p>
                <p className="article-text">
                    If you want to know more about trading basics, you can easily find the rest of the information in
                    open
                    sources on
                    the Internet.
                </p>
            </div>
        </ButtonCard>
    )
}

GeneralBasics.propTypes = {
    
}
GeneralBasics.defaultProps = {
    
}

export default GeneralBasics