import React from 'react'
import {Container} from "react-bootstrap";
import {store} from "../../../../index";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';
import classNames from 'classnames/bind';
import cls from './AuthArticlesStyles.module.scss';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';

const SecurityPolicyAuth = () => {
    const {theme} = useThemeContext(ThemeContext)
    const cx = classNames.bind(cls)
    const classes = cx('article', theme)
    let domain = store.domain.domainName.toUpperCase()
    return (
        <ButtonCard theme={theme}>
            <div className={classes}>
                <h1 className="article-title">Security Policy</h1>
                <h4 className="article-subtitle">User account protection</h4>
                <p className="article-text">
                    Some of the security measures highlighted below are in place by default, and others can be activated
                    based
                    on
                    the security level you need. Please let {domain} check the security status of your account.
                </p>
                <h4 className="article-subtitle">
                    Two-factor authentication (2FA):
                </h4>
                <p className="article-text">
                    Add an extra layer of security to your account and protect sensitive operations such as logging in,
                    generating
                    API keys, and withdrawing. Configure two-factor authentication using Google Authenticator, or a U2F
                    Security
                    Key.
                </p>
                <h4 className="article-subtitle">
                    Advanced verification tools:
                </h4>
                <ul className="article-list">
                    <li className="article-list__item">Login data is saved and analyzed for unusual activity.</li>
                    <li className="article-list__item">Intelligent system detects IP Address changes to prevent session
                        hijacking.
                    </li>
                    <li className="article-list__item">Email notifications report logins and include a link to instantly
                        freeze your
                        account if you suspect malicious activity.
                    </li>
                    <li className="article-list__item">Limit access to your account based on IP address.</li>
                    <li className="article-list__item">Withdrawals protection.</li>
                    <li className="article-list__item">Security system monitors withdrawals by IP address and other user
                        behavior
                        patterns, triggering manual admin inspection on withdrawals that appear unusual.
                    </li>
                    <li className="article-list__item">Withdrawal confirmation step that is immune to malicious browser
                        malware.
                    </li>
                    <li className="article-list__item">Email encryption with OpenPGP.</li>
                    <li className="article-list__item">Special wallet verifications.</li>
                </ul>
                <h4 className="article-subtitle">
                    We always care about your safety!
                </h4>
                <p className="article-text">
                    If you want to know more about trading basics, you can easily find the rest of the information in
                    open
                    sources
                    on the Internet.
                </p>
            </div>
        </ButtonCard>
    )
}

SecurityPolicyAuth.propTypes = {
    
}
SecurityPolicyAuth.defaultProps = {
    
}

export default SecurityPolicyAuth