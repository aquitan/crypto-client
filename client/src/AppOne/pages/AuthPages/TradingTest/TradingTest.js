import React, {useEffect, useState} from 'react'
import Bitcoin from './components/Bitcoin/Bitcoin';
import {getData} from '../../../services/StaffServices';
import {store} from '../../../../index';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {ValueContextProvider} from '../../../context/ValueContext';

const TradingTest = () => {
    const [coinPair, setCoinPair] = useState('BTC')
    const [balance, setBalance] = useState([])



    useEffect(() => {
        getBalance()
    }, [])

    useEffect(() => {
        renderTrade()
    }, [coinPair])

    const getBalance = async () => {
        const balance = await getData(`/get_user_balance/${store.user.id}`)
        setBalance(balance.data)
    }

    const renderTrade = () => {
        if (coinPair === 'BTC') return <Bitcoin balance={balance[0]}/>
    }


    return(
        <>
            <ValueContextProvider>
                {
                    balance.length ?
                      renderTrade()
                      : <Preloader/>
                }
            </ValueContextProvider>
            {/*<ButtonCard theme={theme}>*/}
            {/*    <Row>*/}
            {/*        <Col className='col-12 col-sm-2'>*/}
            {/*            <h2>Market Stats</h2>*/}
            {/*        </Col>*/}
            {/*        <Col className='col-12 col-sm-4'>*/}
            {/*            <select style={{*/}
            {/*                backgroundColor: 'transparent',*/}
            {/*                color: theme === 'light' ? '#121318' : '#fff',*/}
            {/*                maxWidth: 200,*/}
            {/*                width: '100%',*/}
            {/*                padding: 10,*/}
            {/*                border: '1px solid #717579',*/}
            {/*                borderRadius: 20,*/}
            {/*            }} onChange={onChangeCoinsPair} value={coinPair} >*/}
            {/*                {*/}
            {/*                    coins.map(coin => {*/}
            {/*                        return <option key={coin.value} value={coin.value}>{coin.text}</option>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </select>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</ButtonCard>*/}


        </>

    )
}

export default TradingTest