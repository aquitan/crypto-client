import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useThemeContext } from "../../../../../context/ThemeContext";
import cls from './AddBancAccount.module.scss'

const AddBancAccount = ({addBank}) => {
    const {theme} = useThemeContext()
    const cx = classNames.bind(cls)
    const classes = cx('addPayment', theme)

    return (
        <div className={classes} onClick={addBank}>
            <FontAwesomeIcon icon={faDollarSign} />
            <span style={{marginLeft: 5}}>Add bank account</span>
        </div>
    )
}
export default AddBancAccount;