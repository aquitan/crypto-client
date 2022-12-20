import React, {useEffect, useState} from 'react'
import { Accordion, Col, Container, Row} from "react-bootstrap";
import classNames from "classnames/bind";
import cls from './SecureDealDetail.module.scss'
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import ChatWindow from "../../../Support/components/ChatWindow/ChatWindow";
import ChatRules from "../../../Support/components/ChatRules/ChatRules";
import {secureDealRulesText} from "../../../../../utils/userConstants";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import {getData, patchData, putData} from "../../../../../services/StaffServices";
import {useForm} from "react-hook-form";
import Modal from "../../../../../components/UI/Modal/Modal";
import ButtonCard from "../../../../../components/ButtonCard/ButtonCard";
import {useParams} from "react-router-dom";
import {store} from "../../../../../../index";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import ChatMessege from "../../../../../components/UI/ChatMessege/ChatMessege";
import {ThemeContext, useThemeContext} from '../../../../../context/ThemeContext';
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import { getSwitchQuery } from '../../../../../utils/getSwitchQuery';

const SecureDealDetail = () => {
    const {theme} = useThemeContext(ThemeContext)
    const params = useParams()
    const cx = classNames.bind(cls)
    const {register, handleSubmit} = useForm()
    const [modal, setModal] = useState(false)
    const [limit, setLimit] = useState(0)
    const [dealData, setDealData] = useState()
    const [preloader, setPreloader] = useState(false)
    const [showError, setShowError] = useState(false)
    const [state, setState] = useState({
        seller: false,
        sellerbuyer: false,
        completed: false
    })
    const [acception, setAcception] = useState(true)
    const [result, setResult] = useState('')
    useEffect(() => {
        getSecureDealData()

    }, [])

    const [msg, setMsg] = useState([])
    const [image, setImage] = useState()

    const getSecureDealData = async () => {
        const res = await getData(`${getSwitchQuery('/personal_area/secure_deal/secure_deal_detail/')}${params.id}/${store.user.email}`)
        setDealData(res.data.dealDetail)
        getSupportMessages(res.data.dealDetail._id)
    }
    const sendRewardData = async (data) => {
        data.dealId = dealData._id
        const res = await patchData(getSwitchQuery('/personal_area/secure_deal/secure_deal_detail/accept_deal/'), data)
        checkResponse(201)
        setModal(true)
        if (res.status === 201) {
            setState({
                ...state, completed: true
            })
        }
    }

    const checkResponse = (response) => {
        switch (response) {
            case 201:
                return setResult('Deal successfully completed')
            case !201:
                return setResult('Wrong password!')
            default:
                return console.log('something went wrong')
        }
    }

    const onAccept = () => {
        setAcception(false)
        setState({
            ...state, seller: true
        })
    }

    const onClick = async (text) => {
        const obj = {
            domainName: window.location.host,
            curDate: dateToTimestamp(new Date()),
            messageBody: text,
            imageLink: image ? image : null,
            chatId: typeof msg !== 'string' ? msg[0].chatId : null,
            isUser: true,
            dealId: dealData._id,
            userEmail: store.user.email
        }
        setPreloader(true)
        try {
            const res = await putData(getSwitchQuery('/secure_deal/deal_detail/send_message_to_secure_deal_chat'), obj)
            getSupportMessages(dealData._id)
        } catch(e) {
            setShowError(true)
        } finally {
            setPreloader(false)
        }
    }

    const getSupportMessages = async (id) => {
        const res = await getData(`${getSwitchQuery('/secure_deal/deal_detail/get_chat_for_user')}/${limit}/50/${id}`)
        setMsg(res.data)

        // createMessagesOnLoad(res.data)
    }

    const onUploadImg =(img) => {
        const formData = new FormData();
        formData.append("image", img);
        fetch(
            "https://api.imgbb.com/1/upload?key=68c3edcc904ee3e28d2e63ec81876e40",
            { method: "POST", body: formData }
        )
            .then((response) => response.json())
            .then((data) => setImage(data.data.display_url));
    }

    useEffect(() => {
        getSupportMessages()
        setInterval(() => {
            getSupportMessages()
        }, 30000)
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    return (
        <>
            <CustomModal size='md' show={showError} handleClose={() => setShowError(false)} btnClose='Ok' title='Message error'>
                Something went wrong! Please, try again later!
            </CustomModal>

            <CustomModal
              show={result}
              btnClose={'Close'}
              handleClose={() => setResult('')}>
                {result}
            </CustomModal>

            <Row>
                <Col>
                    <h1>Deal #15</h1>
                    <p>Full info about current secure deal</p>
                </Col>
            </Row>
            {/*{*/}
            {/*    acception ? <SecureDealDetailConfirm onClick={onAccept} onDecline={() => setAcception(false)}/> : null*/}
            {/*}*/}
            {
                dealData ?
                    <>
                        <Row>
                            <Col className='col-12 col-xl-6'>
                                <ButtonCard style={{minHeight: 400}} theme={theme}>
                                    <h5 className={cls.card_header}>Base info</h5>
                                    <Row className='mb-3 mt-3'>
                                        <Col>Seller</Col>
                                        <Col>{dealData.seller}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col>Buyer</Col>
                                        <Col>{dealData.buyer}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col>Price</Col>
                                        <Col>{dealData.amountInCrypto} {dealData.coinName}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col>Deadline</Col>
                                        <Col>{getCurrentDate(dealData.dealDedline)}</Col>
                                    </Row>
                                    {
                                        dealData.acceptCode ?
                                          <Row className='mb-3'>
                                              <Col>Password (shown only for buyer)</Col>
                                              <Col>{dealData.acceptCode}</Col>
                                          </Row>
                                          : null
                                    }
                                    {
                                        !dealData.acceptCode ?
                                          <Row className='mb-3 py-1'>
                                              <Col>Enter password</Col>
                                              <Col>
                                                  <Row className='align-items-center'>
                                                      <Col className='col-12 col-md-4 p-0 py-1'><Input {...register('acceptCode')} classname='inputTransparent' placeholder='password' /></Col>
                                                      <Col className='col-12 col-md-6 py-1'><Button style={{height: 50}} onClick={handleSubmit(sendRewardData)} classname='btnBlue'>Get reward</Button></Col>
                                                  </Row>
                                              </Col>
                                          </Row>
                                          : null
                                    }
                                    <Row>
                                        <h5 className={cls.card_header}>Detailed info</h5>
                                        <TextArea rows={8} classname='textareaTransparent' value={dealData.dealCondition}/>
                                    </Row>
                                </ButtonCard>
                            </Col>

                            <Col className='col-12 col-xl-6'>
                                <ButtonCard style={{minHeight: 400}} theme={theme} className='mt-4 p-3'>
                                    <Row className='mt-3'>
                                        <Col className='col-12 mb-3'>
                                            <ChatWindow onUploadImg={onUploadImg} onClick={onClick} preloader={preloader}>
                                                {
                                                    typeof msg !== 'string' ?
                                                      msg.slice(0).reverse().map(item => {
                                                          return(
                                                            <ChatMessege
                                                              key={item._id}
                                                              date={item.curDate}
                                                              type={item.isUser}
                                                              image={item.imageLink}
                                                              userId={item.userId}
                                                              text={item.messageBody} />
                                                          )
                                                      }) : null
                                                }
                                            </ChatWindow>
                                            {
                                                msg.length ? 
                                                <Row className={'mb-3 mt-3'}>
                                                    {
                                                        msg.length >= 50 ?
                                                        <AdminButton onClick={onMore} classname={['xs', 'green']}>Load older messages</AdminButton>
                                                        : null
                                                    }
                                                    {
                                                        limit > 0 ?
                                                        <AdminButton onClick={onLess} classname={['xs', 'green']}>Back</AdminButton>
                                                        : null
                                                    }
                                                </Row> : null
                                            }
                                            <Row>
                                                <Accordion className='support-accordion'>
                                                    <Accordion.Item style={{backgroundColor: '#fff'}} eventKey="0">
                                                        <Accordion.Header>Rules</Accordion.Header>
                                                        <Accordion.Body>
                                                            <ChatRules rulesDisclamer={secureDealRulesText} />
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ButtonCard>
                            </Col>
                        </Row>
                    </>
                    : <Preloader />
            }
        </>
    )
}

export default SecureDealDetail