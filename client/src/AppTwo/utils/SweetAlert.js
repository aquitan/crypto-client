import Swal from 'sweetalert2/dist/sweetalert2.js'

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