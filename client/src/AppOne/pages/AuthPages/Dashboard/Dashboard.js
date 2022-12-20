import React, {useEffect, useState} from 'react'
import {Col, Modal, Row} from "react-bootstrap";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import WalletInfoBlock from "../../../components/UI/WalletInfoBlock/WalletInfoBlock";
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {getGeoData} from "../../../queries/getSendGeoData";
import {currencyRateChangeIndicator} from "../../../utils/currencyRateChangeIndicator";
import {findPercent} from "../../../utils/findPercent";
import Preloader from "../../../components/UI/Preloader/Preloader";
import SlickSlider from "../../../components/UI/SlickSlider/SlickSlider";
import {observer} from "mobx-react-lite";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import MarketOverviewItem from "../../../components/MarketOverviewItem/MarketOverviewItem";
import Input from "../../../components/UI/Input/Input";
import InternalSwap from "../InternalSwap/InternalSwap";
import SkeletonBlocks from '../../../components/SkeletonBlocks/SkeletonBlocks';
import CustomModal from '../../../components/CustomModal/CustomModal';
import LandingSkeleton from '../../NonAuthPages/LandingSkeleton/LandingSkeleton';
import { Skeleton } from '@mui/material';
import UserPageSkeleton from '../../../components/UserPageSkeleton/UserPageSkeleton';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import Watchlist from '../../../components/Watchlist/Watchlist';

