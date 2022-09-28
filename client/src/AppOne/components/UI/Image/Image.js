import React from 'react'
import PropTypes from 'prop-types'
import cls from './Image.module.scss'
import classNames from "classnames/bind";

const Image = ({src, alt, classname, width, height, ...attr}) => {
    const cx = classNames.bind(cls)
    let classes = cx('image', classname)

    return (
        <img src={src} alt={alt} width={width} height={height} className={classes} {...attr} />
    )
}

Image.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    classname: PropTypes.any
}
Image.defaultProps = {
    src: 'https://via.placeholder.com/25x25',
    alt: 'crypto',
    classname: ''
}

export default Image