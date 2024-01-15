import { Bounce, toast } from "react-toastify";

export type ToastTypes = "success" | "warning" | "error" | "info";

export const showToast = (message: string, type?: ToastTypes): void => {
  if (!type) {
    toast(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return;
  }

  toast[type](`${message}`, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};
