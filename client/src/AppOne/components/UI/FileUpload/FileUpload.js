import React, {forwardRef, useState} from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames/bind";
import cls from './FileUpload.module.scss'

const FileUpload = forwardRef(({id, onUploadImg}, ref) => {
    const [state, setState] = useState()
    const cx = classNames.bind(cls)
    const classes = cx('file-wrap')

    const imgAmount = (e) => {
        console.log('image', e.target.files.length)
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

FileUpload.propTypes = {

}
FileUpload.defaultProps = {

}

export default FileUpload;