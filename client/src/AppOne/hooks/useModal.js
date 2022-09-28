import React, {useState} from "react";

export const useModal = () => {
    const [show, setShow] = useState(false)
    const showModal = () => {
        setShow(true)
    }
    const closeModal = () => {
        setShow(false)
    }

    return [show, showModal, closeModal]
}