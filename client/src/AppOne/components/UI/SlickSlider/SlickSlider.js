import React from 'react'
import PropTypes from 'prop-types'
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


const SlickSlider = ({children}) => {
    const settings = {
        dots: false,
        infinite: false,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };
    return (
        <Slider {...settings}>
            {children}
        </Slider>
    )
}

SlickSlider.propTypes = {
    children: PropTypes.node
}
SlickSlider.defaultProps = {
    
}

export default SlickSlider