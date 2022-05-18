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