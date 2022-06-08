import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Container} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import {getCurrentDate} from "../../../utils/getCurrentDate";

const UserNews = () => {
    const [state, setState] = useState()

    useEffect(() => {
        getNews()
    }, [])

    const getNews = async () => {
        const res = await getData(`/news/get_news_for_user/${store.domain.domainId}`)
        setState(res.data)
    }


    return (
        <Container>
            <h2>News</h2>
            {
                state ?
                    state.slice(0).reverse().map(item => {
                        return (
                            <ButtonCard>
                                <h3>{item.newsTitle}</h3>
                                <div>
                                    {item.newsBody}
                                </div>
                                <div>
                                    {getCurrentDate(item.newsDate)}
                                </div>
                            </ButtonCard>
                        )
                    })
                    : <h3>No news</h3>
            }

        </Container>
    )
}

UserNews.propTypes = {

}
UserNews.defaultProps = {

}

export default UserNews