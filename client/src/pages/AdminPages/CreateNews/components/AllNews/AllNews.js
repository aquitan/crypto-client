import React from 'react'
import PropTypes from 'prop-types'
import {Row} from "react-bootstrap";

const AllNews = ({data}) => {
    return (
        <div>
            <Row>
                {data.news_title}
            </Row>
            <Row>
                {data.news_image}
            </Row>
            <Row>
                {data.news_body}
            </Row>
        </div>
    )
}

AllNews.propTypes = {

}
AllNews.defaultProps = {

}

export default AllNews