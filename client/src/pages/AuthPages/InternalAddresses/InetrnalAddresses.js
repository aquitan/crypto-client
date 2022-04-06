import React, {useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import InternalAddressesCard from "./components/InternalAddressesCard/InternalAddressesCard";
import {copyTextToClipboard} from "../../../utils/copyToClipboard";
import InternalAddressCardForm from "./components/InternalAddressCardForm/InternalAddressCardForm";
import Preloader from "../../../components/UI/Preloader/Preloader";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import TableItem from "../../../components/UI/Table/components/TableItem/TableItem";
import InternalAddressesTableItem from "./components/InternalAddressesTableItem/InternalAddressesTableItem";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import InternalAddressModal from "../../../components/UI/InternalAddressModal/InternalAddressModal";

const InternalAddresses = () => {

    const [state, setState] = useState([])
    const [modal, setModal] = useState({
        isOpen: false,
        amount: '',
        from: '',
        to: '',
        currency: ''
    })

    const wallets = [
        {wallet: '1EnwkHG4evkJbwPQmPfSkMtdfZgjv92anw', currency: 'BTC', sum: 123123123},
        {wallet: '0x16aA7eBd63864c01b766Bc25B6D3E96041F79F57', currency: 'ETH', sum: 123123123},
        {wallet: '0xbad95082ed21245DD61FaDba372fbB8E863E2eCd', currency: 'USDT', sum: 123123123},
        {wallet: '1DKRsrFt8L1rwvxBwMiukVrhGWDCovjjbc', currency: 'BCH', sum: 123123123}
    ]

    const onCopy = (text) => {
        copyTextToClipboard(text)
    }

    const onModalOpen = (obj) => {
        setModal({
            isOpen: true,
            amount: obj.amount,
            id: obj.id,
            currency: obj.currency,
            from: '1DKRsrFt8L1rwvxBwMiukVrhGWDCovjjbc',
            to: '1DKRsrFt8L1rwvxBwMiukVrhGWDCovjjbc'
        })
        console.log('modal', obj)
    }

    return (
        <Container>
            <InternalAddressModal
                amount={modal?.amount}
                currency={modal?.currency}
                active={modal?.isOpen}
                setActive={setModal}
                from={modal?.from}
                to={modal?.to}/>

            <h1>Internal Addresses</h1>
            <Row>
                <Card className='p-3 mb-4 bg-dark'>
                    <Row>
                        {
                            wallets.length ?
                                wallets.map(wallet => {
                                    return (
                                        <Col className='col-6 mb-3'>
                                            <InternalAddressesCard wallet={wallet.wallet} currency={wallet.currency} onCopy={onCopy} sum={wallet.sum} />
                                        </Col>
                                    )
                                })
                                : <Preloader />
                        }
                    </Row>
                </Card>

                <Card className='mb-4 p-3 bg-dark'>
                    <Row>
                        <Col>
                            <TableHeader classname='table_header-light' elems={['Date', 'Transaction Details', 'Amount', 'Status']} />
                            <TableBody>
                                <InternalAddressesTableItem
                                    onClick={onModalOpen}
                                    date={'Feb. 22, 2022, 8:05 a.m.'}
                                    currency={'BTC'}
                                    amount={'00.1'}
                                    id={1}
                                    status={'Success'} />
                                <InternalAddressesTableItem
                                    onClick={onModalOpen}
                                    date={'today'}
                                    currency={'ETH'}
                                    amount={'00.2'}
                                    id={2}
                                    status={'Success'} />
                            </TableBody>
                        </Col>
                    </Row>
                </Card>
            </Row>

        </Container>
    )
}

export default InternalAddresses