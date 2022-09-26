import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import './NavigationLink.scss'

const NavigationLink = ({to, children, classnames, onClick}) => {
    let classes = classNames(
        'navigation-link',
        classnames
    )

    return (
       <NavLink onClick={onClick} className={classes} to={to}>{children}</NavLink>
    )
}

NavigationLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
    classnames: PropTypes.string
}
NavigationLink.defaultProps = {

}

export default NavigationLink