//Hooks
import { useEffect, useRef, useState } from "react";
//CSS
import classes from "./Modal.module.css";

const Modal = (props: {
  onClose: (e: { preventDefault: () => void; }) => void;
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    e.key === "Escape" && handleCloseModal(e);
  };

  const handleCloseModal = (e: { preventDefault: () => void }) => {
    props.onClose && props.onClose(e);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    modalElement &&
      (isModalOpen ? modalElement.showModal() : modalElement.close());
  }, [isModalOpen]);

  return (
    isModalOpen && (
      <dialog
        ref={modalRef}
        onKeyDown={handleKeyDown}
        className={classes.modal}
      >
        {props.children}
      </dialog>
    )
  );
};

export default Modal;
