import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import classNames from "classnames/bind";
import cls from './SecureDealDetail.module.scss'
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import ChatWindow from "../../../Support/components/ChatWindow/ChatWindow";
import ChatRules from "../../../Support/components/ChatRules/ChatRules";
import {secureDealRulesText} from "../../../../../utils/userConstants";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import {getData, postData} from "../../../../../services/StaffServices";
import SecureDealDetailConfirm from "../SecureDealDetailConfirm/SecureDealDetailConfirm";
import {useForm} from "react-hook-form";
import Modal from "../../../../../components/UI/Modal/Modal";
import ButtonCard from "../../../../../components/ButtonCard/ButtonCard";

const SecureDealDetail = () => {
    const cx = classNames.bind(cls)
    let classes = cx()
    const {register, handleSubmit} = useForm()
    const [modal, setModal] = useState(false)
    const [state, setState] = useState({
        seller: false,
        buyer: false,
        completed: false
    })
    const [acception, setAcception] = useState(true)
    const [result, setResult] = useState('')
    useEffect(() => {
        getSecureDealData()
    })

    const getSecureDealData = async () => {
        const res = await getData('/123')
    }
    const sendRewardData = async (data) => {
        const res = await postData('/', data)
        checkResponse(201)
        setModal(true)
        if (res.status === 201) {
            setState({
                ...state, completed: true
            })
        }
    }

    const checkResponse = (response) => {
        console.log('resp---', response)
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
    return (
        <Container>
            <Modal active={modal} setActive={setModal}>
                <h2>{result}</h2>
            </Modal>

            <h1>Deal #15</h1>
            <p>Full info about current secure deal</p>
            {
                acception ? <SecureDealDetailConfirm onClick={onAccept} onDecline={() => setAcception(false)}/> : null
            }
            <ButtonCard>
                <h5 className={cls.card_header}>Base info</h5>
                <Row className='mb-3 mt-3'>
                    <Col>Seller</Col>
                    <Col>aquitanfw</Col>
                </Row>
                <Row className='mb-3'>
                    <Col>Buyer</Col>
                    <Col>asdfjasbf</Col>
                </Row>
                <Row className='mb-3'>
                    <Col>Price</Col>
                    <Col>0.001 BTC</Col>
                </Row>
                <Row className='mb-3'>
                    <Col>Deadline</Col>
                    <Col>Jan. 21, 2022, midnight</Col>
                </Row>
                {
                    state.buyer && !state.completed ?
                        <Row className='mb-3'>
                            <Col>Password (shown only for buyer)</Col>
                            <Col>lkjskldflksdlkflksjdf</Col>
                        </Row>
                        : null
                }
                {
                    state.seller && !state.completed ?
                        <Row className='mb-3'>
                            <Col>Enter password</Col>
                            <Col>
                                <Row className='align-items-center'>
                                    <Col className='col-4'><Input {...register('reward')} classname='input_small' placeholder='password' /></Col>
                                    <Col><Button onClick={handleSubmit(sendRewardData)} classname='small'>Get reward</Button></Col>
                                </Row>
                            </Col>
                        </Row>
                        : null
                }
            </ButtonCard>

            <ButtonCard className='mt-4 p-3'>
                <h5 className={cls.card_header}>Detailed info</h5>
                <Row className='mt-3'>
                    <TextArea classnames='textarea_bordered' value={'kjsdfkjskdjbfkjsdkjfbsdf'}/>
                </Row>
            </ButtonCard>

            <ButtonCard className='mt-4 p-3 mb-4'>
                <h5 className={cls.card_header}>Chat</h5>
                <Row className='mt-3'>
                    <Col className='col-12 col-lg-8 mb-3'>
                        <ChatWindow />
                    </Col>
                    <Col className='col-12 col-lg-4 mb-3'>
                        <ChatRules rulesDisclamer={secureDealRulesText} />
                    </Col>
                </Row>
            </ButtonCard>
        </Container>
    )
}

SecureDealDetail.propTypes = {
    
}
SecureDealDetail.defaultProps = {
    
}

export default SecureDealDetail