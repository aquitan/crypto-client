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

const InternalAddresses = () => {
    const {theme} = useThemeContext(ThemeContext)
    const [wallets, setWallets] = useState([])
    const [history, setHistory] = useState([])
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
            console.log('prevstate', prevState)
            return prevState + 5
        }))
        getInternalHistory(counter+5)
    }

    const onCopy = (text) => {
        copyTextToClipboard(text)
    }

    useEffect(() => {
        getWalletsData()
        getInternalHistory()
    }, [])

    const getWalletsData = async () => {
        const res = await getData(`/get_internal_data/${store.user.id}`)
        setWallets(res.data)
        console.log('res', res.data)
    }

    const onModalOpen = (obj) => {
        setModal({
            isOpen: true,
            amount: obj.amount.toFixed(5),
            id: obj.id,
            currency: obj.currency,
            from: '1DKRsrFt8L1rwvxBwMiukVrhGWDCovjjbc',
            to: '1DKRsrFt8L1rwvxBwMiukVrhGWDCovjjbc'
        })
        console.log('modal', obj)
    }

    const getInternalHistory = async (count) => {
        const res = await getData(`/internal_transfer/get_internal_transfer_history/${store.user.id}/${0}/20`)
        setHistory(res.data.internalTransferHistory)
    }


    return (
        <>
            <InternalAddressModal
                amount={modal?.amount}
                currency={modal?.currency}
                active={modal?.isOpen}
                setActive={setModal}
                from={modal?.from}
                to={modal?.to}/>

            <Row>

                <Col className='col-12 col-xl-8'>
                    <ButtonCard theme={theme}>
                        {
                            wallets.length ?
                                wallets.map(wallet => {
                                    return (
                                        <Row>
                                            <Col className='col-12 mb-3'>
                                                <InternalAddressesCard theme={theme} wallet={wallet.walletAddress} currency={wallet.coinName} onCopy={onCopy} sum={wallet.balance} />
                                            </Col>
                                        </Row>
                                    )
                                })
                                : <Preloader />
                        }
                    </ButtonCard>
                </Col>
                <Col>
                    <ButtonCard theme={theme}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className={'d-none d-md-block text-center'}>Date</Col>
                                    <Col className={'text-center'}>Transaction details</Col>
                                    <Col className={'text-center'}>Amount</Col>
                                </Row>
                                <TableBody>
                                    {
                                        history ?
                                            history.map(item => {
                                                return (
                                                    <InternalAddressesTableItem
                                                        onClick={onModalOpen}
                                                        date={getCurrentDate(item.date)}
                                                        currency={item.coinName}
                                                        amount={item.usdAmount}
                                                        cryptoAmount={item.cryptoAmount}
                                                        id={item._id}
                                                        status={item.status} />
                                                )
                                            })
                                            : <h4>No data!</h4>
                                    }
                                </TableBody>
                            </Col>
                        </Row>

                    </ButtonCard>
                    <Row>
                        {
                            history ?
                                <span onClick={onNext}>Next...</span>
                                : null
                        }
                    </Row>
                </Col>

            </Row>

        </>
    )
}

export default InternalAddresses