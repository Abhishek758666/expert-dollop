import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  handleSave?: (img: Blob) => void;
};

const Modal = ({ isOpen = true, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#b5b3b39b] bg-opacity-50 z-[999999] w-full h-screen">
      <div className="bg-secondary-foreground p-4 w-max h-max rounded-md custom-border">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
