import cls from './AdminSidebar.module.scss'
import {Row} from "react-bootstrap";
import {store} from "../../../index";
import {useNavigate} from "react-router-dom";
import AdminButton from "../UI/AdminButton/AdminButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = ({children, active, setInactive}) => {
    const navigate = useNavigate()
    const onLogout = async () => {
       await store.logout()
        store.setIsStaff(false)
        navigate('/')
    }
    return (
        <>
            <div onClick={setInactive} className={`${active ? cls.active_layout : ''} ${cls.sidebar_layout}`}/>
            <div className={`${cls.admin_sidebar} bg-dark ${active ? cls.active_sidebar : ''}`}>
                <div className={cls.sidebar_close}>
                    <FontAwesomeIcon onClick={setInactive} icon={faTimesCircle} />
                </div>
                <Row>
                    <AdminButton classname='green' onClick={onLogout}>Выйти</AdminButton>
                </Row>
                {children}
            </div>
        </>
    )
}

export default AdminSidebar