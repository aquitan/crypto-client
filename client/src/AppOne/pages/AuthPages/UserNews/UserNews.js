import React, {useEffect, useState} from 'react'
import {Container} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {ThemeContext, useThemeContext} from '../../../context/ThemeContext';
import { Skeleton } from '@mui/material';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

const UserNews = () => {
    const [state, setState] = useState([])
    const [showSkeleton, setShowSkeleton] = useState(false)
    const {theme} = useThemeContext(ThemeContext)

    useEffect(() => {
        getNews()
    }, [])

    const getNews = async () => {
        try {
            setShowSkeleton(true)
            const res = await getData(`${getSwitchQuery('/news/get_news_for_user/')}${store.domain.domainId}`)
            setState(res.data)
        } catch(e) {

        } finally {
            setShowSkeleton(false)
        }
    }


    return (
        <>
            {
                showSkeleton ? 
                    <ButtonCard style={{maxWidth: 1024, margin: '20px auto', textAlign: 'center'}} theme={theme}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={200} height={200} />
                        </div>
                        <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                        <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                        <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                        <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                    </ButtonCard>
                    : 
                    <ButtonCard theme={theme} style={{maxHeight: '1200px', overflowY: 'auto'}}>
                        {
                            typeof state !== 'string' ?
                                state.slice(0).reverse('').map(item => {
                                    return (
                                        <div style={{borderBottom: '1px solid #eee', marginBottom: '30px'}}>
                                            <h3 className='mb-3'>{item.newsTitle}</h3>
                                            <div className='mb-3'>
                                                
                                            </div>
                                            <div className='mb-3'>
                                                <p style={{textAlign: 'justify'}}>
                                                    <img align='left' style={{maxWidth: 250, width: '100%', padding: '0 20px 0 0'}} src={item.newsImage} alt=""/>
                                                    {item.newsBody}
                                                </p>
                                            </div>
                                            <div style={{clear: 'both', marginTop: '20px', paddingTop: '20px'}}>
                                                <span style={{color: 'grey', fontSize: '14px'}}>{getCurrentDate(item.newsDate)}</span>
                                            </div>
                                        </div>
                                    )
                                })
                                : <h2>No news</h2>
                        }
                    
                    </ButtonCard>
            }
        </>
    )
}

export default UserNews