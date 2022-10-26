import { toast } from "react-toastify";

export function defaultToast(message: string) {
  toast(message, {
    autoClose: 2000,
    hideProgressBar: true,
  });
}

export function successToast(message: string) {
  toast.success(message, {
    autoClose: 2000,
    hideProgressBar: true,
  });
}

export function errorToast(message: string) {
  toast.error(message, {
    autoClose: 2000,
    hideProgressBar: true,
  });
}

export function infoToast(message: string) {
  toast.info(message, {
    autoClose: 2000,
    hideProgressBar: true,
  });
}

export function warningToast(message: string) {
  toast.warning(message, {
    autoClose: 2000,
    hideProgressBar: true,
  });
}