const Dashboard = () => {
    const {theme} = useThemeContext(ThemeContext)
    const [search, setSearch] = useState('')
    const [balance, setBalance] = useState([])
    const [percent, setPercent] = useState([])
    const [markets, setMarkets] = useState([])
    const [show, setShow] = useState(false)
    const coinsArr = ['btc', 'eth', 'bch', 'usdt', 'sol', 'trx']

    const getDashboard = async () => {
        let geodata = await getGeoData()
        geodata.domainName = window.location.host
        geodata.id = store.user.id
        const res = await postData(getSwitchQuery('/dashboard/'), geodata)
    }
    useEffect(() => {
        const controller = new AbortController();
        getDashboard()
        getBalance()
        getMarketOverview()
        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {
            getMarketOverview()
        }, 15000)
        return () => clearTimeout(timeout)
    }, [])

    if (store.isLoading) {
        return (
            <LandingSkeleton />
        )
    }

    const getBalance = async () => {
        const res = await getData(`${getSwitchQuery('/get_user_balance/')}${store.user.id}`)
        setBalance(res.data)
    }

    const getMarketOverview = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
        const data = await res.json()
        setMarkets(data)
    }


    const countTotalBalance = () => {
        let total = 0
        let arr = []
        balance.forEach(item => {
            if (item.coinName === 'BTC') {
                let val = item.coinBalance * findPercent(store.rates.btc, percent)
                arr.push(val)
            } else if (item.coinName === 'ETH') {
                let val = item.coinBalance * findPercent(store.rates.eth, percent)
                arr.push(val)
            } else if (item.coinName === 'BCH') {
                let val = item.coinBalance * findPercent(store.rates.bch, percent)
                arr.push(val)
            } else if (item.coinName === 'USDT') {
                let val = item.coinBalance * findPercent(store.rates.usdt, percent)
                arr.push(val)
            }else if (item.coinName === 'USDT') {
                let val = item.coinBalance * findPercent(store.rates.usdt, percent)
                arr.push(val)
            } else if (item.coinName === 'TRX') {
                let val = item.coinBalance * findPercent(store.rates.usdt, percent)
                arr.push(val)
            }
            else if (item.coinName === 'TRX/USDT') {
                let val = item.coinBalance * findPercent(store.rates.usdt, percent)
                arr.push(val)
            }


        })

        for (let i = 0; i <= arr.length - 1; i++) {
            total += arr[i]
        }
        store.setTotal(total.toFixed(3))
        return total.toFixed(3)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const filteredCoins = markets.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    const handleClose = () => {
        setShow(false)
    }


    return (
        <>
            <CustomModal show={show} handleClose={handleClose} size={'md'} title={'Exchange currencies'}>
                <InternalSwap balance={balance} />
            </CustomModal>

            <Row className='p-0'>
                <Col className='p-0 col-12 col-xl-9'>
                    <Row className='p-0'>
                        <Col>
                            <ButtonCard style={{paddingRight: 10, paddingLeft: 10}} theme={theme}>
                            {
                                store.ratesFull.length && balance.length ?
                                <>
                                    <Row className='align-items-center'>
                                        <Col>
                                            <h2>Market coins</h2>
                                            <p>Daily updated coins info</p>
                                        </Col>
                                        <Col style={{marginBottom: '1rem'}} className='d-flex justify-content-end'>
                                        {
                                            balance.length ?
                                                <b style={{textAlign: 'right', color: theme === 'light' ? '#2b3144cc' : '#fff'}}>Total balance: ${balance.length ? countTotalBalance().toLocaleString() : <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={100} height={20} />}</b>
                                                : <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={100} height={20} />
                                        }
                                        </Col>
                                    </Row>
                                    <Row style={{margin: 0, padding: 0}}>
                                        
                                                <SlickSlider>
                                                    {
                                                        store.ratesFull.map(item => {
                                                            return (
                                                            <WalletInfoBlock
                                                                key={item.id}
                                                                img={item.image}
                                                                rate={item.current_price}
                                                                balance={balance.filter(el => el.coinName === item.symbol.toUpperCase())[0]}
                                                                currency={item.symbol.toUpperCase()}
                                                                amount={item.price_change_percentage_24h}
                                                                status={item.price_change_percentage_24h}
                                                                theme={theme}
                                                            />
                                                            )
                                                        })
                                                    }
                                                </SlickSlider>
                                    </Row> 
                                </>
                                : <UserPageSkeleton />
                            }
                            </ButtonCard>
                        </Col>
                        <Row className='mb-4 d-block d-xl-none'>
                            <Button classname='btnBlue' onClick={() => setShow(true)}>
                                Exchange currencies
                            </Button>
                        </Row>
                    </Row>
                    <Row>
                        <Row>
                            <ButtonCard theme={theme}>
                                {
                                    store.ratesFull && balance.length ?
                                        <>
                                            <Row className='mb-5'>
                                                <Col>
                                                    <h2>Market overview</h2>
                                                </Col>
                                                <Col>
                                                    <Input classname='inputTransparent' placeholder='Search Coin Name' type="text" onChange={handleChange}/>
                                                </Col>
                                            </Row>
                                            <Row className='justify-content-center' style={{borderBottom: '1px solid rgb(204, 206, 217)', paddingBottom: 20, color: '#6c7080', fontSize: 14}}>
                                                <Col className='col-4 col-md-2 text-center'>
                                                    Name
                                                </Col>
                                                <Col className='col-4 col-md-2 text-center'>
                                                    Price
                                                </Col>
                                                <Col className='d-none d-xl-block col-4 col-md-2 text-center'>
                                                    Market Capacity
                                                </Col>
                                                <Col className='col-4 col-md-1 text-center'>
                                                    24h %
                                                </Col>
                                                <Col className='d-none d-sm-block col-4 col-md-2 text-center'>
                                                    Low
                                                </Col>
                                                <Col className='d-none d-sm-block col-4 col-md-1 text-center'>
                                                    High
                                                </Col>
                                                <Col className='d-none d-md-flex col-4 col-md-2 justify-content-center'>
                                                    Chart
                                                </Col>

                                            </Row>

                                            {filteredCoins.map(item => {
                                                return (
                                                    <MarketOverviewItem
                                                        theme={theme}
                                                        key={item.name}
                                                        name={item.name}
                                                        image={item.image}
                                                        symbol={item.symbol}
                                                        price={item.current_price}
                                                        volume={item.market_cap}
                                                        low={item.low_24h}
                                                        high={item.high_24h}
                                                        priceChange={item.price_change_percentage_24h}
                                                    />
                                                )
                                            })}
                                        </>

                                        : <UserPageSkeleton />
                                }
                            </ButtonCard>
                        </Row>
                    </Row>
                </Col>
                <Col className='d-none d-xl-block'>
                    <Row>
                        {balance.length ? <InternalSwap balance={balance} /> : <SkeletonBlocks/>}
                    </Row>
                    <Row>
                       <ButtonCard theme={theme}>
                            <Row style={{borderBottom: '1px solid rgb(204, 206, 217)', paddingBottom: 20, color: '#6c7080', fontSize: 14}}>
                                <Col>
                                    Name
                                </Col>
                                <Col>
                                    Price
                                </Col>
                                <Col>
                                    24h %
                                </Col>
                            </Row>
                            <Row style={{maxHeight: 600, overflowY: 'auto'}}>
                                {
                                    markets.length ? 
                                    markets.map(item => {
                                        console.log('item watchlist', item);
                                        return (
                                            <Watchlist
                                            theme={theme}
                                            key={item.name}
                                            name={item.name}
                                            image={item.image}
                                            symbol={item.symbol}
                                            price={item.current_price}
                                            priceChange={item.price_change_percentage_24h}
                                        />
                                        )
                                    }) : <SkeletonBlocks/>
                                }
                            </Row>
                       </ButtonCard>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default observer(Dashboard)