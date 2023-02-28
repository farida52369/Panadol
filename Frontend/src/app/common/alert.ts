import Swal from "sweetalert2";

export class Alert {
    public static errorAlert(text: string) {
        Swal.fire({
            position: "center",
            icon: "error",
            text: text,
            showConfirmButton: false,
            timer: 2000
          });
    }

    public static warningAlert(text: string) {
        Swal.fire({
            position: "center",
            icon: "warning",
            text: text,
            showConfirmButton: false,
            timer: 2000
          });
    }

    public static successAlert(text: string) {
        Swal.fire({
            position: "center",
            icon: "success",
            text: text,
            showConfirmButton: false,
            timer: 2000
          });
    }

    public static infoAlert(text: string) {
        Swal.fire({
            position: "center",
            icon: "info",
            text: text,
            showConfirmButton: false,
            timer: 2000
          });
    }
}