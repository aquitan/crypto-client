import React, {forwardRef} from 'react'

const FileUpload = forwardRef((props, ref) => {
    return (
        <div>
            <input ref={ref} type="file" {...props}/>
        </div>
    )
})

export default FileUpload