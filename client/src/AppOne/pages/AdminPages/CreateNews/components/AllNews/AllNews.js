import React from 'react'
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
            <Row className='flex-column flex-md-row' style={{borderBottom: '1px solid #fff', paddingBottom: 10}}>
                <Col className='mb-2'>{getCurrentDate(data.newsDate)}</Col>
                <Col className='mb-2'>{data.newsTitle}</Col>
                <Col className='mb-2'>{data.newsImage ? data.newsImage : 'Изображение не добавлено'}</Col>
                <Col className='mb-2' style={{height: 100, overflowY: "hidden"}}>{data.newsBody.length > 50 ? data.newsBody.slice(0, 50).concat('...') : data.newsBody}</Col>
                <Col className='mb-2'><AdminButton classname={'green'} onClick={toComponent}>Редактировать</AdminButton></Col>
            </Row>
        </div>
    )
}

AllNews.propTypes = {

}
AllNews.defaultProps = {

}

export default AllNews