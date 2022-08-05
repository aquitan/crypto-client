import {forwardRef, useState} from 'react'
import classNames from "classnames/bind";
import cls from './FileUpload.module.scss'

const FileUpload = forwardRef(({id, onUploadImg, classnames}, ref) => {
    const [state, setState] = useState()
    const cx = classNames.bind(cls)
    const classes = cx('file-wrap', classnames)

    const imgAmount = (e) => {
        setState(e.target.files.length)
        onUploadImg(e.target.files[0])
    }
    return (
        <div className={classes}>
            <label htmlFor={id}>{!state ? 'Choose File' : 'Files: ' + state}</label>
            <input onChange={imgAmount} className={cls.my} ref={ref} id={id} type="file"/>
        </div>
    )
})

export default FileUpload;