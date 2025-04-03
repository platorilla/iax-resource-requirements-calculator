import React from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  overflow?: string;
  children: React.ReactNode;
}

const Modal = ({ isVisible, onClose, overflow, children }: ModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`${
          overflow ?? "overflow-hidden"
        } relative h-2/3 w-3/4 rounded-lg bg-slate-100 p-4 shadow-lg sm:w-3/5 md:w-1/2 lg:w-5/12 xl:w-1/3`}
      >
        <button
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
