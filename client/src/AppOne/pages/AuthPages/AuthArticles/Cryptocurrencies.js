import React from 'react'
import PropTypes from 'prop-types'
import {Container} from "react-bootstrap";
import {store} from "../../../../index";

const Cryptocurrencies = () => {
    let domain = store.domain.domain_name.toUpperCase()
    return (
        <Container>
            <div className="article footer_links_page">
                <h1 className="article-title">Education</h1>
                <p className="article-text">
                    Bitcoin, Ethereum, and other crypto are revolutionizing how we invest, bank, and use money. Read
                    this
                    beginner’s
                    guide to learn more.
                </p>

                <h4 className="article-subtitle">Education</h4>
                <p className="article-text">
                    At its core, cryptocurrency is typically decentralized digital money designed to be used over the
                    Internet.
                    Bitcoin, which launched in 2009, was the first cryptocurrency, and it remains by far the biggest,
                    most
                    influential
                    and best-known. In the decade since Bitcoin and other cryptocurrencies like Ethereum have grown as
                    digital
                    alternatives to money issued by governments.
                </p>

                <p className="article-text">
                    <b>Over 7$ trillion worth of Bitcoin has been transferred since 2009</b>
                </p>
                <p className="article-text">
                    The most popular cryptocurrencies, by market capitalization, are Bitcoin, Ethereum, Bitcoin Cash and
                    Litecoin.
                    Other well-known cryptocurrencies include Tezos, EOS and ZCash. Some are similar to Bitcoin. Others
                    are
                    based on
                    different technologies, or have new features that allow them to do more than transfer value.
                </p>

                <p className="article-text">
                    Crypto makes it possible to transfer value online without the need for a middleman like a bank or
                    payment
                    processor, allowing value to transfer globally, near instantly, 24/7, for low fees.
                </p>
                <p className="article-text">
                    Cryptocurrencies are usually not issued or controlled by any government or other central authority.
                    They’re
                    managed by peer-to-peer networks of computers running free, open-source software. Generally, anyone
                    who
                    wants to
                    participate is able to.
                </p>

                <p className="article-text">
                    If a bank or government isn’t involved, how is crypto secure? It’s secure because all transactions
                    are
                    vetted by a
                    technology called a blockchain. A cryptocurrency blockchain is similar to a bank’s balance sheet or
                    ledger.
                    Each
                    currency has its own blockchain, which is an ongoing, constantly re-verified record of every single
                    transaction
                    ever made using that currency.
                </p>
                <p className="article-text">
                    Unlike a bank’s ledger, a crypto blockchain is distributed across participants of the digital
                    currency’s
                    entire
                    network. No company, country, or third party is in control of it; and anyone can participate. A
                    blockchain
                    is a
                    breakthrough technology only recently made possible through decades of computer science and
                    mathematical
                    innovations.
                </p>

                <p className="article-text">
                    <b>Most importantly, cryptocurrencies allow individuals to take complete control over their
                        assets.</b>
                </p>

                <h4 className="article-subtitle">Privacy</h4>
                <p className="article-text">
                    When paying with cryptocurrency, you don’t need to provide unnecessary personal information to the
                    merchant.
                    Which
                    means your financial information is protected from being shared with third parties like banks,
                    payment
                    services,
                    advertisers, and credit-rating agencies. And because no sensitive information needs to be sent over
                    the
                    Internet,
                    there is very little risk of your financial information being compromised, or your identity being
                    stolen.
                </p>

                <h4 className="article-subtitle">Security</h4>
                <p className="article-text">
                    Almost all cryptocurrencies, including Bitcoin, Ethereum, Tezos, and Bitcoin Cash, are secured using
                    technology
                    called a blockchain, which is constantly checked and verified by a huge amount of computing power.
                </p>
                <p className="article-text"><b>Why invest in cryptocurrency?</b></p>

                <p className="article-text">
                    Online exchanges like {domain} have made trading, receiving and sending cryptocurrencies easy,
                    secure, and
                    rewarding. It only takes a few minutes to create a secure account. You can handle as little (or as
                    much)
                    cryptocurrency as you want. Many digital currencies, including BTC or ETH, offer holders rewards
                    just for
                    having
                    them. Unlike stocks or bonds, you can easily transfer your cryptocurrency to anyone else or use it
                    to pay
                    for
                    goods and services. Millions of people hold bitcoin and other digital currencies as part of their
                    investment
                    portfolios. Cryptocurrencies can be used to buy goods or services or held as part of an investment
                    strategy,
                    but
                    they can’t be manipulated by any central authority, simply because there isn’t one. No matter what
                    happens
                    to a
                    government, your cryptocurrency will remain secure.
                </p>
                <p className="article-text">
                    Based on everything, we can confidently say that cryptocurrency is the future of finance.
                </p>
                <p className="article-text">
                    If you want to know more about how cryptocurrency works, you can easily find the rest of the
                    information in
                    open
                    sources on the Internet.
                </p>
            </div>
        </Container>
    )
}

Cryptocurrencies.propTypes = {
    
}
Cryptocurrencies.defaultProps = {
    
}

export default Cryptocurrencies