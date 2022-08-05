import {useState} from "react";

export const useModal = () => {
    const [show, setShow] = useState(false)
    const showModal = () => {
        console.log('show', show)
        setShow(true)
    }
    const closeModal = () => {
        setShow(false)
    }

    return [show, showModal, closeModal]
}