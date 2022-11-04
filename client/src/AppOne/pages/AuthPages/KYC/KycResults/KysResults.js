import { faCheckCircle, faExclamationCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const KycResults = (props) => {
    const checkKycResult = () => {
        if (props.status === 'approved') {
            return <>
                <h1>You've been Approved! <FontAwesomeIcon color='green' icon={faCheckCircle} /></h1>
            </>
        } else if (props.status === 'rejected') {
            return <>
                <h1>Your verification was Rejected! <FontAwesomeIcon color='tomato' icon={faStopCircle} /></h1>
                
            </>
        } else {
            return (<>
                <h1>Pending verification! <FontAwesomeIcon color='orange' icon={faExclamationCircle} /></h1>
                
            </>

            )
        }
    }
    return (
        <div>
            {checkKycResult()}
        </div>
    )
}

export default KycResults