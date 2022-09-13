import React, {useState} from 'react'
import AppTwo from "../AppTwo/components/App/App";
import AppOne from "../AppOne/components/App/App";

const AppPicker = () => {
    const [state, setState] = useState(1)
    return (
        <>
            {
                state === 1 ? <AppOne /> :<AppTwo />
            }
        </>
    )
}

export default AppPicker