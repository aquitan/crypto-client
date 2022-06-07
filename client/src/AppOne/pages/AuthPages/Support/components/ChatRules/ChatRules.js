import React from 'react'
import PropTypes from 'prop-types'
import {Accordion, Row} from "react-bootstrap";

const ChatRules = ({rulesDisclamer}) => {
    return (
        <div>
            <h4>Information</h4>
            <Row>
                {rulesDisclamer}
            </Row>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Rules</Accordion.Header>
                    <Accordion.Body className='bg-dark'>
                        <Row>
                            Rule #1 - Specify your questions in English only.
                        </Row>
                        <Row>
                            Rule #2 - Unethical or malicious behavior is prohibited.
                        </Row>
                        <Row>
                            Rule #3 - Insults and slander are prohibited.
                        </Row>
                        <Row>
                            Rule #4 - Spam and flooding are prohibited.
                        </Row>
                        <Row>
                            Rule #5 - Profanity are prohibited.
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            
        </div>
    )
}

ChatRules.propTypes = {
    
}
ChatRules.defaultProps = {
    
}

export default ChatRules