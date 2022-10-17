import React, {useEffect, useState} from 'react'
import {Container} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';

const UserNews = () => {
    const [state, setState] = useState([])
    const {theme} = useThemeContext(ThemeContext)

    useEffect(() => {
        getNews()
    }, [])

    const getNews = async () => {
        const res = await getData(`/news/get_news_for_user/${store.domain.domainId}`)
        setState(res.data)
    }


    return (
        <>
            {
                typeof state !== 'string' ?
                    state.slice(0).reverse('').map(item => {
                        return (
                            <ButtonCard style={{maxWidth: 1024, margin: '20px auto', textAlign: 'center'}} theme={theme}>
                                <h3 className='mb-3'>{item.newsTitle}</h3>
                                <div className='mb-3'>
                                    <img style={{maxWidth: 450}} src={item.newsImage} alt=""/>
                                </div>
                                <div className='mb-3'>
                                    <p style={{textAlign: 'justify'}}>{item.newsBody}</p>
                                </div>
                                <div>
                                    <span style={{color: 'grey', fontSize: '14px'}}>{getCurrentDate(item.newsDate)}</span>
                                </div>
                            </ButtonCard>
                        )
                    })
                    : <h2>No news</h2>
            }

        </>
    )
}

UserNews.propTypes = {

}
UserNews.defaultProps = {

}

export default UserNews