import React, {forwardRef, useState} from 'react'
import classNames from "classnames/bind";
import cls from './FileUpload.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';

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
            <label htmlFor={id}>
                <FontAwesomeIcon icon={faPaperclip} color={'rgba(0, 0, 0, 0.55)'} />
                {
                    state ?
                      <span style={
                          {
                              position: 'absolute',
                              top: '0px',
                              right: '-15px',
                              color: '#fff',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              backgroundColor: 'tomato',
                              display: 'flex',
                              padding: 5,
                              borderRadius: '50%',
                              height: 15,
                              width: 15,
                              alignItems: 'center',
                              justifyContent: 'center'
                          }}>{state}</span> : ''
                }


            </label>
            <input onChange={imgAmount} className={cls.my} ref={ref} id={id} type="file"/>
        </div>
    )
})

export default FileUpload;