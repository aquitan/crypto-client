import {createContext, useContext, useState} from "react";
import {getData} from "../services/StaffServices";
import {store} from "../../index";

export const NotifContext = createContext()

export const useNotifContext = () => useContext(NotifContext)

export const NotifProvider = ({children}) => {
    const [notificationList, setNotificationList] = useState([])
    console.log('context working', notificationList)
    const updateNotif = async () => {
        const res = await getData(`/staff/notifications/get_all_notifications/${store.user.id}`)
        setNotificationList(res.data.listForUser)
    }

    return (
        <NotifContext.Provider value={{notificationList, updateNotif}}>
            {children}
        </NotifContext.Provider>
    )
}