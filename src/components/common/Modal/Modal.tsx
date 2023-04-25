import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";

// type Props = {
//   children: React.ReactNode;
//   description?: string;
// };

// const Modal = DialogPrimitive.Root;

// const ModalContent = React.forwardRef<Props, any>(
//   ({ children, ...props }, forwardRef) => {
//     return (
//       <DialogPrimitive.Portal>
//         <DialogPrimitive.Overlay />
//         <DialogPrimitive.Content {...props} ref={forwardRef}>
//           {children}
//           <DialogPrimitive.Close aria-label="Close">
//             <XMarkIcon className="w-4 h-4" />
//           </DialogPrimitive.Close>
//         </DialogPrimitive.Content>
//       </DialogPrimitive.Portal>
//     );
//   }
// );

// ModalContent.displayName = "ModalContent";

// Modal.Trigger = DialogPrimitive.Trigger;
// Modal.Content = ModalContent;

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: Function;
};

const Modal = ({ children, title, isOpen, setIsOpen, description }: Props) => (
  <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
    {/* <Dialog.Trigger asChild>
    </Dialog.Trigger> */}
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-slate-900 opacity-70 z-20" />
      <Dialog.Content className="z-20 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
        {/* <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
        {description ? (
          <Dialog.Description className="DialogDescription">
            {description}
          </Dialog.Description>
        ) : null} */}

        {children}
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <XMarkIcon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
