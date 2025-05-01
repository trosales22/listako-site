import React, { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  id: string;
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  size?: 'sm' | 'md' | 'lg';
  headerColor?: 'blue' | 'red' | 'green' | 'yellow' | 'gray';
  closeOnBackdrop?: boolean;
  onClose?: () => void;
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'w-11/12 max-w-sm',
  md: 'w-11/12 max-w-md',
  lg: 'w-11/12 max-w-3xl',
};

const headerColors: Record<string, string> = {
  blue: 'text-blue-600',
  red: 'text-red-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  gray: 'text-gray-600',
};

const Modal: React.FC<ModalProps> = ({
  id,
  title,
  children,
  isOpen,
  size = 'md',
  headerColor = 'gray',
  closeOnBackdrop = false,
  onClose,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Show/hide modal based on `isOpen`
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen && !modal.open) {
      modal.showModal();
    } else if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);

  // Close on backdrop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        closeOnBackdrop &&
        modalRef.current &&
        e.target instanceof Element &&
        e.target.classList.contains('modal')
      ) {
        modalRef.current.close();
        if (onClose) onClose();
      }
    };

    const modal = modalRef.current;
    modal?.addEventListener('click', handleClickOutside);
    return () => modal?.removeEventListener('click', handleClickOutside);
  }, [closeOnBackdrop, onClose]);

  return (
    <dialog id={id} ref={modalRef} className="modal">
      <div className={`modal-box ${sizeClasses[size]}`}>
        <button
          type="button"
          onClick={() => {
            modalRef.current?.close();
            onClose?.();
          }}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        {title && <h3 className={`font-bold text-lg ${headerColors[headerColor]}`}>{title}</h3>}
        <div className="overflow-y-auto max-h-[60vh] sm:max-h-[70vh] py-2">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
