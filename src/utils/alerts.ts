import Swal from "sweetalert2";

export const showAlert = (
  title: string,
  text: string,
  icon: "success" | "error" | "warning" | "info" = "success"
) => {
  Swal.fire({
    title,
    text,
    icon,
  });
};

export const showConfirmationAlert = async (
  title: string,
  text: string,
  icon: "success" | "error" | "warning" | "info" = "success"
) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  });
};
