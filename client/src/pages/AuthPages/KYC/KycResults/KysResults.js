import React from 'react'

const KycResults = (props) => {
    const checkKycResult = () => {
        if (props.status === 'complete') {
            return <h1>You've been Approved!</h1>
        } else if (props.status === 'rejected') {
            return <h1>Your verification was Rejected!</h1>
        } else {
            return <h1>Pending verification!</h1>
        }
    }
    return (
        <div>
            {checkKycResult()}
        </div>
    )
}

export default KycResults