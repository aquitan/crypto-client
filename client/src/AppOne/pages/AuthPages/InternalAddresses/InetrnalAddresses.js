import React, {useEffect, useState} from 'react'
import {Col, Row} from "react-bootstrap";
import InternalAddressesCard from "./components/InternalAddressesCard/InternalAddressesCard";
import {copyTextToClipboard} from "../../../utils/copyToClipboard";
import Preloader from "../../../components/UI/Preloader/Preloader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import InternalAddressesTableItem from "./components/InternalAddressesTableItem/InternalAddressesTableItem";
import InternalAddressModal from "../../../components/UI/InternalAddressModal/InternalAddressModal";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import CustomModal from '../../../components/CustomModal/CustomModal';
import AdminButton from '../../../components/UI/AdminButton/AdminButton';
import UserPageSkeleton from '../../../components/UserPageSkeleton/UserPageSkeleton';
import { Skeleton } from '@mui/material';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

const InternalAddresses = () => {
    const {theme} = useThemeContext(ThemeContext)
    const [wallets, setWallets] = useState([])
    const [history, setHistory] = useState([])
    const [limit, setLimit] = useState(0)
    const [modal, setModal] = useState({
        isOpen: false,
        amount: '',
        from: '',
        to: '',
        currency: ''
    })
    const [counter, setCounter] = useState(0)


    const onNext = () => {
        setCounter((prevState => {
            return prevState + 5
        }))
        getInternalHistory(counter+5)
    }

    const onCopy = (text) => {
        copyTextToClipboard(text)
    }

    useEffect(() => {
        getWalletsData()
    }, [])

    const getWalletsData = async () => {
        const res = await getData(`${getSwitchQuery('/get_internal_data/')}${store.user.id}`)
        setWallets(res.data)
    }

    const onModalOpen = (obj) => {
        setModal({
            isOpen: true,
            amount: obj.amount.toFixed(5),
            id: obj.id,
            currency: obj.currency,
            from: obj.fromAddress,
            to: obj.toAddress
        })
    }

    const getInternalHistory = async (count) => {
        const res = await getData(`${getSwitchQuery('/internal_transfer/get_internal_transfer_history/')}${store.user.id}/${limit}/20`)
        setHistory(res.data.internalTransferHistory)
    }

    const onUpdateHistory = () => {
        getInternalHistory()
    }

    useEffect(() => {
        getInternalHistory()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    const skeletonLength = [1, 2, 3, 4, 5, 6, 7]


    return (
        <>
            {/*<InternalAddressModal*/}
            {/*    amount={modal?.amount}*/}
            {/*    currency={modal?.currency}*/}
            {/*    active={modal?.isOpen}*/}
            {/*    setActive={setModal}*/}
            {/*    from={modal?.from}*/}
            {/*    to={modal?.to}/>*/}

            <Row>

                <CustomModal
                  title='Transfer info'
                  show={modal.isOpen}
                  size='md'
                  handleClose={() => setModal({...modal, isOpen: false})}
                  btnClose={'Close'}>
                    <Row className='mb-2'>
                        <Col>
                            <b>From:</b>
                        </Col>
                        <Col style={{fontSize: 14, color: 'grey'}}>
                            <span>{modal?.from}</span>
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col>
                            <b>To:</b>
                        </Col>
                        <Col style={{fontSize: 14, color: 'grey'}}>
                            <span>{modal?.to}</span>
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col><b>Amount:</b></Col>
                        <Col style={{fontSize: 14, color: 'grey'}}>
                            {modal?.amount} USD
                        </Col>
                    </Row>
                </CustomModal>

                <Col className='col-12 col-xl-8'>
                    <ButtonCard theme={theme}>
                        {
                            wallets.length ?
                                wallets.map((wallet, index) => {
                                    return (
                                      <InternalAddressesCard
                                        key={index}
                                        theme={theme}
                                        wallet={wallet.walletAddress}
                                        currency={wallet.coinName}
                                        onCopy={onCopy}
                                        onUpdateHistory={onUpdateHistory}
                                        sum={wallet.balance} />
                                    )
                                })
                                : skeletonLength.map(item => {
                                    return <div style={{border: '1px solid #eee', padding: '10px', borderRadius: '5px', marginBottom: '20px'}}>
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'200px'} height={40} />
                                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'200px'} height={40} />
                                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'200px'} height={40} />
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'200px'} height={50} />
                                        </div>
                                    </div>
                                })
                        }
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-xl-4'>
                    <ButtonCard theme={theme}>
                        {
                            wallets.length ?
                            <Row>
                                <Col className='p-0'>
                                    <Row>
                                        <Col style={{fontSize: '12px'}} className={'d-none d-md-block text-center'}>Date</Col>
                                        <Col style={{fontSize: '12px'}} className={'text-center'}>Transaction details</Col>
                                        <Col style={{fontSize: '12px'}} className={'text-center'}>Amount</Col>
                                    </Row>
                                    <TableBody>
                                        {
                                            history ?
                                                history.map(item => {
                                                    return (
                                                        <InternalAddressesTableItem
                                                            key={item._id}
                                                            onClick={onModalOpen}
                                                            toAddress={item.addressTo}
                                                            fromAddress={item.addressFrom}
                                                            date={getCurrentDate(item.date)}
                                                            currency={item.coinName}
                                                            amount={item.usdAmount}
                                                            cryptoAmount={item.cryptoAmount}
                                                            id={item._id}
                                                            status={item.status} />
                                                    )
                                                })
                                                : <h4 className='text-center my-4' style={{color: '#cecece'}}>No transfers!</h4>
                                        }
                                    </TableBody>
                                </Col>
                            </Row> : <UserPageSkeleton />
                        }

                    </ButtonCard>
                </Col>

            </Row>

        </>
    )
}

export default InternalAddresses