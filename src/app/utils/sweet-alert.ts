import Swal, { SweetAlertResult } from "sweetalert2";

export class SweetAlert {
    static showSuccess(message: string) {
        Swal.fire(
            'Success',
            message,
            'success'
        );
    }

    static showError(message: string) {
        Swal.fire(
            'Error',
            message,
            'error'
        );
    }

    static showYesNo(message: string): Promise<SweetAlertResult<any>> {
        return Swal.fire({
            text: message,
            title: 'Success',
            icon: 'question',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true
        });
    }
}