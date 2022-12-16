import React from 'react'
import cls from './FileKyc.module.scss'

const FileKyc = ({onChange, value, id, label, text, name}) => {
    return (
      <label className={cls.inputFile}>
          <input required accept=".png, .jpg, .jpeg .pdf" id={id} value={value} name={name} onChange={onChange} type="file"/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <span className={cls.inputFileBtn}>
              <div>Upload Your {text} Photo</div> 
              <div style={{color: '#5367ff', wordBreak: 'break-all'}}>{label ? label.name : ''}</div>
            </span>
          </div>
      </label>
    )
}
export default FileKyc;