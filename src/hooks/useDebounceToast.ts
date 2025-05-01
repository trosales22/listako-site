import { debounce } from 'lodash';
import toast from 'react-hot-toast';

export function useDebouncedToast() {
  const debouncedToastInfo = debounce((message: string) => {
    toast.success(message);
  }, 250);

  const debouncedToastError = debounce((message: string) => {
    toast.error(message);
  }, 250);

  return {
    debouncedToastInfo,
    debouncedToastError,
  };
}
