import { toast } from 'react-toastify';

type ToastType = 'info' | 'success' | 'warning' | 'error';

export const showToast = (type: ToastType, message: string) => {
    const toastId = `${type}-${message}`;
    if (!toast.isActive(toastId)) {
        switch (type) {
            case 'info':
                toast(message, { toastId });
                break;
            case 'success':
                toast.success(message, { toastId });
                break;
            case 'warning':
                toast.warning(message, { toastId });
                break;
            case 'error':
                toast.error(message, { toastId });
                break;
        }
    }
};
