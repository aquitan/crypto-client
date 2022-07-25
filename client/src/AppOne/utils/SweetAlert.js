import Swal from 'sweetalert2/dist/sweetalert2.js'

import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const SweetAlert = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    })
}

export const SwalSimple = (text) => {
    Swal.fire(text)
}

export const SwalConfirm = (title, confirmButtonText, denyButtonText, requestType) => {
    Swal.fire({
        title,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText,
        denyButtonText
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}