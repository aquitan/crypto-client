import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {useNavigate} from "react-router-dom";

const AllNews = ({data}) => {
    const navigate = useNavigate()

    const toComponent = () => {
        navigate(`/staff/create-news/detail`, {state: data})
    }

    return (
        <div className={'mb-3 mt-3'} style={{color: '#fff'}}>
            <Row style={{borderBottom: '1px solid #fff', paddingBottom: 10}}>
                <Col>{getCurrentDate(data.newsDate)}</Col>
                <Col>{data.newsTitle}</Col>
                <Col>{data.newsImage}</Col>
                <Col style={{height: 100, overflowY: "hidden"}}>{data.newsBody}</Col>
                <Col><AdminButton classname={'green'} onClick={toComponent}>Редактировать</AdminButton></Col>
            </Row>
        </div>
    )
}

AllNews.propTypes = {

}
AllNews.defaultProps = {

}

export default AllNews