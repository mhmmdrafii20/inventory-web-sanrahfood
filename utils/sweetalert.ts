import swal, { SweetAlertIcon } from 'sweetalert2';

export default function  confirmDialog (
    title:string,
    text:string,
    icon:SweetAlertIcon,
    onConfirm: () => void,
    confirmText:string,
    cancelText:string
) {
    swal.fire({
        title:title,
        text:text,
        icon:icon,
        showCancelButton:true,
        confirmButtonText:confirmText,
        cancelButtonText:cancelText,
    }).then((result) => {
        if(result.isConfirmed && typeof onConfirm === 'function') {
            onConfirm()
        }
    })
}