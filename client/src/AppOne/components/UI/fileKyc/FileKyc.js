import React from 'react'
import cls from './FileKyc.module.scss'

const FileKyc = ({onChange, value, id, label, text, name}) => {
    return (
      <label className={cls.inputFile}>
          <span className={cls.inputFileText} type="text">{label ? label.name : ''}</span>
          <input required accept=".png, .jpg, .jpeg .pdf" id={id} value={value} name={name} onChange={onChange} type="file"/>
          <span className={cls.inputFileBtn}>{text} photo</span>
      </label>
    )
}
export default FileKyc;