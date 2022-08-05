import cls from './Button.module.scss'
import classNames from "classnames/bind";

const Button = ({children, onClick, classname, disabled, active, ...attrs}) => {
    let cx = classNames.bind(cls)
    let classes = cx('button', classname, {active})


    const onClickAction = (e) => {
        if (disabled) {
            e.preventDefault()
        } else if (!onClick) {
            return () => {}
        } else {
            return onClick(e)
        }
    }

    const Tag = attrs.href ? 'a' : 'button'

    return (
        <Tag {...attrs} className={classes} onClick={onClickAction} disabled={disabled}>
            {children}
        </Tag>
    )
}

export default Button