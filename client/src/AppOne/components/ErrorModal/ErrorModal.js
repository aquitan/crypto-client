import cls from "./ErrorModal.module.scss";
import {Row} from "react-bootstrap";
import Button from "../UI/Button/Button";

const ErrorModal = ({title, errorText, btnType, errorType, setActive, active}) => {
    let classes = [cls.modal]
    if (active) {
        classes.push(cls.modal_active)
    }

    return (
        <div className={classes.join(' ')} onClick={() => setActive(false)}>
            <div className={cls.modal_content} onClick={(e) => e.stopPropagation()}>
                <Row>
                    <h2>{title}</h2>
                </Row>
                <Row className='mt-3 mb-3'>
                    <h4>{errorType}</h4>
                </Row>
                <Row className='mt-3 mb-3'>
                    {errorText}
                </Row>
                <Row>
                    <Button >{btnType}</Button>
                </Row>
            </div>
        </div>
    )
}

export default ErrorModal