import React from 'react'
import {Row} from "react-bootstrap";
import {ThemeContext, useThemeContext} from '../../../../../context/ThemeContext';

const ChatRules = ({rulesDisclamer}) => {
  const {theme} = useThemeContext(ThemeContext)
    return (
        <div>
            <Row>
                {rulesDisclamer}
            </Row>
            <Row className='mt-3' style={{color: theme === 'light' ? 'rgba(0, 0, 0, 0.55)' : '#fff'}}>
                Rule #1 - Specify your questions in English only.
            </Row>
            <Row style={{color: theme === 'light' ? 'rgba(0, 0, 0, 0.55)' : '#fff'}}>
                Rule #2 - Unethical or malicious behavior is prohibited.
            </Row>
            <Row style={{color: theme === 'light' ? 'rgba(0, 0, 0, 0.55)' : '#fff'}}>
                Rule #3 - Insults and slander are prohibited.
            </Row>
            <Row style={{color: theme === 'light' ? 'rgba(0, 0, 0, 0.55)' : '#fff'}}>
                Rule #4 - Spam and flooding are prohibited.
            </Row>
            <Row style={{color: theme === 'light' ? 'rgba(0, 0, 0, 0.55)' : '#fff'}}>
                Rule #5 - Profanity are prohibited.
            </Row>
            
        </div>
    )
}

export default ChatRules