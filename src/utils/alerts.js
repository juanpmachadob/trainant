import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const classes = {
  popup:
    'rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-customLight/95 text-customDarkBlue shadow-customClassic',
  title: 'text-2xl',
  actions: 'gap-4',
  button:
    'inline-flex cursor-pointer select-none rounded-full px-8 py-3 font-bold text-customLight shadow-customClassic outline-0 transition duration-300 ease-in-out enabled:hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50'
}

export const showAlert = ({ title, text, type, callback, ...props }) =>
  MySwal.fire({
    title,
    text,
    icon: type,
    allowOutsideClick: false,
    confirmButtonText: 'Accept',
    showCancelButton: type === 'question',
    buttonsStyling: false,
    customClass: {
      popup: classes.popup,
      title: classes.title,
      actions: classes.actions,
      cancelButton: `${classes.button} bg-customDarkBlue text-customLight`,
      confirmButton: `${classes.button} bg-gradient-to-r from-customPurple to-customRed text-customLight`
    },
    ...props
  }).then(({ isConfirmed }) => {
    if (isConfirmed && callback) callback()
  })
