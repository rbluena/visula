import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const Modal = ({ children, title, isOpen, setIsOpen, description }: Props) => (
  <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-slate-900 opacity-70 z-20" />
      <Dialog.Content className="z-20 fixed top-[50%] left-[50%] max-h-[85vh] overflow-y-auto w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        {title?.length ? (
          <Dialog.Title className="text-lg border-b border-b-slate-100 font-semibold">
            {title}
          </Dialog.Title>
        ) : null}

        {description?.length ? (
          <Dialog.Description className="DialogDescription">
            {description}
          </Dialog.Description>
        ) : null}

        {children}
        <Dialog.Close asChild>
          <button
            className="text-blue-500 hover:bg-blue-400 focus:shadow-blue-700 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
