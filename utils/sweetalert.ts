import swal, { SweetAlertIcon } from 'sweetalert2';

export default function confirmDialog(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    onConfirm: () => void,
    confirmText: string,
    cancelText: string,
    confirmColor?: string,
    cancelColor?: string
) {
    swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        confirmButtonColor: confirmColor ? confirmColor : "#FF0000",
        cancelButtonColor: cancelColor ? cancelColor : "#14919b"
    }).then((result) => {
        if (result.isConfirmed && typeof onConfirm === 'function') {
            onConfirm()
        }
    })
}
export function showRestoreDialog(message: string, onConfirm: () => void) {
    confirmDialog(
        "Yakin ingin memulihkan data ini?",
        message,
        "warning",
        onConfirm,
        "Restore",
        "Batal",
        "#166534",
        "#dc2626"
    )
}
export function showDeleteDialog(onConfirm: () => void, description?: string, title?: string) {
    confirmDialog(
        title || "Yakin ingin menghapus ?",
        description || "Data akan dipindahkan ke halaman sampah dan dapat dipulihkan kembali.",
        "warning",
        onConfirm,
        "Hapus",
        "Batal"
    )
}
export function showApproveDialog(onConfirm: () => void) {
    confirmDialog(
        "Yakin ingin menyetujui penyesuaian stok ini?",
        "Stok akan diperbarui sesuai dengan data penyesuaian yang diajukan.",
        "warning",
        onConfirm,
        "Setujui",
        "Batal",
        "#166534",
        "#dc2626"
    )
}
export function showRejectDialog(onConfirm: () => void) {
    confirmDialog(
        "Yakin ingin menolak penyesuaian stok ini?",
        "Penyesuaian stok akan ditolak dan tidak akan diproses.",
        "warning",
        onConfirm,
        "Tolak",
        "Batal",
        "#dc2626",
        "#14919b"
    )
}
