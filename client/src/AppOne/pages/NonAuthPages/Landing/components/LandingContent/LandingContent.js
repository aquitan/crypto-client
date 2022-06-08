import React from 'react'
import PropTypes from 'prop-types'
import cls from './LandingContent.module.scss'

const LandingContent = () => {
    return (
        <div className={cls.landing_content}>
            <h1 style={{color: '#fff'}}>Content</h1>
        </div>
    )
}

LandingContent.propTypes = {

}
LandingContent.defaultProps = {

}

export default LandingContent